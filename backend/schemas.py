from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone


# ── Auth ───────────────────────────────────────────────────────────────────────

class UserRegister(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# ── User ──────────────────────────────────────────────────────────────────────

class UserCreate(BaseModel):
    name: str
    email: str
    avatar_url: Optional[str] = None


class UserOut(BaseModel):
    id: int
    name: str
    email: str
    avatar_url: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}


# ── TaskList ───────────────────────────────────────────────────────────────────

class TaskListCreate(BaseModel):
    name: str
    emoji: Optional[str] = "📋"
    owner_id: int


class TaskListUpdate(BaseModel):
    name: Optional[str] = None
    emoji: Optional[str] = None


class TaskListOut(BaseModel):
    id: int
    name: str
    emoji: str
    owner_id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ── Task ───────────────────────────────────────────────────────────────────────

class TaskCreate(BaseModel):
    title: str
    priority: Optional[str] = "Medium"  # High | Medium | Low
    due_date: Optional[datetime] = None
    list_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[str] = None
    completed: Optional[bool] = None
    due_date: Optional[datetime] = None


class TaskOut(BaseModel):
    id: int
    title: str
    priority: str
    completed: bool
    due_date: Optional[datetime] = None
    list_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
