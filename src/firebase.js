import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEORdy3jdQM5i--UnGIdLfh0F7XAorDf8",
  authDomain: "handballvmapp.firebaseapp.com",
  projectId: "handballvmapp",
  storageBucket: "handballvmapp.appspot.com",
  messagingSenderId: "56696818972",
  appId: "1:56696818972:web:00561e913a45e695223ed9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
