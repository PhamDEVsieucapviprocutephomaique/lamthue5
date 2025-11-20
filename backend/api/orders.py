from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime, timedelta
# Import Order và Product từ models
from models.models import Order, Product 

router = APIRouter()

# --- Schemas ---

class OrderItemCreate(BaseModel):
    product_id: int
    quantity: int


class OrderCreate(BaseModel):
    """Schema dùng để tạo đơn hàng mới, chứa đầy đủ thông tin khách hàng và sản phẩm"""
    customer_name: str
    customer_phone: str
    customer_address: str
    items: List[OrderItemCreate]  # List of {product_id, quantity}


class OrderResponse(BaseModel):
    """Schema trả về, chỉ bao gồm các thông tin cần thiết về đơn hàng"""
    id: int
    customer_name: str
    customer_phone: str
    customer_address: str
    items: List[dict]
    total_price: float
    created_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {datetime: lambda v: v.isoformat()}


def get_session():
    from core.database import engine
    with Session(engine) as session:
        yield session

# --- Endpoints ---

@router.post("/", response_model=OrderResponse)
def create_order(order: OrderCreate, db: Session = Depends(get_session)):
    """
    Tạo đơn hàng mới (Hỗ trợ nhiều sản phẩm). Đơn hàng chỉ chứa thông tin giao dịch.
    """
    items = []
    total_price = 0
    
    # Duyệt qua các sản phẩm trong đơn hàng, tính giá và kiểm tra tồn tại
    for item in order.items:
        product = db.get(Product, item.product_id)
        if not product:
            raise HTTPException(
                status_code=404,
                detail=f"Sản phẩm ID {item.product_id} không tồn tại"
            )
        
        item_total = product.price * item.quantity
        total_price += item_total
        
        # Chuẩn bị dữ liệu chi tiết cho trường 'items'
        items.append({
            "product_id": product.id,
            "product_name": product.name,
            "quantity": item.quantity,
            "price": product.price,
            "total": item_total
        })
    
    # Tạo đối tượng Order mới (Không có trường status)
    new_order = Order(
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        customer_address=order.customer_address,
        items=items,
        total_price=total_price
        # status không còn tồn tại
    )
    
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    
    return new_order


@router.get("/", response_model=List[OrderResponse])
def get_orders(
    today_only: bool = Query(False, description="Chỉ lấy đơn hàng được tạo trong ngày hôm nay (UTC)"),
    db: Session = Depends(get_session)
):
    """
    Lấy danh sách tất cả đơn hàng (hoặc lọc theo ngày hôm nay).
    """
    query = select(Order)
    
    if today_only:
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_end = today_start + timedelta(days=1)
        query = query.where(
            (Order.created_at >= today_start) &
            (Order.created_at < today_end)
        )
    
    orders = db.exec(query.order_by(Order.created_at.desc())).all()
    
    return orders


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_session)):
    """
    Lấy chi tiết 1 đơn hàng theo ID.
    """
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Đơn hàng không tồn tại")
    
    return order


@router.delete("/{order_id}")
def delete_order(order_id: int, db: Session = Depends(get_session)):
    """
    Xóa đơn hàng.
    """
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Đơn hàng không tồn tại")
    
    db.delete(order)
    db.commit()
    
    return {"success": True, "message": f"Xóa đơn hàng ID {order_id} thành công"}

