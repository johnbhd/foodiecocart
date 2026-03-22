const menuBtn = document.getElementById('menu-btn');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const year = document.getElementById("year");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
year.textContent = currentYear;

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  overlay.classList.toggle('show')
});
overlay.addEventListener('click', () => {
  navLinks.classList.remove('show');
  overlay.classList.remove('show');
})