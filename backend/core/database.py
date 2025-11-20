from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()

# DATABASE_URL - Cập nhật theo thông tin của bạn
DATABASE_URL = "mysql+pymysql://rpyatvvchosting_user:123456aA%40@202.92.4.66:3306/rpyatvvchosting_banson"

print(f"DEBUG: DATABASE_URL value is: {DATABASE_URL}")

# CẤU HÌNH MYSQL
engine = create_engine(
    DATABASE_URL,
    echo=True,
    pool_pre_ping=True,
    pool_recycle=3600,
    pool_size=5,
    max_overflow=10,
    connect_args={
        "charset": "utf8mb4",
        "use_unicode": True
    }
)


def create_db_and_tables():
    """
    Tạo tất cả tables trong database MySQL
    """
    try:
        SQLModel.metadata.create_all(engine)
        print("✅ Đã tạo tables thành công trong MySQL!")
    except Exception as e:
        print(f"❌ Lỗi khi tạo tables: {e}")
        raise


def get_session():
    """
    Dependency để lấy database session
    """
    with Session(engine) as session:
        yield session