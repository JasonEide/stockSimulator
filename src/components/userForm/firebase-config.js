import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAvI5EThUuzAVef1vQIw6o6LWhl0W-cQ68",
    authDomain: "portfoliostorage-6e45d.firebaseapp.com",
    projectId: "portfoliostorage-6e45d",
    storageBucket: "portfoliostorage-6e45d.appspot.com",
    messagingSenderId: "621044251802",
    appId: "1:621044251802:web:fafc50fd2147c2e3cf3323",
    measurementId: "G-Q126BVYNZP"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);