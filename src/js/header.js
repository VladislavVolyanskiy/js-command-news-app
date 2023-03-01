const btnSearch = document.querySelector(".search_mob_btn");
const formSearch = document.querySelector(".search_form");
const inputSearch = document.querySelector(".search_input");
const btn = document.querySelector(".search_btn");


btnSearch.addEventListener("click", onClick);

function onClick() {
    btnSearch.style.display = "none";
    formSearch.style.display = "block";
    inputSearch.style.display = "block";
    btn.style.display = "block";
    
}