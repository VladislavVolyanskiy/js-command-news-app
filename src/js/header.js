const btnSearch = document.querySelector(".search_mob_btn");
const formSearch = document.querySelector(".search_form");
const inputSearch = document.querySelector(".search_input");
const btn = document.querySelector(".search_btn");

// мобільне меню, для відкриття пошукової строки
btnSearch.addEventListener("click", onSearchClick);

function onSearchClick() {
    btnSearch.style.display = "none";
    formSearch.style.display = "block";
    inputSearch.style.display = "block";
    btn.style.display = "block";
    
}