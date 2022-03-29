import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updatePassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCv2BTo-WFKmpryOoRSIWuybBXdWk_rXwM",
    authDomain: "helloarttoken.firebaseapp.com",
    projectId: "helloarttoken",
    storageBucket: "helloarttoken.appspot.com",
    messagingSenderId: "399318269235",
    appId: "1:399318269235:web:a391f4448258de17ed1246",
    measurementId: "G-L5CN3YYBDX"
};

initializeApp(firebaseConfig);

export const firebaseGetAuth = () => getAuth();
export const firebaseCreateUser = (auth, email, password) => createUserWithEmailAndPassword(auth, email, password);
export const firebaseLogin = (auth, email, password) => signInWithEmailAndPassword(auth, email, password);
export const firebaseSendEmailVerification = (auth, user) => sendEmailVerification(auth, user);
export const firebaseSendPasswordResetEmail = (auth, email) => sendPasswordResetEmail(auth, email)
export const firebaseUpdatePassword = (user, newPassword) => updatePassword(user, newPassword)