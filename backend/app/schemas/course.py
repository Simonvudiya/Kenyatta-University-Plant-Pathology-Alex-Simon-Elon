# backend/app/schemas/course.py
from pydantic import BaseModel
from typing import Optional

class CourseCreate(BaseModel):
    course_code: str
    title: str
    description: Optional[str] = None

class CourseOut(BaseModel):
    id: str
    course_code: str
    title: str
    description: Optional[str]
    lecturer_id: Optional[str]

    class Config:
        orm_mode = True
