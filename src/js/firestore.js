import { getFirestore, collection, doc, getDocs, getDoc, addDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./config.js";

const db = getFirestore(app);

async function fetchData() {
    const snapshot = await getDocs(collection(db, "students"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}

async function getDocById(id) {
    const document = await getDoc(doc(db, "students", id));
    if (document.exists()) {
        return { id: document.id, ...document.data() };
    } else {
        console.error("No such document!");
        return null;
    }
}

async function storeData(data) {
    await addDoc(collection(db, "students"), data);
}

async function deleteData(id) {
    await deleteDoc(doc(db, "students", id));
}

async function updateData(id, data) {
    await setDoc(doc(db, "students", id), data, { merge: true });
}

export { fetchData, getDocById, storeData, deleteData, updateData };
