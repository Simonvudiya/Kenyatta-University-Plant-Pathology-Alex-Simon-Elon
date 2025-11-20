# backend/app/models/content.py
import uuid
from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy import ForeignKey

class Content(Base):
    __tablename__ = "contents"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    course_id = Column(String, ForeignKey("courses.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    file_url = Column(String, nullable=True)  # stored URL or path
    content_type = Column(String, nullable=True)  # pdf, video, doc

    course = relationship("Course", back_populates="contents")
