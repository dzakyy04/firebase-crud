// Modify the firebaseConfig and rename this file to config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"

const firebaseConfig = {
    apiKey: "Your API Key",
    authDomain: "Your Auth Domain",
    projectId: "Your Project ID",
    storageBucket: "Your Storage Bucket",
    messagingSenderId: "Your Sender ID",
    appId: "Your App ID"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };