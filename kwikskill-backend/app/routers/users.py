from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.dependencies import get_current_user
from app.routers.auth import verify_token
from typing import Dict, Any
import uuid
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.get("/profile", response_model=schemas.UserProfile)
async def get_profile(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user profile information"""
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        logger.error(f"User not found: {current_user.id}")
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/profile", response_model=schemas.UserProfile)
async def update_profile(
    profile: schemas.UserProfileUpdate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile information"""
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        logger.error(f"User not found: {current_user.id}")
        raise HTTPException(status_code=404, detail="User not found")
    
    try:
        # Update user fields
        for field, value in profile.dict(exclude_unset=True).items():
            setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        logger.info(f"Updated profile for user {user.id}: name={user.name}")
        return user
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to update profile: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update profile: {str(e)}"
        )

@router.get("/check-profile", response_model=Dict[str, Any])
async def check_profile(
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Check if user profile is complete"""
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        logger.error(f"User not found: {current_user.id}")
        raise HTTPException(status_code=404, detail="User not found")
    
    has_name = bool(user.name and user.name.strip())
    has_bio = bool(user.bio and user.bio.strip())
    has_profile = has_name and has_bio
    
    logger.info(f"Profile check - User: {user.id}, Has profile: {has_profile}")
    
    return {
        "has_profile": has_profile,
        "user_id": user.id,
        "name": user.name or "",
        "profile_status": {
            "has_name": has_name,
            "has_bio": has_bio
        }
    }

@router.get("/check-provider-status")
async def check_provider_status(
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
):
    """Check if user is a service provider"""
    try:
        # Query the provider table
        provider = db.query(models.Provider).filter(
            models.Provider.user_id == current_user.id
        ).first()
        
        return {
            "is_provider": bool(provider),
            "status": "active" if provider else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/become-provider", response_model=schemas.ProviderResponse)
async def become_provider(
    provider_data: schemas.ProviderCreate,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> schemas.ProviderResponse:
    """Register user as a service provider"""
    # Check if already a provider
    existing_provider = db.query(models.Provider).filter(
        models.Provider.user_id == current_user.id
    ).first()
    
    if existing_provider:
        logger.warning(f"User {current_user.id} attempted to become provider but already is one")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is already a provider"
        )
    
    try:
        # Create new provider
        new_provider = models.Provider(
            id=str(uuid.uuid4()),
            user_id=current_user.id,
            skills=provider_data.skills,
            experience=provider_data.experience,
            hourly_rate=provider_data.hourly_rate,
            availability=provider_data.availability,
            service_description=provider_data.service_description
        )
        
        db.add(new_provider)
        db.commit()
        db.refresh(new_provider)
        
        logger.info(f"Created new provider: {new_provider.id} for user: {current_user.id}")
        return new_provider
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to create provider: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create provider: {str(e)}"
        )