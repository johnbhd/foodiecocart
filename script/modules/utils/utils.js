export function showToast(message) {
  const toast = document.getElementById("toast");
  const box = document.getElementById("toast-box");
  const text = document.getElementById("toast-message");

  text.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    box.classList.add("show");
  }, 10);

  setTimeout(() => {
    box.classList.remove("show");
  }, 1800);

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

export function createToast(message, type="success") {

  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `toastValidation ${type}`;

  const icon = type === "success"
    ? `<i class="fa-solid fa-check"></i>`
    : `<i class="fa-solid fa-xmark"></i>`;

  toast.innerHTML = `
    ${icon}
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(()=>{
    toast.style.animation = "toastOut .35s forwards";
  },2500);

  setTimeout(()=>{
    toast.remove();
  },2900);
}

/* shortcuts */
export function toastSuccess(msg){
  createToast(msg,"success");
}

export function toastError(msg){
  createToast(msg,"error");
}