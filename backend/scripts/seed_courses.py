# backend/scripts/seed_courses.py
"""
Script to seed initial courses.
Run with:
    python -m backend.scripts.seed_courses
or from project root:
    python backend/scripts/seed_courses.py
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.course import Course
import os

courses = [
    ("NEM101", "Nematology"),
    ("MYC102", "Mycology"),
    ("BAC103", "Bacteriology"),
    ("ENT104", "Entomology"),
    ("VIR105", "Virology"),
    ("PYD201", "Data Analysis with Python"),
    ("RDAS202", "Data Analysis with R"),
    ("STT203", "Data Analysis with STATA"),
    ("SPP204", "Data Analysis with SPSS"),
    ("GEN205", "Data Analysis with GENSTAT"),
]

def seed():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        for code, title in courses:
            exists = db.query(Course).filter(Course.course_code == code).first()
            if not exists:
                c = Course(course_code=code, title=title, description=f"{title} at Kenyatta University")
                db.add(c)
        db.commit()
        print("Seeded courses.")
    finally:
        db.close()

if __name__ == "__main__":
    seed()
