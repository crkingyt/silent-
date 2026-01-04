# API Documentation

## Base URL
`http://localhost:8000/api/v1`

## Endpoints

### Voice NLP
- **POST** `/voice-nlp/analyze-text`
    - **Body**: `{"text": "string", "language": "string"}`
    - **Description**: Analyzes text for health insights. Translates if necessary.
    - **Response**: Analysis result including detected habits, symptoms, and risk prediction.

### Recommendations
- **GET** `/recommendations/`
    - **Description**: Retrieves personalized health recommendations based on current state.
    - **Response**: List of critical actions and daily improvements.

- **POST** `/recommendations/complete/{action_type}`
    - **Path Params**: `action_type` (e.g., "smoking", "stress")
    - **Description**: Marks an action as complete and triggers AI re-evaluation.
    - **Response**: Updated risk scores.

### Risk Engine
- **POST** `/risk/predict`
    - **Body**: `RiskInput` object (age, bmi, habits, vitals).
    - **Description**: Direct access to the risk prediction model.
    - **Response**: Risk percentages for various conditions.

### Daily Log
- **POST** `/daily-log/`
    - **Body**: Log entry details.
    - **Description**: Saves a daily health log.

### Auth (Mock)
- **POST** `/auth/login`
    - **Body**: Credentials.
    - **Description**: Simulates user login.
