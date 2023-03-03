// Ниже три кнопки(ссылки)
const oneLi = document.querySelector(".one") // Home
const twoLi = document.querySelector(".two") // Favorite
const treeLi = document.querySelector(".tree") // Read
// Тут мы добавляем бордер этому svg
const svgItem = document.querySelector(".svg-item")
//По нажатию на closeModal модалка (backdrop) закрывается 
const closeModal = document.querySelector(".close")
const backdrop = document.querySelector(".backdrop")




// Ссылка Home
oneLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === oneLi) { // Проверка на что нажал пользователь
        // Код ниже заменяет классы добавляя где нужно и где не нужно удаляет
        oneLi.classList.add("bg-color-active")
        twoLi.classList.remove("bg-color-active")
        treeLi.classList.remove("bg-color-active")
    }
})
// Ссылка Favorite
twoLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === twoLi) { // Проверка на что нажал пользователь
        // Код ниже заменяет классы добавляя где нужно и где не нужно удаляет
        oneLi.classList.remove("bg-color-active")
        twoLi.classList.add("bg-color-active")
        treeLi.classList.remove("bg-color-active")
    }

})
// Ссылка Read
treeLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === treeLi) { // Проверка на что нажал пользователь
        // Код ниже заменяет классы добавляя где нужно и где не нужно удаляет
        oneLi.classList.remove("bg-color-active")
        twoLi.classList.remove("bg-color-active")
        treeLi.classList.add("bg-color-active")
    }

})
//--------------Closed modal----------------
// Тут думаю понятно, просто закрывает модалку
closeModal.addEventListener("click", e => {
    backdrop.classList.add("is-hidden")
})

