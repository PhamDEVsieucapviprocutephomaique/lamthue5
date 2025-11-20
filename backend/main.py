from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
import uvicorn

# Import các components cốt lõi
from core.database import create_db_and_tables, engine

# Import các Models cần thiết, bao gồm cả các hằng số dữ liệu mặc định
from models.models import (
    SiteSettings, 
    ProductBrand, 
    ProductCategory, 
    # Import các hằng số đã định nghĩa trong models.py
    DEFAULT_BRANDS, 
    DEFAULT_CATEGORIES
)

# Import các routers API
from api.products import router as products_router
from api.orders import router as orders_router
from api.settings import router as settings_router

app = FastAPI(
    title="Paint Store API",
    description="API for paint selling website",
    version="1.0.0"
)

# --- Cấu hình Middleware (CORS) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Thêm Routers API ---
app.include_router(products_router, prefix="/api/products", tags=["Products"])
app.include_router(orders_router, prefix="/api/orders", tags=["Orders"])
app.include_router(settings_router, prefix="/api/settings", tags=["Settings"])


def seed_default_data(db: Session):
    """Thực hiện chèn dữ liệu mặc định nếu chưa tồn tại"""
    
    # 1. Khởi tạo Cài đặt mặc định (SiteSettings)
    settings = db.exec(select(SiteSettings)).first()
    if not settings:
        print("⚙️ Tạo cài đặt mặc định...")
        settings = SiteSettings(youtube_url=None)
        db.add(settings)
    
    # 2. Khởi tạo dữ liệu Hãng Sản Xuất (ProductBrand)
    print("🏭 Khởi tạo Hãng sản xuất...")
    for brand_name in DEFAULT_BRANDS:
        existing_brand = db.exec(
            select(ProductBrand).where(ProductBrand.name == brand_name)
        ).first()
        if not existing_brand:
            db.add(ProductBrand(name=brand_name))
            
    # 3. Khởi tạo dữ liệu Loại Sản Phẩm (ProductCategory)
    print("🧱 Khởi tạo Loại sản phẩm...")
    for category_name in DEFAULT_CATEGORIES:
        existing_category = db.exec(
            select(ProductCategory).where(ProductCategory.name == category_name)
        ).first()
        if not existing_category:
            db.add(ProductCategory(name=category_name))

    db.commit()
    print("✅ Dữ liệu mặc định (Brands, Categories, Settings) đã được đảm bảo")


@app.on_event("startup")
def on_startup():
    print("🚀 Khởi động ứng dụng...")
    
    print("📊 Tạo database tables...")
    create_db_and_tables()
    
    with Session(engine) as db:
        seed_default_data(db)


# --- API Root và Health Check ---

@app.get("/")
def root():
    return {
        "message": "Paint Store API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "products": "/api/products",
            "orders": "/api/orders",
            "settings": "/api/settings"
        }
    }


@app.get("/health")
def health_check():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )