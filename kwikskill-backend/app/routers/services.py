# app/services.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud_service, schemas, database, models
from app.dependencies import get_current_user

router = APIRouter(prefix="/services", tags=["Services"])

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.Service)
def create(service: schemas.ServiceCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    # Try to get the DB user by Firebase UID
    db_user = crud_service.get_user_by_firebase_uid(db, user["uid"])
    if not db_user:
        # Create a new user in DB if not found
        new_user = models.User(firebase_uid=user["uid"])
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        db_user = new_user

    return crud_service.create_service(db, service, db_user.id)

@router.get("/", response_model=list[schemas.Service])
def read_all(db: Session = Depends(get_db)):
    return crud_service.get_services(db)

@router.get("/{service_id}", response_model=schemas.Service)
def read(service_id: int, db: Session = Depends(get_db)):
    service = crud_service.get_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.put("/{service_id}", response_model=schemas.Service)
def update(service_id: int, updated: schemas.ServiceCreate, db: Session = Depends(get_db)):
    service = crud_service.update_service(db, service_id, updated)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.delete("/{service_id}")
def delete(service_id: int, db: Session = Depends(get_db)):
    service = crud_service.delete_service(db, service_id)
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"detail": "Service deleted"}
