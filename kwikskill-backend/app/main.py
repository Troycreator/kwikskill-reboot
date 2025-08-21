# main.py
import os
import logging
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app import models
from app.database import engine
from app.routers import users, auth, services
from app.firebase_admin import initialize_firebase_admin

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Firebase Admin before creating FastAPI app
initialize_firebase_admin()

# Create tables
models.Base.metadata.create_all(bind=engine)

# App Init
app = FastAPI(
    title="KwikSkill API",
    description="Backend API for KwikSkill platform",
    version="1.0.0"
)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Incoming {request.method} request to {request.url.path}")
    response = await call_next(request)
    logger.info(f"Returning {response.status_code} response")
    return response

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Include routers - Remove prefix since it's defined in the routers themselves
app.include_router(auth.router)  # Auth router already has prefix="/auth"
app.include_router(users.router) # Users router already has prefix="/users"
app.include_router(services.router)

# Base route for API health check
@app.get("/", tags=["Root"])
async def read_root():
    """Root endpoint to check if API is running"""
    logger.info("Root endpoint accessed")
    return {
        "message": "KwikSkill Backend Running",
        "version": "1.0.0",
        "status": "healthy"
    }

# Global error handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    error_msg = str(exc)
    logger.error(f"Global exception: {error_msg}")
    return {
        "detail": error_msg,
        "path": request.url.path,
        "method": request.method
    }