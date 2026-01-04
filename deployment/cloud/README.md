# Cloud Deployment Guide

## AWS / Azure / GCP

To deploy this application to a cloud provider:

1.  **Container Registry**: Push the Docker images to ECR (AWS), ACR (Azure), or GCR (Google).
2.  **Orchestration**: Use Kubernetes (EKS/AKS/GKE) or a simpler service like AWS App Runner / Azure App Service.
3.  **Environment Variables**: Set `PYTHONPATH` and any API keys in the cloud environment configuration.
4.  **Database**: Replace the in-memory store with a managed database instance (RDS/Cloud SQL).

## CI/CD
- Set up GitHub Actions or GitLab CI to automatically build and test the application on push.
