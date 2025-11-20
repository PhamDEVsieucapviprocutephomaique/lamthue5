from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from models.models import SiteSettings

router = APIRouter()


class SettingsUpdate(BaseModel):
    youtube_url: Optional[str] = None


class SettingsResponse(BaseModel):
    id: int
    youtube_url: Optional[str]
    updated_at: str

    class Config:
        from_attributes = True


def get_session():
    from core.database import engine
    with Session(engine) as session:
        yield session


def get_or_create_settings(db: Session) -> SiteSettings:
    """
    Lấy hoặc tạo settings mặc định
    """
    settings = db.exec(select(SiteSettings)).first()
    if not settings:
        settings = SiteSettings(youtube_url=None)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


@router.get("/", response_model=SettingsResponse)
def get_settings(db: Session = Depends(get_session)):
    """
    Lấy cài đặt trang web
    """
    settings = get_or_create_settings(db)
    
    return SettingsResponse(
        id=settings.id,
        youtube_url=settings.youtube_url,
        updated_at=settings.updated_at.isoformat()
    )


@router.put("/", response_model=SettingsResponse)
def update_settings(
    settings_update: SettingsUpdate,
    db: Session = Depends(get_session)
):
    """
    Cập nhật cài đặt trang web (youtube_url)
    """
    settings = get_or_create_settings(db)
    
    if settings_update.youtube_url is not None:
        settings.youtube_url = settings_update.youtube_url
    
    db.add(settings)
    db.commit()
    db.refresh(settings)
    
    return SettingsResponse(
        id=settings.id,
        youtube_url=settings.youtube_url,
        updated_at=settings.updated_at.isoformat()
    )


@router.get("/youtube/url")
def get_youtube_url(db: Session = Depends(get_session)):
    """
    Lấy link youtube để nhúng trên trang chủ
    """
    settings = get_or_create_settings(db)
    
    return {
        "youtube_url": settings.youtube_url or ""
    }