from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from typing import List
import models
import schemas

# Prebatch Record CRUD
def get_prebatch_records(db: Session, skip: int = 0, limit: int = 100) -> List[models.PrebatchRecord]:
    """Get list of prebatch records with pagination"""
    return db.query(models.PrebatchRecord).order_by(models.PrebatchRecord.created_at.desc()).offset(skip).limit(limit).all()

def create_prebatch_record(db: Session, record: schemas.PrebatchRecordCreate) -> models.PrebatchRecord:
    """Create new prebatch record"""
    try:
        db_record = models.PrebatchRecord(**record.dict())
        db.add(db_record)
        db.commit()
        db.refresh(db_record)
        return db_record
    except IntegrityError as e:
        db.rollback()
        raise ValueError(f"Database integrity error: {str(e)}")
    except SQLAlchemyError as e:
        db.rollback()
        raise RuntimeError(f"Database error: {str(e)}")
