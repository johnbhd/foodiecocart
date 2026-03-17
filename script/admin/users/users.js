import { getUser, getUserCount } from "../../modules/api/getData.js"
import { getFirestore, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { firebaseConfig } from "../../config/firebase-config.js";
import { toastSuccess, toastError } from "../../modules/utils/utils.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loader = document.getElementById("loader");
const userSearch = document.getElementById('txtsearch');
let allUsers = [];

async function initUsers() {
    await userManagement()
    loader.style.display = "none";
}
function viewModal(user) {
  const viewModal = document.getElementById("popup-details");
  viewModal.style.display = "flex";
viewModal.innerHTML = `
  <div class="popup-field">
    <div>
        <h4>Edit User Details</h4>
    </div>

    <div class="details-content">
        <p><strong>Name:</strong> <input type="text" id="edit-name" value="${user.name}"></p>
        <p><strong>Student ID / User ID:</strong> <input type="text" id="edit-studentId" value="${user.studentId || ""}"></p>
        <p><strong>Email Address:</strong> <input type="email" id="edit-email" value="${user.email}"></p>
        
        <p><strong>Role:</strong> 
          <input type="text" id="edit-role" value="${user.role || ""}">
        </p>

        <p><strong>Course / Department:</strong> <input type="text" id="edit-department" value="${user.department || ""}"></p>
        <p><strong>Year Level:</strong> <input type="text" id="edit-yearLevel" value="${user.yearLevel || ""}"></p>

        <div class="btnModal">
            <button type="button" id="saveBtn">Save</button>
            <button type="button" id="closeBtn">Close</button>
        </div>
    </div>
  </div>
`;

  // Save button click
  document.getElementById("saveBtn").addEventListener("click", async () => {
    const updatedUser = {
    name: document.getElementById("edit-name").value.trim(),
    studentId: document.getElementById("edit-studentId").value.trim(),
    email: document.getElementById("edit-email").value.trim(),
    role: document.getElementById("edit-role").value.trim(),     
    department: document.getElementById("edit-department").value.trim(),
    yearLevel: document.getElementById("edit-yearLevel").value.trim()
  };
    try {
      // Update user in Firestore
      const userRef = doc(db, "users", user.id); // "users" = your collection, user.id = doc ID
      await updateDoc(userRef, updatedUser);

      console.log("User updated:", updatedUser);

      // Close modal
      viewModal.style.display = "none";

      // Refresh table
      await userManagement();

    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user. Check console for details.");
    }
  });
}

function dateUser(sec, nano) {
    const seconds = sec ?? 0;
    const nanoseconds = nano ?? 0;

    const milliseconds = seconds * 1000 + nanoseconds / 1_000_000;
    const date = new Date(milliseconds);

    const options = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,  
    };

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate

}

function searchUsers() {
    const val = userSearch.value.toLowerCase().trim();

    const filteredUser = allUsers.filter(user => 
        user.name.toLowerCase().includes(val) ||
        user.email.toLowerCase().includes(val) ||
        user.role.toLowerCase().includes(val)
    );
    
    renderUser(filteredUser, filteredUser.length)
}

function renderUser(users, userCount) {
    const tableUser = document.getElementById('table-user');
    const userRow = users.length ? users.map((user, index) => {
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${dateUser(user.createdAt?.seconds, user.createdAt?.nanoseconds)}</td>
                <td class="actions">
                   <button type="button" class="view">Update</button>
                    <button type="button" class="delete">Delete</button>
                </td>
            </tr>     
        `;
    }).join("") : `
        <tr class="countTotal">
            <td colspan="6">No User Found.</td>
        </tr>`;

    tableUser.innerHTML = `
        <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined At</th>
            <th>Actions</th>
        </tr>
        ${userRow}
        <tr class="countTotal">
            <td>Total Users</td>
            <td colspan="4"></td>
            <td>${userCount}</td>
        </tr>
    `;
}

async function userManagement() {
    const userCount = await getUserCount();
    allUsers = await getUser();

    renderUser(allUsers, userCount)
   
}

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("view")) {
    const index = Array.from(document.querySelectorAll(".view")).indexOf(e.target);
    const user = allUsers[index]; // get the corresponding user
    viewModal(user);
  }

  if (e.target.id === "closeBtn") {
    document.getElementById("popup-details").style.display = "none";
  }
});

userSearch.addEventListener('input', searchUsers); 
document.addEventListener('DOMContentLoaded', () => {
    initUsers()
});

