# backend/app/api/v1/routes/courses.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ...database import get_db
from ...models.course import Course
from ...models.user import User, RoleEnum
from ...models.student_courses import StudentCourse
from ...schemas.course import CourseCreate, CourseOut
from typing import List
from fastapi import Body

router = APIRouter(prefix="/courses", tags=["courses"])

@router.post("/", response_model=CourseOut)
def create_course(payload: CourseCreate, lecturer_id: str = Body(None), db: Session = Depends(get_db)):
    # lecturer_id optional: associate lecturer if provided
    existing = db.query(Course).filter(Course.course_code == payload.course_code).first()
    if existing:
        raise HTTPException(status_code=400, detail="Course code already exists")
    course = Course(
        course_code=payload.course_code,
        title=payload.title,
        description=payload.description,
        lecturer_id=lecturer_id
    )
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

@router.get("/", response_model=List[CourseOut])
def list_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()

@router.post("/{course_id}/enroll", status_code=201)
def enroll(course_id: str, student_id: str = Body(...), db: Session = Depends(get_db)):
    # check course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    student = db.query(User).filter(User.id == student_id).first()
    if not student or student.role != RoleEnum.student:
        raise HTTPException(status_code=400, detail="Invalid student")
    # create link if not exists
    exists = db.query(StudentCourse).filter(StudentCourse.course_id==course_id, StudentCourse.student_id==student_id).first()
    if exists:
        raise HTTPException(status_code=400, detail="Student already enrolled")
    enrollment = StudentCourse(student_id=student_id, course_id=course_id)
    db.add(enrollment)
    db.commit()
    return {"detail": "enrolled"}
