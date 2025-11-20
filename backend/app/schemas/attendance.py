# backend/app/schemas/attendance.py
from pydantic import BaseModel
from datetime import date

class AttendanceIn(BaseModel):
    student_id: str
    course_id: str
    date: date
    status: str  # present or absent

class AttendanceOut(AttendanceIn):
    id: str
    class Config:
        orm_mode = True
