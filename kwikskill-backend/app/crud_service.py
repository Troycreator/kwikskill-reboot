# app/crud_service.py

from sqlalchemy.orm import Session
from app import models, schemas
from sqlalchemy.orm import joinedload

def create_service(db: Session, service: schemas.ServiceCreate, user_id: int):
    db_service = models.Service(**service.dict(), provider_id=user_id)
    db.add(db_service)
    db.commit()
    db.refresh(db_service)
    return db_service

def get_services(db: Session):
    return db.query(models.Service).options(joinedload(models.Service.provider)).all()

def get_service(db: Session, service_id: int):
    return db.query(models.Service).filter(models.Service.id == service_id).first()

def update_service(db: Session, service_id: int, updated: schemas.ServiceCreate):
    service = get_service(db, service_id)
    if service:
        for key, value in updated.dict().items():
            setattr(service, key, value)
        db.commit()
        db.refresh(service)
    return service

def delete_service(db: Session, service_id: int):
    service = get_service(db, service_id)
    if service:
        db.delete(service)
        db.commit()
    return service

def get_user_by_firebase_uid(db: Session, firebase_uid: str):
    return db.query(models.User).filter(models.User.firebase_uid == firebase_uid).first()

