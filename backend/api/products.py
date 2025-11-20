from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List, Optional
# Import các models đã được cập nhật
from models.models import Product, ProductBrand, ProductCategory 

router = APIRouter()

# --- 1. Request/Response Schemas ---

class ProductCreate(BaseModel):
    name: str
    brand_id: int  # Yêu cầu ID của Hãng
    category_id: int # Yêu cầu ID của Loại sản phẩm
    price: float
    description: str
    images: List[str] = []


class ProductResponse(BaseModel):
    """Schema trả về, sử dụng tên Brand/Category để hiển thị"""
    id: int
    name: str
    brand_name: str # Tên Hãng
    category_name: str # Tên Loại
    price: float
    description: str
    images: List[str]
    created_at: str

    class Config:
        from_attributes = True


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    brand_id: Optional[int] = None 
    category_id: Optional[int] = None
    price: Optional[float] = None
    description: Optional[str] = None
    images: Optional[List[str]] = None


def get_session():
    from core.database import engine
    with Session(engine) as session:
        yield session

# --- Hàm Helper để lấy Tên từ ID ---

def get_product_details(product: Product, db: Session) -> dict:
    """Lấy Brand Name và Category Name từ IDs để trả về cho người dùng"""
    brand = db.get(ProductBrand, product.brand_id)
    category = db.get(ProductCategory, product.category_id)
    
    return {
        "id": product.id,
        "name": product.name,
        # Nếu không tìm thấy, đặt là "N/A" (Không áp dụng)
        "brand_name": brand.name if brand else "N/A", 
        "category_name": category.name if category else "N/A",
        "price": product.price,
        "description": product.description,
        "images": product.images,
        "created_at": product.created_at.isoformat()
    }


# --- 2. API Endpoints cho Sản Phẩm ---

@router.post("/", response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_session)):
    """
    Thêm sản phẩm mới (sử dụng brand_id và category_id)
    """
    # 1. Kiểm tra sự tồn tại của Brand và Category
    if not db.get(ProductBrand, product.brand_id):
        raise HTTPException(status_code=404, detail="Brand ID không tồn tại")
    if not db.get(ProductCategory, product.category_id):
        raise HTTPException(status_code=404, detail="Category ID không tồn tại")
        
    # 2. Tạo đối tượng Product
    new_product = Product(
        name=product.name,
        brand_id=product.brand_id,
        category_id=product.category_id,
        price=product.price,
        description=product.description,
        images=product.images
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    # 3. Trả về thông tin chi tiết (bao gồm tên Brand/Category)
    return ProductResponse(**get_product_details(new_product, db))


@router.get("/", response_model=List[ProductResponse])
def get_all_products(
    brand_id: Optional[int] = Query(None, description="Lọc sản phẩm theo ID Hãng"),
    category_id: Optional[int] = Query(None, description="Lọc sản phẩm theo ID Loại"),
    db: Session = Depends(get_session)
):
    """
    Lấy tất cả sản phẩm, có thể filter theo Brand ID hoặc Category ID
    """
    query = select(Product)
    
    if brand_id:
        query = query.where(Product.brand_id == brand_id)
    
    if category_id:
        query = query.where(Product.category_id == category_id)
    
    products = db.exec(query.order_by(Product.created_at.desc())).all()
    
    # Chuyển đổi mỗi Product thành ProductResponse (có tên Brand/Category)
    return [
        ProductResponse(**get_product_details(p, db))
        for p in products
    ]


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_session)):
    """
    Lấy chi tiết 1 sản phẩm
    """
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    
    return ProductResponse(**get_product_details(product, db))


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_session)
):
    """
    Cập nhật sản phẩm (cập nhật ID nếu cần)
    """
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    
    # Kiểm tra sự tồn tại của Brand/Category nếu được cập nhật
    if product_update.brand_id is not None and not db.get(ProductBrand, product_update.brand_id):
        raise HTTPException(status_code=404, detail="Brand ID không tồn tại")
    if product_update.category_id is not None and not db.get(ProductCategory, product_update.category_id):
        raise HTTPException(status_code=404, detail="Category ID không tồn tại")

    # Áp dụng các thay đổi
    if product_update.name is not None:
        product.name = product_update.name
    if product_update.brand_id is not None:
        product.brand_id = product_update.brand_id
    if product_update.category_id is not None:
        product.category_id = product_update.category_id
    if product_update.price is not None:
        product.price = product_update.price
    if product_update.description is not None:
        product.description = product_update.description
    if product_update.images is not None:
        product.images = product_update.images
    
    db.add(product)
    db.commit()
    db.refresh(product)
    
    return ProductResponse(**get_product_details(product, db))


@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_session)):
    """
    Xóa sản phẩm
    """
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Sản phẩm không tồn tại")
    
    db.delete(product)
    db.commit()
    
    return {"success": True, "message": f"Xóa sản phẩm ID {product_id} thành công"}

# --- 3. API Endpoints cho Dữ Liệu Cố Định ---

# Dùng ProductBrand và ProductCategory làm response model để trả về cả ID và Name
@router.get("/brands/list", response_model=List[ProductBrand])
def get_brands_list(db: Session = Depends(get_session)):
    """
    Lấy danh sách tất cả các Brand (Hãng sản xuất) cố định
    """
    brands = db.exec(select(ProductBrand).order_by(ProductBrand.name)).all()
    return brands

@router.get("/categories/list", response_model=List[ProductCategory])
def get_categories_list(db: Session = Depends(get_session)):
    """
    Lấy danh sách tất cả các Category (Loại sản phẩm) cố định
    """
    categories = db.exec(select(ProductCategory).order_by(ProductCategory.name)).all()
    return categories