"""
Authentication Module
=====================
Handles JWT token creation/validation and password hashing for user authentication.

Environment Variables:
- SECRET_KEY: JWT signing key (required in production)
"""

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
import warnings

# =============================================================================
# JWT CONFIGURATION
# =============================================================================

SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-this-in-production-xMixing2025")
if SECRET_KEY == "your-secret-key-change-this-in-production-xMixing2025":
    warnings.warn("WARNING: Using default SECRET_KEY. Set SECRET_KEY environment variable in production!")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

# Password hashing context using bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# =============================================================================
# PASSWORD FUNCTIONS
# =============================================================================


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
