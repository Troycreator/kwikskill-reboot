# app/firebase.py
import firebase_admin
from firebase_admin import credentials

if not firebase_admin._apps:
    cred = credentials.Certificate("app/firebase-admin-sdk.json")
    firebase_admin.initialize_app(cred)
