from pydantic import BaseModel
from typing import Optional
from enum import Enum

class StatusEnum(str, Enum):
    pendente = "pendente"
    em_andamento = "em andamento"
    concluido = "concluído"

class ActivityBase(BaseModel):
    titulo: str
    descricao: str
    status: StatusEnum = StatusEnum.pendente

class ActivityCreate(ActivityBase):
    pass

class ActivityUpdate(BaseModel):
    titulo: Optional[str] = None
    descricao: Optional[str] = None
    status: Optional[StatusEnum] = None

class Activity(ActivityBase):
    id: int

    class Config:
        from_attributes = True
