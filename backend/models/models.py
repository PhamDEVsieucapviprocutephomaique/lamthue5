from sqlmodel import SQLModel, Field
from typing import List, Optional
from datetime import datetime
from sqlalchemy import Column, Text
from sqlalchemy.dialects.mysql import JSON
from enum import Enum

# --- DỮ LIỆU CỐ ĐỊNH (CONSTANTS) CHO HÃNG VÀ LOẠI SẢN PHẨM ---

# Danh sách Hãng Sản Xuất cố định (từ ảnh của bạn)
DEFAULT_BRANDS = [
    "SƠN JOTUN", "SƠN DULUX", "SƠN MAXILITE", "SƠN TOA", 
    "SƠN KOVA", "SƠN NIPPON", "SƠN BẠCH TUYẾT", "SƠN JOTON", 
    "SƠN ĐÁ HÒA BÌNH - HODASTONE", "SƠN CHỐNG THẤM RỒNG ĐEN", 
    "SƠN SIKA", "PHỤ KIỆN THI CÔNG SƠN", "KEO CHÀ RON THÁI LAN"
]

# Danh sách Loại Sản Phẩm cố định (từ ảnh của bạn)
DEFAULT_CATEGORIES = [
    "Bột trét tường", "Sơn lót", "Sơn ngoại thất", "Sơn nội thất", 
    "Sơn Dầu, sơn chống rỉ", "Sơn Chống Thấm", "Keo Chà Ron Thái Lan", 
    "Sơn Giao Thông", "Sơn Công Nghiệp", "Sơn Hệ EPOXY", "Dung Môi Sơn"
]

# --- 1. Model cho Hãng Sản Xuất (ProductBrand) ---

class ProductBrand(SQLModel, table=True):
    """Model cho Hãng Sản Xuất (Dữ liệu cố định)"""
    __tablename__ = "product_brands"
    
    id: int = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, unique=True, index=True) # Tên hãng

# --- 2. Model cho Loại Sản Phẩm (ProductCategory) ---

class ProductCategory(SQLModel, table=True):
    """Model cho Loại Sản Phẩm (Dữ liệu cố định)"""
    __tablename__ = "product_categories"
    
    id: int = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, unique=True, index=True) # Tên loại

# --- 3. Model Sản Phẩm (Product) ---

class Product(SQLModel, table=True):
    """Model Sản phẩm với liên kết Brand và Category"""
    __tablename__ = "products"
    
    id: int = Field(default=None, primary_key=True)
    name: str = Field(max_length=255, index=True) # Tên sản phẩm
    
    # Liên kết Foreign Key (Sẽ chọn từ các bảng cố định trên)
    brand_id: int = Field(foreign_key="product_brands.id", index=True) # ID Hãng sản xuất
    category_id: int = Field(foreign_key="product_categories.id", index=True) # ID Loại sản phẩm
    
    price: float
    description: str = Field(sa_column=Column(Text))
    images: List[str] = Field(sa_column=Column(JSON), default=[]) # List các URL ảnh
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- 4. Model Đơn Hàng (Order) ---

class Order(SQLModel, table=True):
    """Model Đơn hàng, chứa thông tin khách hàng và chi tiết sản phẩm"""
    __tablename__ = "orders"
    
    id: int = Field(default=None, primary_key=True)
    customer_name: str = Field(max_length=255) # Tên khách hàng
    customer_phone: str = Field(max_length=20) # Số điện thoại
    customer_address: str = Field(sa_column=Column(Text)) # Địa chỉ chi tiết
    items: List[dict] = Field(sa_column=Column(JSON))  # [{product_id, product_name, quantity, price, total}, ...]
    total_price: float
    created_at: datetime = Field(default_factory=datetime.utcnow)

# --- 5. Model Cài Đặt Trang Web (SiteSettings) ---

class SiteSettings(SQLModel, table=True):
    """Model Cài đặt trang web (Ví dụ: Link Youtube)"""
    __tablename__ = "site_settings"
    
    id: int = Field(default=None, primary_key=True)
    youtube_url: Optional[str] = Field(default=None, max_length=500)
    updated_at: datetime = Field(default_factory=datetime.utcnow)