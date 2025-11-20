# backend/app/models/exam.py
import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import JSON

class Exam(Base):
    __tablename__ = "exams"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    title = Column(String, nullable=False)
    instructions = Column(Text, nullable=True)
    questions_json = Column(Text, nullable=True)  # store as JSON stringified

    course = relationship("Course", back_populates="exams")
