// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-RCYag58Yq0LNeAcOSDsTMnobPEwz2lE",
    authDomain: "itreg-backend.firebaseapp.com",
    projectId: "itreg-backend",
    storageBucket: "itreg-backend.appspot.com",
    messagingSenderId: "183260051949",
    appId: "1:183260051949:web:e458634c9bb1493767cfe4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app