# backend/app/models/student_courses.py
import uuid
from sqlalchemy import Column, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from ..database import Base

class StudentCourse(Base):
    __tablename__ = "student_courses"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    student_id = Column(String, ForeignKey("users.id"), nullable=False)
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)

    student = relationship("User", back_populates="courses")
    course = relationship("Course", back_populates="students")

    __table_args__ = (UniqueConstraint("student_id", "course_id", name="_student_course_uc"),)
