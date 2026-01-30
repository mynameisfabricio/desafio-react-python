from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Activity, ActivityCreate, ActivityUpdate
import database as db

app = FastAPI(title="Gerenciador de Atividades API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "API de Gerenciamento de Atividades"}

@app.get("/activities", response_model=List[Activity])
def get_activities():
    return db.get_all_activities()

@app.get("/activities/{activity_id}", response_model=Activity)
def get_activity(activity_id: int):
    activity = db.get_activity_by_id(activity_id)
    if activity is None:
        raise HTTPException(status_code=404, detail="Atividade não encontrada")
    return activity

@app.post("/activities", response_model=Activity, status_code=201)
def create_activity(activity: ActivityCreate):
    return db.create_activity(activity)

@app.put("/activities/{activity_id}", response_model=Activity)
def update_activity(activity_id: int, activity_update: ActivityUpdate):
    updated_activity = db.update_activity(activity_id, activity_update)
    if updated_activity is None:
        raise HTTPException(status_code=404, detail="Atividade não encontrada")
    return updated_activity

@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: int):
    success = db.delete_activity(activity_id)
    if not success:
        raise HTTPException(status_code=404, detail="Atividade não encontrada")
    return {"message": "Atividade excluída com sucesso"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
