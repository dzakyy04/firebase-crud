// Modify the firebaseConfig and rename this file to config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    projectId: "Your Project ID",
    storageBucket: "Your Storage Bucket",
    messagingSenderId: "Your Sender ID",
    appId: "Your App ID"
};

const app = initializeApp(firebaseConfig);

export { app };