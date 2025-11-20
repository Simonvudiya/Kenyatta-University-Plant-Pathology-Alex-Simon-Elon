# backend/app/api/v1/routes/attendance.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...database import get_db
from ...models.attendance import Attendance, AttendanceStatus
from ...models.user import User, RoleEnum
from ...models.course import Course
from ...schemas.attendance import AttendanceIn, AttendanceOut
from typing import List
from datetime import date

router = APIRouter(prefix="/attendance", tags=["attendance"])

@router.post("/", response_model=AttendanceOut)
def mark_attendance(payload: AttendanceIn, db: Session = Depends(get_db)):
    # validate student & course
    student = db.query(User).filter(User.id == payload.student_id).first()
    if not student or student.role != RoleEnum.student:
        raise HTTPException(status_code=400, detail="Invalid student")
    course = db.query(Course).filter(Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    att = Attendance(
        student_id=payload.student_id,
        course_id=payload.course_id,
        date=payload.date,
        status=AttendanceStatus(payload.status)
    )
    db.add(att)
    db.commit()
    db.refresh(att)
    return att

@router.get("/by-course/{course_id}", response_model=List[AttendanceOut])
def attendance_by_course(course_id: str, db: Session = Depends(get_db)):
    return db.query(Attendance).filter(Attendance.course_id == course_id).all()
