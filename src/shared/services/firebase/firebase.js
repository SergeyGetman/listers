import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_API_KEY,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const publicKey = process.env.REACT_APP_FIREBASE_VAID_KEY;

let messaging = new Promise(function () {});
// TODO safari does not support firebase messaging
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
} else {
  messaging.getToken = () => {};
  messaging.onMessage = () => {};
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

export const getToken = async () => {
  let currentToken = '';

  try {
    currentToken = await messaging.getToken({ vapidKey: publicKey });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('An error occurred while retrieving token. ', error);
  }

  return currentToken;
};

export default firebase;
