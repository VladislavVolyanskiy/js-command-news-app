// let currentPage = window.location.pathname;

let currentPage = document.body.getAttribute('id')

if (currentPage === "index") {
  document.querySelector('[href="./index.html"]').classList.add('nav_link--current');  
} else if (currentPage === "favorites") {
  document.querySelector('[href="./favorites.html"]').classList.add('nav_link--current');  
} else if (currentPage === "read") {
  document.querySelector('[href="./read.html"]').classList.add('nav_link--current');  
}