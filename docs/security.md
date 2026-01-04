# Security & Compliance

## Overview
This document outlines the security measures and compliance considerations for the Silent Disease Engine.

## Data Privacy
- **Local Processing**: The current implementation runs locally. No data is sent to external cloud servers for AI processing (except for the Google Translate API if used).
- **In-Memory Storage**: Data is currently stored in memory and is lost upon server restart, ensuring no long-term persistence of sensitive data during the prototype phase.

## HIPAA Considerations (Future Roadmap)
To become HIPAA compliant, the following must be implemented:
1.  **Encryption**: All data at rest (database) and in transit (HTTPS) must be encrypted.
2.  **Access Control**: Strict role-based access control (RBAC) for patients and doctors.
3.  **Audit Logs**: Comprehensive logging of all data access and modifications.
4.  **BAA**: Business Associate Agreements with any third-party service providers.

## Authentication
- **JWT**: The system is designed to use JSON Web Tokens (JWT) for secure stateless authentication (implementation pending in full production version).

## Input Validation
- **Pydantic**: All API inputs are validated using Pydantic models to prevent injection attacks and ensure data integrity.
