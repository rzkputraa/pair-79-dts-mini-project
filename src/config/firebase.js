import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDut4gZSFFew-UvmZHsRrywfEnuUzYKEFc",
  authDomain: "pair-79-dts-mini-project.firebaseapp.com",
  projectId: "pair-79-dts-mini-project",
  storageBucket: "pair-79-dts-mini-project.appspot.com",
  messagingSenderId: "373122798583",
  appId: "1:373122798583:web:6c7a6176b3610aceed94f2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };