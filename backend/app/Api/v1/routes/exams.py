# backend/app/api/v1/routes/exams.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from ...models.exam import Exam
from ...models.course import Course
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/exams", tags=["exams"])

class ExamCreate(BaseModel):
    course_id: str
    title: str
    instructions: str = None
    questions_json: str = None  # JSON string

@router.post("/", status_code=201)
def create_exam(payload: ExamCreate, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    exam = Exam(
        course_id=payload.course_id,
        title=payload.title,
        instructions=payload.instructions,
        questions_json=payload.questions_json
    )
    db.add(exam)
    db.commit()
    db.refresh(exam)
    return {"id": exam.id, "title": exam.title}

@router.get("/by-course/{course_id}", response_model=List[dict])
def list_exams(course_id: str, db: Session = Depends(get_db)):
    exams = db.query(Exam).filter(Exam.course_id == course_id).all()
    return [{"id": e.id, "title": e.title, "instructions": e.instructions, "questions_json": e.questions_json} for e in exams]
