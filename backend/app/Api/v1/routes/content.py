# backend/app/api/v1/routes/content.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from ...models.content import Content
from ...models.course import Course
from ...schemas.content import ContentCreate, ContentOut
from typing import List

router = APIRouter(prefix="/content", tags=["content"])

@router.post("/", response_model=ContentOut)
def create_content(payload: ContentCreate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    c = Content(
        course_id=payload.course_id,
        title=payload.title,
        description=payload.description,
        file_url=payload.file_url,
        content_type=payload.content_type
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return c

@router.get("/by-course/{course_id}", response_model=List[ContentOut])
def list_by_course(course_id: str, db: Session = Depends(get_db)):
    return db.query(Content).filter(Content.course_id == course_id).all()
