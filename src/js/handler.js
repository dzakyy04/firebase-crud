// Import dependencies
import { app } from "./config.js";
import { getFirestore, collection, doc, getDocs, getDoc, addDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Get Firestore instance
const db = getFirestore(app);

// Fetch data from Firestore
async function fetchData() {
    const snapshot = await getDocs(collection(db, "students"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
}

// Get document by ID
async function getDocById(id) {
    const document = await getDoc(doc(db, "students", id));
    if (document.exists()) {
        return { id: document.id, ...document.data() };
    } else {
        console.error("No such document!");
        return null;
    }
}

// Create table row HTML
function createTableRow(student, index) {
    return `
        <tr>
            <th>${index + 1}</th>
            <td>${student.nim}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone_number}</td>
            <td>
                <span class="cursor-pointer badge edit-data badge-warning" data-id="${student.id}">Edit</span>
                <span class="cursor-pointer badge delete-data badge-error" data-id="${student.id}">Delete</span>
            </td>
        </tr>
    `;
}

// Populate table with data
async function populateTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';

    const students = await fetchData();
    tbody.innerHTML = students.map((student, index) => createTableRow(student, index)).join('');
}

// Store data in Firestore
async function storeData(data) {
    await addDoc(collection(db, "students"), data);
    populateTable();
}

// Close add modal
function closeAddModal() {
    document.getElementById("add-modal").checked = false;
}

// Close add modal
function closeEditModal() {
    document.getElementById("edit-modal").checked = false;
}

// Handle form submission
function handleAddForm(event) {
    event.preventDefault();
    const nim = document.getElementById("nim").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("phone_number").value;

    storeData({ nim, name, email, phone_number });

    document.getElementById("add-data-form").reset();
    populateTable();
    closeAddModal();
}

// Delete data from Firestore
async function deleteData(id) {
    await deleteDoc(doc(db, "students", id));
    populateTable();
}

// Fill edit modal with data
async function fillEditModal(id) {
    const student = await getDocById(id);
    if (student) {
        document.getElementById("edit-id").value = student.id;
        document.getElementById("edit-nim").value = student.nim;
        document.getElementById("edit-name").value = student.name;
        document.getElementById("edit-email").value = student.email;
        document.getElementById("edit-phone_number").value = student.phone_number;
    }
}

async function updateData(id, data) {
    await setDoc(doc(db, "students", id), data, { merge: true });
}

function handleEditForm(event) {
    event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const nim = document.getElementById("edit-nim").value;
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const phone_number = document.getElementById("edit-phone_number").value;

    updateData(id, { nim, name, email, phone_number });

    document.getElementById("edit-data-form").reset();
    populateTable();
    closeEditModal();
}

// Event listeners
document.getElementById("add-data-form").addEventListener("submit", handleAddForm);
document.getElementById("edit-data-form").addEventListener("submit", handleEditForm);

document.getElementById("tbody").addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("delete-data")) {
        const deleteModal = document.getElementById("delete-modal");
        deleteModal.checked = true;

        const confirmDelete = document.getElementById("confirm-delete");
        const cancelDelete = document.getElementById("cancel-delete");

        confirmDelete.addEventListener("click", () => {
            deleteData(id);
            deleteModal.checked = false;
        }, { once: true });

        cancelDelete.addEventListener("click", () => {
            deleteModal.checked = false;
        }, { once: true });
    }

    if (e.target.classList.contains("edit-data")) {
        const editModal = document.getElementById("edit-modal");
        editModal.checked = true;
        fillEditModal(id);
    }
});

// Initial population of table
populateTable();