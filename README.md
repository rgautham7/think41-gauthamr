# Conversational AI Project

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

## Quick Start

1. Clone the repository.
2. Build and start all services:

   ```bash
   docker-compose up --build
   ```

3. Access the services:
   - **Frontend:** http://localhost:3000
   - **Backend API:** http://localhost:8000
   - **Postgres DB:** localhost:5432 (user: think41_user, password: yourpassword)

## Notes

- The backend will wait for the database to be ready before starting.
- You may need to run Alembic migrations manually the first time (or automate this in the backend Dockerfile/entrypoint).
- Update environment variables as needed for production.
