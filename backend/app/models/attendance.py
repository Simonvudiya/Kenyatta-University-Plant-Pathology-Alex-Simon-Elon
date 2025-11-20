# backend/app/models/attendance.py
import uuid
from sqlalchemy import Column, String, Date, Enum
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy import ForeignKey
import enum
from datetime import date

class AttendanceStatus(str, enum.Enum):
    present = "present"
    absent = "absent"

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum(AttendanceStatus), nullable=False)
