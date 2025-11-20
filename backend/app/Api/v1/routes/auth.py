from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.user import User
from ..schemas.user import UserCreate, UserLogin, UserResponse
from ..utils.hashing import hash_password, verify_password
from ..core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# Register
@router.post("/register/{role}", response_model=UserResponse)
def register_user(role: str, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter((User.email==user.email) | (User.user_id==user.user_id)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email or ID already registered")
    
    new_user = User(
        full_name=user.full_name,
        user_id=user.user_id,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Login
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email, User.role==user.role).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token({"sub": db_user.email, "role": db_user.role})
    return {"access_token": token, "token_type": "bearer", "user": db_user.full_name, "role": db_user.role}
