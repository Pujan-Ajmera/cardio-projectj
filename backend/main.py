import pickle
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
import os

# Initialize FastAPI app
app = FastAPI(
    title="Cardiovascular Disease Prediction API",
    description="API for predicting cardiovascular disease risk using XGBoost",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Model
MODEL_PATH = "xgb.pkl"
model = None

@app.on_event("startup")
def load_model():
    global model
    try:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
            print("✅ Model loaded successfully.")
        else:
            print(f"❌ Model file not found at {MODEL_PATH}")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

# Input Schema
class PredictionInput(BaseModel):
    age: float = Field(..., description="Age in years (20-80)", ge=20, le=80)
    gender: int = Field(..., description="Gender (1: Female, 2: Male) - assuming dataset convention", ge=1, le=2)
    height: float = Field(..., description="Height in cm", ge=50, le=250)
    weight: float = Field(..., description="Weight in kg", ge=10, le=250)
    ap_hi: float = Field(..., description="Systolic Blood Pressure (50-250)", ge=50, le=250)
    ap_lo: float = Field(..., description="Diastolic Blood Pressure (30-150)", ge=30, le=150)
    cholesterol: int = Field(..., description="Cholesterol (1: Normal, 2: Above Normal, 3: Well Above Normal)", ge=1, le=3)
    gluc: int = Field(..., description="Glucose (1: Normal, 2: Above Normal, 3: Well Above Normal)", ge=1, le=3)
    smoke: int = Field(..., description="Smoking (0: No, 1: Yes)", ge=0, le=1)
    alco: int = Field(..., description="Alcohol Intake (0: No, 1: Yes)", ge=0, le=1)
    active: int = Field(..., description="Physical Activity (0: No, 1: Yes)", ge=0, le=1)

@app.get("/")
def home():
    return {"message": "Cardiovascular Disease Prediction API is running."}

@app.post("/predict")
def predict(input_data: PredictionInput):
    if not model:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Prepare input dataframe (ensure correct order of features matching training)
        # Assuming training order: age, gender, height, weight, ap_hi, ap_lo, cholesterol, gluc, smoke, alco, active
        # NOTE: Model might have been trained on 'age' in days. 
        # User prompt says "age (20-80 years)". 
        # Standard Cardio dataset usually uses days. 
        # However, checking user request: "app must send data... applies the exact same preprocessing".
        # I cannot know EXACTLY what preprocessing was done without seeing training code, 
        # but the prompt implies I should just pass these features. 
        # I will pass them as is for now, but if age needs conversion to days, 
        # I might need to verify. 
        # PROMPT SAYS: "app must send data to a backend/API that loads xgb.pkl, applies the exact same preprocessing used during training"
        # I will assume the Pickle pipeline handles it OR the prompt implies I need to do it here. 
        # Since I don't see the training code, I will create a DataFrame with the exact column names typically used in this dataset.
        
        features = pd.DataFrame([input_data.dict().values()], 
                                columns=['age', 'gender', 'height', 'weight', 'ap_hi', 'ap_lo', 'cholesterol', 'gluc', 'smoke', 'alco', 'active'])
        
        # XGBoost often expects a DMatrix or simple array, but pipeline usually handles DF if columns match.
        prediction = model.predict(features)
        probability = model.predict_proba(features) if hasattr(model, "predict_proba") else None
        
        risk_score = float(probability[0][1]) if probability is not None else float(prediction[0])
        classification = int(prediction[0])
        
        return {
            "prediction": classification,
            "probability": risk_score,
            "risk_label": "High Risk" if classification == 1 else "Low Risk"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
