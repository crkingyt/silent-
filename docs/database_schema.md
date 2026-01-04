# Database Schema

*Note: Currently simulated with an in-memory store (`HealthStateStore`). This schema represents the target structure for a relational database (e.g., PostgreSQL).*

## Tables

### Users
- `id`: UUID (PK)
- `email`: VARCHAR (Unique)
- `password_hash`: VARCHAR
- `role`: ENUM ('patient', 'doctor')
- `created_at`: TIMESTAMP

### PatientProfiles
- `user_id`: UUID (FK)
- `age`: INTEGER
- `gender`: VARCHAR
- `height`: FLOAT
- `weight`: FLOAT
- `blood_type`: VARCHAR

### DailyLogs
- `id`: UUID (PK)
- `user_id`: UUID (FK)
- `date`: DATE
- `content`: TEXT
- `mood`: VARCHAR
- `symptoms`: JSONB
- `created_at`: TIMESTAMP

### HealthMetrics
- `id`: UUID (PK)
- `user_id`: UUID (FK)
- `date`: DATE
- `type`: VARCHAR (e.g., 'blood_pressure', 'glucose')
- `value`: FLOAT
- `unit`: VARCHAR

### RiskAssessments
- `id`: UUID (PK)
- `user_id`: UUID (FK)
- `date`: TIMESTAMP
- `diabetes_risk`: FLOAT
- `hypertension_risk`: FLOAT
- `cardiac_risk`: FLOAT
- `liver_risk`: FLOAT
- `factors`: JSONB
