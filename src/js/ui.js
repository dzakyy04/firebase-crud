import { fetchData } from "./firestore.js";

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

async function populateTable() {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = '';

    const students = await fetchData();
    tbody.innerHTML = students.map((student, index) => createTableRow(student, index)).join('');
}

function closeAddModal() {
    document.getElementById("add-modal").checked = false;
}

function closeEditModal() {
    document.getElementById("edit-modal").checked = false;
}

function fillEditModal(student) {
    document.getElementById("edit-id").value = student.id;
    document.getElementById("edit-nim").value = student.nim;
    document.getElementById("edit-name").value = student.name;
    document.getElementById("edit-email").value = student.email;
    document.getElementById("edit-phone_number").value = student.phone_number;
}

export { createTableRow, populateTable, closeAddModal, closeEditModal, fillEditModal };
