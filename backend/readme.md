# ReadMe

## Installation
1. Run the docker-compose file in the project root to create the database:
```sh
docker compose up -d
```
2. Install the dependencies using `yarn` or `npm install`
3. Navigate to `http://localhost:3001/api` and check if the API is running.

## Folder structure
- `backend/`
  - `config/`: configuration files
  - `controllers/`: contains functions bound to endpoints
  - `middleware/`: middleware functions (e.g. global error handler, authentication)
  - `models/`: contains the database models with **typeorm** decorators
    - `index.ts`: array of all database models, types used in database models
  - `types/`: contains general types (e.g. `ApiError`)
  - `util/`: contains util functions
  - `app.ts`: the express.js app
  - `index.ts`: the start script for the server
  - `routes.ts`: the routes for the API endpoints