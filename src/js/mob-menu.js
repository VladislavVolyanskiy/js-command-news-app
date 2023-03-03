const oneLi = document.querySelector(".one")
const twoLi = document.querySelector(".two")
const treeLi = document.querySelector(".tree")
const svgItem = document.querySelector(".svg-item")

// Ссылка Home
oneLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === oneLi) {
        console.log('one')
        oneLi.classList.add("bg-color-active")
        twoLi.classList.remove("bg-color-active")
        treeLi.classList.remove("bg-color-active")
    }
})
// Ссылка Favorite
twoLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === twoLi) {
        console.log("two")
        oneLi.classList.remove("bg-color-active")
        twoLi.classList.add("bg-color-active")
        treeLi.classList.remove("bg-color-active")
    }

})
// Ссылка Read
treeLi.addEventListener("click", e => {
    e.preventDefault()
    if (e.currentTarget === treeLi) {
        console.log("tree")
        oneLi.classList.remove("bg-color-active")
        twoLi.classList.remove("bg-color-active")
        treeLi.classList.add("bg-color-active")
    }

})
