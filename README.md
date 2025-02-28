# Setup
- Environment varialbe; see the .env.example files in both the frontend and backend folders
- to build backend 
        cd backend && yarn build
- to build frontend
        cd fromtend && yarn build
- to start backend
        cd backend && yarn start:prod
- to start frontend
        cd frontend && yarn start

# Seeding
- Before testing the app, seed sample data. To run seeding script
        cd backend yarn seed

- Run seed script before building the backend. Seeding is for testing only

Postgres needs to be setup before running the backend
Start backend before frontend

Tested with node version 22 on windows 11 and ubuntu version 24