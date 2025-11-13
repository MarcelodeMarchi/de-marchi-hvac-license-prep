import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKjaG68MlZztSTv66mnJBrzy5kzhgEdA0",
  authDomain: "de-marchi-hvac-license-prep.firebaseapp.com",
  projectId: "de-marchi-hvac-license-prep",
  storageBucket: "de-marchi-hvac-license-prep.firebasestorage.app",
  messagingSenderId: "66269328299",
  appId: "1:66269328299:web:b93763dfb5644c20b5d8ee"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
