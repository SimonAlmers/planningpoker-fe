# Planning Poker Frontend

[Backend Repo](https://www.github.com/SimonAlmers/planningpoker-be)

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

```bash
API_BASE_URL=http://localhost:8000
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
