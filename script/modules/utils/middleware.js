import { toastSuccess, toastError } from "./utils.js";


export function protectRoute() {
  const raw = sessionStorage.getItem("session");
  const currentUser = raw ? JSON.parse(raw) : null;
  const path = window.location.pathname;

  if (!currentUser) {
    toastError("You must log in first!");
    setTimeout(() => {
      window.location.href = "/index.html";
      
    }, 1000)
    return;
  }

  const role = currentUser.role;

  if (path.includes("/admin") && role !== "admin") {
    toastError("Access denied! Admins only.");
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1000)
    return;
  }

}

protectRoute()