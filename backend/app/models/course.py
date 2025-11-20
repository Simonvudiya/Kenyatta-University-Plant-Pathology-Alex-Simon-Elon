# backend/app/models/course.py
import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy import ForeignKey

class Course(Base):
    __tablename__ = "courses"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    course_code = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    lecturer_id = Column(String, ForeignKey("users.id"), nullable=True)

    lecturer = relationship("User", back_populates="taught_courses")
    students = relationship("StudentCourse", back_populates="course")
    contents = relationship("Content", back_populates="course")
    exams = relationship("Exam", back_populates="course")
