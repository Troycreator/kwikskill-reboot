# main.py
import os
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app import models, database
from app.routers.services import router as services_router
from app.dependencies import get_current_user
from app.database import SessionLocal, engine
from firebase_admin import credentials, initialize_app, auth
from pydantic import BaseModel

# Firebase Init
cred = credentials.Certificate("app/firebase-admin-sdk.json")
initialize_app(cred)

# Create tables
models.Base.metadata.create_all(bind=engine)

# App Init
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Dependency

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# Pydantic
class Skill(BaseModel):
    name: str

# Routes
@app.get("/")
def read_root():
    return {"message": "KwikSkill Backend Running"}

@app.get("/protected")
def protected_route(user=Depends(get_current_user)):
    return {"message": "You are authenticated!", "uid": user["uid"]}

@app.post("/skills")
def create_skill(skill: Skill, db: Session = Depends(get_db)):
    new_skill = models.Skill(name=skill.name, user_id="test-user-id")
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

app.include_router(services_router)