from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# DATABASE_URL = "mysql+pymysql://hwuwafaxhosting_dev:123456aA@@202.92.4.66:3306/hwuwafaxhosting_game_nick"

DATABASE_URL = "mysql+pymysql://aqczepfrhosting_dev:123456aA%40@202.92.4.66:3306/aqczepfrhosting_game_nick"


print(f"DEBUG: DATABASE_URL value is: {DATABASE_URL}")

# CẤU HÌNH MYSQL
engine = create_engine(
    DATABASE_URL,
    echo=True,
    # Quan trọng cho MySQL
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
        print(" Đã tạo tables thành công trong MySQL!")
    except Exception as e:
        print(f" Lỗi khi tạo tables: {e}")
        raise

def get_session():
    """
    Dependency để lấy database session
    """
    with Session(engine) as session:
        yield session