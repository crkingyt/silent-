# System Architecture

## Overview
The Silent Disease Engine is a comprehensive health monitoring system designed to detect early signs of silent diseases through voice analysis, daily logs, and medical data integration.

## Components

### 1. Frontend (Next.js)
- **User Interface**: Responsive web application for patients and doctors.
- **Voice Recorder**: Captures user voice logs using Web Speech API.
- **Dashboard**: Visualizes health metrics and risk assessments.
- **Tech Stack**: Next.js, React, Tailwind CSS, Lucide Icons.

### 2. Backend (FastAPI)
- **API Layer**: RESTful endpoints for data management and analysis.
- **Voice NLP**: Processes voice transcripts to extract health insights.
- **Risk Engine**: Orchestrates risk prediction logic.
- **Memory Store**: Temporary in-memory storage for session data (simulating a database).
- **Tech Stack**: Python, FastAPI, Pydantic.

### 3. AI Engine (Python)
- **NLP Module**: Extracts habits, symptoms, and sentiment from text.
- **Inference Engine**: Predicts disease risks based on extracted data and medical heuristics/ML models.
- **Training Module**: Generates synthetic data and trains ML models (Random Forest).
- **Tech Stack**: scikit-learn, pandas, numpy, joblib.

## Data Flow
1.  **Input**: User speaks into the frontend or types a log.
2.  **Processing**: Backend receives text/audio. NLP module extracts keywords (habits, symptoms).
3.  **Analysis**: Risk Engine calculates risk scores (Diabetes, Hypertension, etc.) using the ML model or heuristics.
4.  **Storage**: Results are stored in the Memory Store.
5.  **Output**: Frontend fetches recommendations and alerts based on the analysis.

## Diagram
[Frontend] <-> [Backend API] <-> [AI Engine]
                                      ^
                                      |
                                [Memory Store]
