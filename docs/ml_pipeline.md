# ML Pipeline

## Overview
The AI Engine uses a hybrid approach combining Rule-Based Systems (Expert Systems) and Machine Learning (Random Forest).

## 1. Data Generation
- **Script**: `ai_engine/training/train_model.py`
- **Method**: Generates synthetic patient data based on medical guidelines (ADA, JNC 8).
- **Features**: Age, BMI, Smoking, Alcohol, Stress, Systolic BP, Diastolic BP, Glucose.
- **Targets**: Diabetes Risk, Hypertension Risk, Liver Risk, Cardiac Risk.

## 2. Training
- **Algorithm**: Random Forest Regressor (`sklearn.ensemble.RandomForestRegressor`).
- **Reasoning**: Handles non-linear relationships well and provides feature importance.
- **Output**: `ai_engine/models/risk_model.pkl`.

## 3. Inference
- **Script**: `ai_engine/inference/predict_risk.py`
- **Process**:
    1.  Loads the `.pkl` model.
    2.  Accepts patient data dictionary.
    3.  Preprocesses/Imputes missing values with defaults.
    4.  Predicts risk scores.
    5.  **Fallback**: If model loading fails, reverts to hard-coded medical heuristics.

## 4. NLP (Natural Language Processing)
- **Script**: `ai_engine/nlp/habit_extractor.py`
- **Task**: Keyword extraction and sentiment analysis.
- **Features**: Negation handling (e.g., "not smoking"), context awareness.
