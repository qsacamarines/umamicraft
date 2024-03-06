// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRuhE5aznWAD-YGtu0xD4PYc2Z_zy__0c",
  authDomain: "umami-craft-155bf.firebaseapp.com",
  projectId: "umami-craft-155bf",
  storageBucket: "umami-craft-155bf.appspot.com",
  messagingSenderId: "222702959221",
  appId: "1:222702959221:web:c660dd4e3239821819963c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export default app;
export { database };
export { storage };