importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');

importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

const firebaseConfig = {
  apiKey: 'AIzaSyB-xLqnMwB0zmBrG5OCE2q_5i-XcnaJ-l0',
  authDomain: 'hubmee-294017.firebaseapp.com',
  projectId: 'hubmee-294017',
  storageBucket: 'hubmee-294017.appspot.com',
  messagingSenderId: '32760041861',
  appId: '1:32760041861:web:73151dfe6fafa1d56e74ec',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
