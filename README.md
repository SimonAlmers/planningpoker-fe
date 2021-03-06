# Planning Poker Frontend

### **Live Demo: [planningpoker.simonalmers.dev](https://planningpoker.simonalmers.dev/)**

A React/Next.js application for managing agile projects with realtime Scrum Poker sessions.

![Realtime Voting Demo](./docs/media/planningpoker-voting-demo.gif)

### The frontend consumes the Planning Poker API found here: [PlanningPoker-API](https://www.github.com/SimonAlmers/planningpoker-be)

# Setup

Clone frontend repo into `project` directory

```bash
git clone git@github.com:SimonAlmers/planningpoker-be.git project
```

Change into the `project` directory

```bash
cd project
```

Add `.env` file in the root of the project dir

```bash
touch .env
```

Add env variables to `.env` file:

To obtain the correct values for the .env file please follow this guide: [Firebase Realtime Database Setup](./docs/FIREBASE_SETUP.md)

```bash
API_BASE_URL=http://localhost:8080
FIREBASE_API_KEY=***
FIREBASE_AUTH_DOMAIN=***
FIREBASE_DATABASE_URL=***
FIREBASE_PROJECT_ID=***
FIREBASE_STORAGE_BUCKET=***
FIREBASE_MESSAGING_SENDER_ID=***
FIREBASE_APP_ID=***
```

Install required packages:

```bash
npm i
```

Run migrations on your local database

```bash
npm run dev
```

### Make sure to start the Django Dev Server before testing the frontend

### Now you should be able to visit the app at the location specified by int the terminal, most likely: [http://localhost:3000/](http://localhost:3000/)
