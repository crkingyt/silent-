# Demo Script

## Scenario: Early Detection of Hypertension & Stress

### Step 1: Setup
1.  Start Backend: `python -m uvicorn app.main:app --reload` (in `backend/`)
2.  Start Frontend: `npm run dev` (in `frontend/`)
3.  Open Browser: `http://localhost:3000`

### Step 2: Voice Input
1.  Navigate to **Voice Log**.
2.  Select Language (e.g., English or Hindi).
3.  Click **Start Recording**.
4.  **Say**: "I have been feeling very stressed at work lately. I've started smoking again to cope, and I'm not sleeping well."
5.  Click **Stop Recording** -> **Submit**.

### Step 3: Analysis
1.  Observe the "Analyzing..." state.
2.  See the immediate result:
    - **Habits Detected**: Smoking, Stress.
    - **Symptoms**: Sleep Issues.
    - **Risk Level**: High.

### Step 4: Recommendations
1.  Navigate to **Recommendations**.
2.  Notice the **"Smoking Remediation"** card (Critical Action).
3.  Notice the **"Manage High Stress"** card.
4.  Expand the "Smoking Remediation" card to see the **Progress Plan**.

### Step 5: Feedback Loop
1.  Click **"MARK RESOLVED"** on the Smoking card.
2.  The system updates the AI model (simulating that the user has quit).
3.  The risk score decreases internally.
