import os
import logging
import firebase_admin
from firebase_admin import credentials

logger = logging.getLogger(__name__)

def initialize_firebase_admin():
    """Initialize Firebase Admin SDK with service account"""
    try:
        if not firebase_admin._apps:
            # Look for credentials in multiple locations
            possible_paths = [
                os.path.join(os.path.dirname(__file__), 'firebase-admin-sdk.json'),
                os.path.join(os.path.dirname(__file__), 'credentials', 'firebase-admin-sdk.json')
            ]
            
            cred_path = None
            for path in possible_paths:
                if os.path.exists(path):
                    cred_path = path
                    break
            
            if not cred_path:
                raise FileNotFoundError(
                    f"Firebase credentials file not found. Tried: {', '.join(possible_paths)}"
                )
                
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
            logger.info("Firebase Admin SDK initialized successfully")
            
    except Exception as e:
        logger.error(f"Failed to initialize Firebase Admin SDK: {e}")
        raise