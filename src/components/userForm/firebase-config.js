import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

//const firebaseConfig = {
//    apiKey: "AIzaSyAvI5EThUuzAVef1vQIw6o6LWhl0W-cQ68",
//    authDomain: "portfoliostorage-6e45d.firebaseapp.com",
//    projectId: "portfoliostorage-6e45d",
//    storageBucket: "portfoliostorage-6e45d.appspot.com",
//    messagingSenderId: "621044251802",
//    appId: "1:621044251802:web:fafc50fd2147c2e3cf3323",
//    measurementId: "G-Q126BVYNZP"
//};

const firebaseConfig = {
    apiKey: "AIzaSyDfuKzHoW8TY3L0e6BY3E-ARXmxhFlh5mk",
    authDomain: "stockportfoilioproj.firebaseapp.com",
    projectId: "stockportfoilioproj",
    storageBucket: "stockportfoilioproj.appspot.com",
    messagingSenderId: "542264860840",
    appId: "1:542264860840:web:af243455f44f1c916f629d",
    measurementId: "G-VCVBTMDDQL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);