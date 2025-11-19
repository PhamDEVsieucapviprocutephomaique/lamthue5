from sqlmodel import SQLModel, Field
from typing import List
from datetime import datetime
from sqlalchemy import Column, Text
from sqlalchemy.dialects.mysql import JSON, LONGTEXT

class Account(SQLModel, table=True):
    __tablename__ = "accounts"
    
    id: int = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True, max_length=255)
    password: str = Field(max_length=255)
    role: str = Field(default="user", max_length=50)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GameNick(SQLModel, table=True):
    __tablename__ = "game_nicks"
    
    id: int = Field(default=None, primary_key=True)
    title: str = Field(max_length=500)
    category: str = Field(max_length=255)
    price: float = Field()
    details: str = Field(sa_column=Column(Text))  # Dùng TEXT cho MySQL
    facebook_link: str = Field(max_length=500)
    images: List[str] = Field(sa_column=Column(JSON), default=[])  # JSON cho MySQL
    owner_id: int = Field(default=1)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Category(SQLModel, table=True):
    __tablename__ = "categories"
    
    id: int = Field(default=None, primary_key=True)
    name: str = Field(unique=True, index=True, max_length=255)
    order_index: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class PageView(SQLModel, table=True):
    __tablename__ = "page_views"
    
    id: int = Field(default=None, primary_key=True)
    count: int = Field(default=0)
    last_updated: datetime = Field(default_factory=datetime.utcnow)