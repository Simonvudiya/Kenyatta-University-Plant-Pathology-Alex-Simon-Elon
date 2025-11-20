from fastapi import FastAPI
from .database import engine, Base
from .routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kenyatta University LMS - Plant Pathology Department")

app.include_router(auth.router)
