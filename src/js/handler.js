import { app } from "./config.js"
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const db = getFirestore(app);

const fetchData = async () => {
    const snapshot = await getDocs(collection(db, "students"));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};

function createTableRow(mhs, index) {
    const row = `
        <tr>
            <th>${index + 1}</th>
            <td>${mhs.nim}</td>
            <td>${mhs.name}</td>
            <td>${mhs.email}</td>
            <td>${mhs.phone_number}</td>
            <td>
                <span class="badge badge-warning">Edit</span>
                <span class="badge badge-error">Delete</span>
            </td>
        </tr>
    `;

    return row;
}

async function populateTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';

    const mahasiswa = await fetchData();
    const rows = mahasiswa.map((mhs, index) => createTableRow(mhs, index)).join('');

    tbody.innerHTML = rows;
}


async function storeData(data) {
    await addDoc(collection(db, "students"), data);
    populateTable();
}

function closeAddModal() {
    const modalCheckbox = document.getElementById("add-modal");
    modalCheckbox.checked = false;
}

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

document.getElementById("add-data-form").addEventListener("submit", handleAddForm);

populateTable();