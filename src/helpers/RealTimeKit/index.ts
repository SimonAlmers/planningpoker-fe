import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  // firebase
  //   .auth()
  //   .signInWithCustomToken(token)
  //   .then((userCredential) => {
  //     // Signed in
  //     var user = userCredential.user;
  //     console.dir(user);
  //     // ...
  //   })
  //   .catch((error) => {
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ...
  //   });
}

type SnapshotCallback = (snapShot: firebase.database.DataSnapshot) => void;

export const objectToArray = (obj: object) => {
  const array = [];
  Object.keys({ ...obj }).forEach((key) => {
    array.push({ id: [key], ...obj[key] });
  });
  return array;
};

const eventListners = (ref: firebase.database.Reference) => ({
  getInitial: (onChange: SnapshotCallback) => {
    ref.once("value", (snapshot) => onChange(snapshot));
  },
  onValue: (onChange: SnapshotCallback) => {
    ref.on("value", (snapshot) => onChange(snapshot));
  },
  onChildAdded: (onChange: SnapshotCallback) => {
    ref
      .limitToLast(100)
      .orderByChild("createdAt")
      .on("child_added", (snapshot) => onChange(snapshot));
  },
  onChildChanges: (onChange: SnapshotCallback) => {
    ref.on("child_changed", (snapshot) => onChange(snapshot));
  },
  off: () => {
    ref.off();
  },
});

const RealTimeKit = {
  user: {
    notifications: (userId: string) => {
      const ref = firebase.database().ref(`/users/${userId}/notifications`);
      return eventListners(ref);
    },
  },
  story: {
    votes: (projectId: string, storyId: string) => {
      const ref = firebase
        .database()
        .ref(`/projects/${projectId}/stories/${storyId}/votes`);
      return eventListners(ref);
    },
    chat: (projectId: string, storyId: string) => {
      const ref = firebase
        .database()
        .ref(`/projects/${projectId}/story/${storyId}/comments`);
      return eventListners(ref);
    },
  },
  session: {
    focusedStory: (projectId: string, sessionId: string) => {
      const ref = firebase
        .database()
        .ref(`/projects/${projectId}/sessions/${sessionId}/focusedStory`);
      return eventListners(ref);
    },
    chat: (projectId: string, sessionId: string) => {
      const ref = firebase
        .database()
        .ref(`/projects/${projectId}/sessions/${sessionId}/comments`);
      return eventListners(ref);
    },
  },
};

export default RealTimeKit;
