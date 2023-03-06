//=== Подчеркивание активной ссылки на страницу

let currentPage = document.querySelector('body').getAttribute('data-current-page'); 
// console.log(currentPage)
if (currentPage === "index") {
  document.querySelector('.nav_link[href="./index.html"]').classList.add('nav_link--current');  
} else if (currentPage === "favorite") {
  document.querySelector('.nav_link[href="./favorite.html"]').classList.add('nav_link--current');  
} else if (currentPage === "read") {
  document.querySelector('.nav_link[href="./read.html"]').classList.add('nav_link--current');  
}
