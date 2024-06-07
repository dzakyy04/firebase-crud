import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBoBeWDZccuqEntqtOBpqVhsH_jYveJfF8",
    authDomain: "fir-crud-cc568.firebaseapp.com",
    projectId: "fir-crud-cc568",
    storageBucket: "fir-crud-cc568.appspot.com",
    messagingSenderId: "601462344604",
    appId: "1:601462344604:web:a9e48421cafb4dac685659"
};

const app = initializeApp(firebaseConfig);

export { app };