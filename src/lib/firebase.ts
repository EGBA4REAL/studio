
import { initializeApp, getApp, getApps } from 'firebase/app';

const firebaseConfig = {
  "projectId": "studio-9108138070-ae764",
  "appId": "1:569612845856:web:4dfcffc1bd706f26da4d45",
  "apiKey": "AIzaSyAxP3eNYP1BzM3vKUjuWjuSVVftpEMnSC8",
  "authDomain": "studio-9108138070-ae764.firebaseapp.com",
  "storageBucket": "studio-9108138070-ae764.appspot.com",
  "messagingSenderId": "569612845856",
  "measurementId": "G-93S4JS065W"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
