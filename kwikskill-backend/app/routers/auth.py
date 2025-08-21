# app/auth.py
from fastapi import APIRouter, Depends, HTTPException, Header, status
from sqlalchemy.orm import Session
from firebase_admin import auth as firebase_auth
from app.database import get_db
from app import models, schemas
import uuid
from typing import Dict, Any
import logging

# Configure logging
logger = logging.getLogger(__name__)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

async def verify_token(
    db: Session = Depends(get_db),
    authorization: str | None = Header(default=None)
) -> models.User:
    """Verify Firebase token and return associated user"""
    logger.info("Verifying token")
    logger.debug(f"Authorization header: {authorization}")
    
    if not authorization or not authorization.startswith("Bearer "):
        logger.warning("Missing or invalid authorization header")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization header"
        )
    
    try:
        token = authorization.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(token)
        user_id = decoded_token.get('uid')
        email = decoded_token.get('email')
        
        if not user_id:
            logger.error("Token missing user ID")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token: missing user ID"
            )
        
        # Try to find existing user
        user = db.query(models.User).filter(models.User.id == user_id).first()
        
        if not user:
            logger.info(f"Creating new user: {user_id}")
            display_name = decoded_token.get('name', '')
            try:
                firebase_user = firebase_auth.get_user(user_id)
                display_name = firebase_user.display_name or display_name
            except Exception as e:
                logger.warning(f"Failed to get Firebase user details: {e}")

            user = models.User(
                id=user_id,
                email=email,
                name=display_name,
                bio=None,
                location=None,
                skills=None
            )
            db.add(user)
            try:
                db.commit()
                db.refresh(user)
                logger.info(f"Created user: {user.id}, name: {user.name}")
            except Exception as e:
                db.rollback()
                logger.error(f"Database error creating user: {e}")
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail=f"Failed to create user: {str(e)}"
                )
        else:
            logger.info(f"Found existing user: {user.id}")
            
        return user
        
    except firebase_auth.InvalidIdTokenError:
        logger.error("Invalid token")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    except Exception as e:
        logger.error(f"Authentication error: {e}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(e)
        )

@router.post("/signup", response_model=schemas.UserProfile)
async def signup(
    user_data: schemas.UserCreate,
    db: Session = Depends(get_db),
    authorization: str = Header(None)
):
    """Create a new user account"""
    logger.info("Processing signup request")
    
    if not authorization or not authorization.startswith("Bearer "):
        logger.warning("Invalid authorization header in signup")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )
    
    try:
        token = authorization.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get('uid')
        email = decoded_token.get('email')

        existing_user = db.query(models.User).filter(models.User.id == uid).first()
        if existing_user:
            logger.info(f"User already exists: {uid}")
            return existing_user

        new_user = models.User(
            id=uid,
            email=email,
            name=user_data.name
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        logger.info(f"Created new user: {new_user.id}")
        return new_user
        
    except Exception as e:
        db.rollback()
        logger.error(f"Signup error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/login", response_model=schemas.UserProfile)
async def login(
    db: Session = Depends(get_db),
    authorization: str = Header(None)
):
    """Handle user login and create user if needed"""
    logger.info("Processing login request")
    
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authorization header"
        )

    try:
        token = authorization.split(" ")[1]
        decoded_token = firebase_auth.verify_id_token(token)
        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        
        user = db.query(models.User).filter(models.User.id == uid).first()

        if not user:
            # Create new user if they don't exist
            user = models.User(
                id=uid,
                email=email,
                name=decoded_token.get('name', ''),
            )
            db.add(user)
            db.commit()
            db.refresh(user)
            logger.info(f"Created new user during login: {uid}")

        return user

    except Exception as e:
        logger.error(f"Login failed: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.get("/me", response_model=schemas.UserProfile)
async def me(current_user: models.User = Depends(verify_token)) -> schemas.UserProfile:
    """Get current authenticated user's profile"""
    return schemas.UserProfile.from_orm(current_user)

@router.get("/check-auth", response_model=Dict[str, Any])
async def check_auth(
    current_user: models.User = Depends(verify_token),
    db: Session = Depends(get_db)
) -> Dict[str, Any]:
    """Check if user is authenticated and has completed profile"""
    # Refresh user data from database
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    
    # Check if profile is complete (has name and bio)
    has_name = bool(user.name and user.name.strip())
    has_bio = bool(user.bio and user.bio.strip())
    has_profile = has_name and has_bio
    
    logger.debug(f"Profile check - name: {has_name}, bio: {has_bio}")
    
    return {
        "authenticated": True,
        "has_profile": has_profile,
        "user_id": user.id,
        "name": user.name or "",
        "profile_status": {
            "has_name": has_name,
            "has_bio": has_bio
        }
    }
