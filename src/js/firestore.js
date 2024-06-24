import { getFirestore, collection, doc, getDocs, getDoc, addDoc, deleteDoc, setDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js"
import { app, storage } from "./config.js";

const db = getFirestore(app);

async function fetchData(nim) {
    let snapshot;
    if (nim) {
        const q = query(collection(db, "students"), where('nim', '>=', nim), where('nim', '<=', nim + '\uf8ff'));
        snapshot = await getDocs(q);
    } else {
        snapshot = await getDocs(collection(db, "students"));
    }

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

async function uploadPhoto(file) {
    const storageRef = ref(storage, 'images/' + file.name);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Image available at', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Image upload failed', error);
    }
}

export { fetchData, getDocById, storeData, deleteData, updateData, uploadPhoto };
