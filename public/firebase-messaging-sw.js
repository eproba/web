// Placeholder Firebase Messaging Service Worker
// This file exists to prevent 404 errors when Firebase tries to register firebase-messaging-sw.js
// The actual FCM functionality is handled by our Serwist service worker at /sw.js

console.log("Firebase Messaging placeholder service worker loaded");

// Import and initialize Firebase Messaging
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/11.10.0/firebase-messaging-compat.js",
);

// Initialize Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBKVP78_xDjRNNs9VBk2fEvLOvhxRL2kng",
  authDomain: "scouts-exams.firebaseapp.com",
  projectId: "scouts-exams",
  storageBucket: "scouts-exams.appspot.com",
  messagingSenderId: "897419344971",
  appId: "1:897419344971:web:dd3325a492cc57756d61ce",
  measurementId: "G-YB1DB8G1WG",
});

// Initialize Firebase Messaging
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const messaging = firebase.messaging();
