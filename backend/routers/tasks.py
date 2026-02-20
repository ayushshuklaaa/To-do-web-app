from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas

router = APIRouter(prefix="/api/tasks", tags=["tasks"])


@router.get("/", response_model=list[schemas.TaskOut])
def get_tasks(list_id: int, db: Session = Depends(get_db)):
    """Get all tasks for a given list."""
    return db.query(models.Task).filter(models.Task.list_id == list_id).all()


@router.post("/", response_model=schemas.TaskOut, status_code=201)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    # Verify list exists
    task_list = db.query(models.TaskList).filter(models.TaskList.id == task.list_id).first()
    if not task_list:
        raise HTTPException(status_code=404, detail="List not found")
    db_task = models.Task(**task.model_dump())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.patch("/{task_id}", response_model=schemas.TaskOut)
def update_task(task_id: int, updates: schemas.TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_task, field, value)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()


@router.patch("/finish-all/{list_id}", response_model=list[schemas.TaskOut])
def finish_all_tasks(list_id: int, db: Session = Depends(get_db)):
    """Mark all tasks in a list as completed."""
    tasks = db.query(models.Task).filter(models.Task.list_id == list_id).all()
    for task in tasks:
        task.completed = True
    db.commit()
    return tasks
