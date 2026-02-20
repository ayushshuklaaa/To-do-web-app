from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/lists", tags=["lists"])


@router.get("/", response_model=list[schemas.TaskListOut])
def get_lists(owner_id: int, db: Session = Depends(get_db)):
    return db.query(models.TaskList).filter(models.TaskList.owner_id == owner_id).all()


@router.post("/", response_model=schemas.TaskListOut, status_code=201)
def create_list(task_list: schemas.TaskListCreate, db: Session = Depends(get_db)):
    # Verify owner exists
    owner = db.query(models.User).filter(models.User.id == task_list.owner_id).first()
    if not owner:
        raise HTTPException(status_code=404, detail="User not found")
    db_list = models.TaskList(**task_list.model_dump())
    db.add(db_list)
    db.commit()
    db.refresh(db_list)
    return db_list


@router.patch("/{list_id}", response_model=schemas.TaskListOut)
def update_list(list_id: int, updates: schemas.TaskListUpdate, db: Session = Depends(get_db)):
    db_list = db.query(models.TaskList).filter(models.TaskList.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_list, field, value)
    db.commit()
    db.refresh(db_list)
    return db_list


@router.delete("/{list_id}", status_code=204)
def delete_list(list_id: int, db: Session = Depends(get_db)):
    db_list = db.query(models.TaskList).filter(models.TaskList.id == list_id).first()
    if not db_list:
        raise HTTPException(status_code=404, detail="List not found")
    db.delete(db_list)
    db.commit()
