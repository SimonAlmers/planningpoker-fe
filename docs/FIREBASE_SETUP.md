# Firebase Realtime Database Setup

## 1. Go to [firebase.google.com](https://firebase.google.com/)

## 2. Add project

### Give the project a name

![](./media/firebase_setup/name_project.png)

### Don't enable Google Analytics

![](./media/firebase_setup/analytics.png)

### Project is created

![](./media/firebase_setup/created.png)

### On The Firebase Console, Click the "</>" button

![](./media/firebase_setup/console.png)

### Register web app

No need to select hosting.

![](./media/firebase_setup/app.png)

### Copy contents of `firebaseConfig` to your `.env` file

Continue to console

![](./media/firebase_setup/app_config.jpg)

```javascript
var firebaseConfig = {
  apiKey: "******",
  authDomain: "planningpoker-public.firebaseapp.com",
  projectId: "planningpoker-public",
  storageBucket: "planningpoker-public.appspot.com",
  messagingSenderId: "******",
  appId: "******",
};
```

```bash

FIREBASE_API_KEY=***
FIREBASE_AUTH_DOMAIN=planningpoker-public.firebaseapp.com
FIREBASE_PROJECT_ID=planningpoker-public
FIREBASE_STORAGE_BUCKET=planningpoker-public.appspot.com
FIREBASE_MESSAGING_SENDER_ID=***
FIREBASE_APP_ID=***
```

### Also add the url found in the root of the database to the `.env` file

![](./media/firebase_setup/database_url.png)

```bash
FIREBASE_DATABASE_URL=https://planningpoker-public-default-rtdb.europe-west1.firebasedatabase.app/
```

### Click the Realtime Database link in the menu

![](./media/firebase_setup/realtime_database_menu_option.png)

### Create Realtime Database

![](./media/firebase_setup/create_realtime_database.png)

### Select Database Location

![](./media/firebase_setup/setup_database_step_1.png)

### Select Database Security Rules to `test mode`

![](./media/firebase_setup/setup_database_step_2.png)

### The Database is now created!

![](./media/firebase_setup/database_home.png)

### The Database is now created!

![](./media/firebase_setup/project_settings_menu_option.png)

### The Database is now created!

![](./media/firebase_setup/service_account_settings.png)

### Generate Firebase AdminSDK Key JSON-file

![](./media/firebase_setup/generate_key.png)

### Rename the JSON-File and put it in the Root of the BACKEND Repo

`planning-poker-base.adminsdk.json`

# Now we should be good to go!

[Back To README](/README.md)
