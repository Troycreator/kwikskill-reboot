from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import HTTPException, status

def get_service(db: Session, service_id: int):
    """Get a single service by ID"""
    return db.query(models.Service).filter(models.Service.id == service_id).first()

def get_services(db: Session, skip: int = 0, limit: int = 100):
    """Get all services with pagination"""
    return db.query(models.Service).offset(skip).limit(limit).all()

def create_service(db: Session, service: schemas.ServiceCreate, provider_id: str):
    """Create a new service"""
    try:
        db_service = models.Service(**service.model_dump(), provider_id=provider_id)
        db.add(db_service)
        db.commit()
        db.refresh(db_service)
        return db_service
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

def update_service(db: Session, service_id: int, service: schemas.ServiceCreate):
    """Update an existing service"""
    db_service = get_service(db, service_id)
    if db_service is None:
        return None
    
    for key, value in service.model_dump().items():
        setattr(db_service, key, value)
    
    db.commit()
    db.refresh(db_service)
    return db_service

def delete_service(db: Session, service_id: int):
    """Delete a service"""
    db_service = get_service(db, service_id)
    if db_service is None:
        return None
    
    db.delete(db_service)
    db.commit()
    return db_service