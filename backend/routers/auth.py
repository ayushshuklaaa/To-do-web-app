import logging
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from passlib.context import CryptContext
import models, schemas

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


@router.post("/register", response_model=schemas.UserOut, status_code=201)
def register(payload: schemas.UserRegister, db: Session = Depends(get_db)):
    logger.info(f"Register request for: {payload.email}")

    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        logger.warning(f"Email already registered: {payload.email}")
        raise HTTPException(status_code=400, detail="Email already registered")

    try:
        hashed = hash_password(payload.password)

        user = models.User(
            name=payload.name,
            email=payload.email,
            hashed_password=hashed,
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        default_list = models.TaskList(name="My Tasks", emoji="✅", owner_id=user.id)
        db.add(default_list)
        db.commit()

        logger.info(f"User registered: {user.email} (id={user.id})")
        return user

    except Exception as e:
        logger.error(f"Unexpected error during registration: {e}", exc_info=True)
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/login", response_model=schemas.UserOut)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    logger.info(f"Login request for: {payload.email}")

    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        logger.warning(f"Login failed for: {payload.email}")
        raise HTTPException(status_code=401, detail="Invalid email or password")

    logger.info(f"Login successful: {user.email}")
    return user
