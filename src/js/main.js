import { storeData, deleteData, getDocById, updateData } from "./firestore.js";
import { populateTable, closeAddModal, closeEditModal, fillEditModal } from "./ui.js";

async function handleAddForm(event) {
    event.preventDefault();
    const nim = document.getElementById("nim").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone_number = document.getElementById("phone_number").value;

    await storeData({ nim, name, email, phone_number });

    document.getElementById("add-data-form").reset();
    populateTable();
    closeAddModal();
}

async function handleEditForm(event) {
    event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const nim = document.getElementById("edit-nim").value;
    const name = document.getElementById("edit-name").value;
    const email = document.getElementById("edit-email").value;
    const phone_number = document.getElementById("edit-phone_number").value;

    await updateData(id, { nim, name, email, phone_number });

    document.getElementById("edit-data-form").reset();
    populateTable();
    closeEditModal();
}

document.getElementById("add-data-form").addEventListener("submit", handleAddForm);
document.getElementById("edit-data-form").addEventListener("submit", handleEditForm);

document.getElementById("tbody").addEventListener("click", async (e) => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains("delete-data")) {
        const deleteModal = document.getElementById("delete-modal");
        deleteModal.checked = true;

        const confirmDelete = document.getElementById("confirm-delete");
        const cancelDelete = document.getElementById("cancel-delete");

        confirmDelete.addEventListener("click", async () => {
            await deleteData(id);
            deleteModal.checked = false;
            populateTable();
        }, { once: true });

        cancelDelete.addEventListener("click", () => {
            deleteModal.checked = false;
        }, { once: true });
    }

    if (e.target.classList.contains("edit-data")) {
        const editModal = document.getElementById("edit-modal");
        editModal.checked = true;
        const student = await getDocById(id);
        if (student) {
            fillEditModal(student);
        }
    }
});

// Initial population of table
document.getElementById('search').addEventListener('input', populateTable);
populateTable();