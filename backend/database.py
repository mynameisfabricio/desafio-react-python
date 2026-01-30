import json
import os
from typing import List, Optional
from models import Activity, ActivityCreate, ActivityUpdate

DATABASE_FILE = "activities.json"

def load_activities() -> List[dict]:
    if not os.path.exists(DATABASE_FILE):
        return []
    
    with open(DATABASE_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_activities(activities: List[dict]):
    with open(DATABASE_FILE, 'w', encoding='utf-8') as f:
        json.dump(activities, f, ensure_ascii=False, indent=2)

def get_all_activities() -> List[Activity]:
    data = load_activities()
    return [Activity(**activity) for activity in data]

def get_activity_by_id(activity_id: int) -> Optional[Activity]:
    activities = load_activities()
    for activity in activities:
        if activity['id'] == activity_id:
            return Activity(**activity)
    return None

def create_activity(activity: ActivityCreate) -> Activity:
    activities = load_activities()
    
    new_id = max([a['id'] for a in activities], default=0) + 1
    
    new_activity = {
        "id": new_id,
        "titulo": activity.titulo,
        "descricao": activity.descricao,
        "status": activity.status
    }
    
    activities.append(new_activity)
    save_activities(activities)
    
    return Activity(**new_activity)

def update_activity(activity_id: int, activity_update: ActivityUpdate) -> Optional[Activity]:
    activities = load_activities()
    
    for i, activity in enumerate(activities):
        if activity['id'] == activity_id:
            if activity_update.titulo is not None:
                activities[i]['titulo'] = activity_update.titulo
            if activity_update.descricao is not None:
                activities[i]['descricao'] = activity_update.descricao
            if activity_update.status is not None:
                activities[i]['status'] = activity_update.status
            
            save_activities(activities)
            return Activity(**activities[i])
    
    return None

def delete_activity(activity_id: int) -> bool:
    activities = load_activities()
    
    for i, activity in enumerate(activities):
        if activity['id'] == activity_id:
            activities.pop(i)
            save_activities(activities)
            return True
    
    return False
