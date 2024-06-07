// Import dependencies
import { app } from "./config.js";
import { getFirestore, collection, doc, getDocs, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Get Firestore instance
const db = getFirestore(app);

// Fetch data from Firestore
const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

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
                <span class="cursor-pointer badge badge-warning">Edit</span>
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
    const rows = students.map((student, index) => createTableRow(student, index)).join('');

    tbody.innerHTML = rows;
}

// Store data in Firestore
async function storeData(data) {
    await addDoc(collection(db, "students"), data);
    populateTable();
}

// Close add modal
function closeAddModal() {
    const modalCheckbox = document.getElementById("add-modal");
    modalCheckbox.checked = false;
}

// Handle form submission
function handleAddForm(event) {
    event.preventDefault();
    const nim = document.getElementById("nim");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone_number = document.getElementById("phone_number");

    storeData({
        nim: nim.value,
        name: name.value,
        email: email.value,
        phone_number: phone_number.value
    });

    document.getElementById("add-data-form").reset();
    closeAddModal();
}

// Delete data from Firestore
async function deleteData(id) {
    const confirmation = confirm("Are you sure you want to delete this data?");
    if (confirmation) {
        await deleteDoc(doc(db, "students", id));
        populateTable();
    }
}

// Event listeners
document.getElementById("add-data-form").addEventListener("submit", handleAddForm);
document.getElementById("tbody").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-data")) {
        const id = e.target.dataset.id;
        deleteData(id);
    }
});

// Initial population of table
populateTable();
