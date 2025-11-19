from elasticsearch import Elasticsearch
from sqlmodel import Session, select
from models.models import Room # Giả định Room model của bạn nằm ở đây
from typing import List, Dict, Any
import os

ES_HOST = os.getenv("ELASTICSEARCH_URL", "http://elasticsearch:9200")


HEADERS = {'Content-Type': 'application/json', 'Accept': 'application/vnd.elasticsearch+json; compatible-with=7'}

ES_CLIENT = Elasticsearch(
    ES_HOST,
    # headers=HEADERS # Thêm header vào đây

)


ROOM_INDEX_NAME = "rooms"



ROOM_MAPPING = {
    "settings": {
        "analysis": {

            "analyzer": {
                "vi_analyzer": {
                    "tokenizer": "standard",
                    "filter": ["lowercase", "asciifolding"]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "id": {"type": "keyword"},

            # ĐỊA CHỈ: SỬA TỪ keyword -> text ĐỂ SEARCH ĐƯỢC
            "province": {"type": "text", "analyzer": "vi_analyzer"},  # BOOST CAO NHẤT
            "district": {"type": "text", "analyzer": "vi_analyzer"},   # BOOST CAO
            "ward": {"type": "text", "analyzer": "vi_analyzer"},       # BOOST CAO
            
            "title": {"type": "text", "analyzer": "vi_analyzer"}, 
            "description": {"type": "text", "analyzer": "vi_analyzer"}, 
            "search_combined": {"type": "text", "analyzer": "vi_analyzer"}
        }
    }
}






def create_index_if_not_exists():
    """Kiểm tra và tạo Index nếu nó chưa tồn tại."""
    try:
        if not ES_CLIENT.indices.exists(index=ROOM_INDEX_NAME):
            ES_CLIENT.indices.create(index=ROOM_INDEX_NAME, body=ROOM_MAPPING)
            print(f"Index '{ROOM_INDEX_NAME}' đã tạo thành công.")
    except Exception as e:
        print(f"Lỗi khi khởi tạo Index: {e}")

# ----------------------------------------------------------------------
# 2. ĐỒNG BỘ HÓA DỮ LIỆU (Indexing)
# ----------------------------------------------------------------------

def room_to_elastic_doc(room: Room) -> Dict[str, Any]:
    """Chuyển đổi Room Model từ SQL sang Document cho Elasticsearch"""
    
    # Tạo trường kết hợp cho tìm kiếm vị trí và tiêu đề
    search_combined = (
        f"{room.title} {room.district} {room.province} {room.ward} {room.address_detail}"
    )
    
    return {
        "id": str(room.id),
        "title": room.title,
        "description": room.description,
        "province": room.province,
        "district": room.district,
        "ward": room.ward,
        "price": room.price,
        "area": room.area,
        "search_combined": search_combined 
    }

def index_room(room: Room):
    """Lưu trữ/Cập nhật một tài liệu Room vào Elasticsearch."""
    doc = room_to_elastic_doc(room)
    try:
        # id trong ES chính là UUID của Room trong SQL
        ES_CLIENT.index(index=ROOM_INDEX_NAME, id=doc["id"], document=doc)
    except Exception as e:
        print(f"Lỗi khi index Room ID {doc['id']}: {e}")
        
def delete_room_doc(room_id: str):
    """Xóa một tài liệu Room khỏi Elasticsearch."""
    try:
        ES_CLIENT.delete(index=ROOM_INDEX_NAME, id=room_id)
    except Exception:
        # Bỏ qua lỗi nếu document đã bị xóa trước đó (404 Not Found)
        pass


# 3. TRUY VẤN (Querying)


def search_rooms(query_string: str, page: int = 1, page_size: int = 20) -> tuple[List[str], int]:
    
    main_query = {
        "multi_match": {
            "query": query_string,
            "fields": [
                "title^5",             
                "search_combined^3",   
                "description^1"        
            ],
            "type": "best_fields", 
            "fuzziness": "AUTO"
        }
    }
    
    start_from = (page - 1) * page_size
    
    search_body = {
        # Đảm bảo ES trả về tổng số hits chính xác
        "track_total_hits": True, 
        "query": main_query,
        "from": start_from,
        "size": page_size,
        "_source": ["id"],
    }
    
    res = ES_CLIENT.search(index=ROOM_INDEX_NAME, body=search_body)


    total_hits = res['hits']['total']['value']
    

    room_ids = [hit['_id'] for hit in res['hits']['hits']]

    return room_ids, total_hits


# File: elasticsearch_service.py (Bổ sung)

def initial_indexing(db: Session):
    """
    Đồng bộ hóa tất cả các phòng trọ hiện có từ PostgreSQL sang Elasticsearch.
    Chỉ nên gọi một lần khi ứng dụng khởi động lần đầu hoặc sau khi setup.
    """
    print("--- BẮT ĐẦU ĐỒNG BỘ HÓA DỮ LIỆU BAN ĐẦU ---")
    
    # 1. Truy vấn tất cả phòng trọ từ PostgreSQL
    rooms = db.exec(select(Room)).all()
    
    # 2. Chuẩn bị hàng loạt (Bulk Indexing) để tăng tốc độ
    actions = []
    for room in rooms:
        doc = room_to_elastic_doc(room)
        actions.append({
            "_index": ROOM_INDEX_NAME,
            "_id": doc["id"],
            "_source": doc,
        })
    
    # Sử dụng helper bulk để gửi dữ liệu hàng loạt
    from elasticsearch.helpers import bulk
    
    if actions:
        try:
            successes, errors = bulk(ES_CLIENT, actions)
            print(f"Hoàn thành Indexing. Thành công: {successes}, Lỗi: {len(errors)}")
        except Exception as e:
            print(f"Lỗi Bulk Indexing: {e}")
    else:
        print("Không có phòng trọ nào để index.")

    print("--- KẾT THÚC ĐỒNG BỘ HÓA ---")