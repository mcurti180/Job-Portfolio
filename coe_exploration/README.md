# COE Exploration App
https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=4j2X59L6TnnMKqu7
This project is for the Oregon State CS Capstone - College of Engineering Exploration App.

# Dockerized Web App with Flask, React (Vite), and MySQL

This project is a full-stack web application with a Flask backend, a React (Vite) frontend, and a MySQL database. The entire application is dockerized, allowing for easy setup and deployment using Docker Compose.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Project Structure
```
.
├── client # React (Vite) frontend
│ ├── Dockerfile
│ └── ...
├── server # Flask backend
│ ├── Dockerfile
│ └── ...
├── db # Database initialization scripts
│ └── init.sql
└── compose.yaml # Docker Compose configuration file
```
## Getting Started

### Clone the Repository

```
git clone https://github.com/nguyen-bryan/coe_exploration.git
cd coe_exploration
```
## Build and Run with Docker Compose
To build and run the application, use the following command (make sure Docker is running):
```
docker compose up --build
```
This command will:

1. Build the React frontend from the client directory.
2. Build the Flask backend from the server directory.
3. Set up a MySQL database with an initial schema from the db/init.sql file.
4. Start a phpMyAdmin service for database management.
   
## Accessing the Application
Frontend: http://localhost:5173
Backend: http://localhost:8000
phpMyAdmin: http://localhost:8080

## Stopping the Application
To stop the application, press Ctrl+C in the terminal where you ran docker compose up --build. To remove the containers, run:
```
docker-compose down
```

## Resetting the Database
If you need to reset the database, remove the volume by running:
```
docker compose down -v
```
This will delete all data in the database. When you run docker-compose up again, the init.sql script will be executed to set up the initial schema.

### Configuration
## Environment Variables
* The Flask backend runs on port 8000.
* The React frontend runs on port 5173.
* The MySQL database runs on port 32000 (mapped to the internal port 3306).
* The phpMyAdmin service runs on port 8080.

## MySQL Configuration
Root Password: bowleg.historic.TORI
Database Name: exploration
