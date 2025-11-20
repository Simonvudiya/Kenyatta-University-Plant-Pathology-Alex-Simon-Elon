# backend/app/schemas/content.py
from pydantic import BaseModel
from typing import Optional

class ContentCreate(BaseModel):
    course_id: str
    title: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    content_type: Optional[str] = None

class ContentOut(ContentCreate):
    id: str
    class Config:
        orm_mode = True
