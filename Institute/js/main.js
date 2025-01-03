// SHOW AND HIDE SEARCH BAR ON NAVIGATION WHEN SEARCH ICON IS CLICKED
const nav = document.querySelector(".nav-items")
const toggleSearch = document.querySelectorAll(".nav-items [data-toggle-searchbar]")
toggleSearch.forEach((element) => {
    element.addEventListener("click", (e) => {
        value = element.dataset.toggleSearchbar
        if (value === "open") {
            nav.dataset.searchbarOpened = "true"
        }
        if (value === "close") {
            nav.dataset.searchbarOpened = "false"
        }
    })
})

// MAKE NAVIGATION BAR STICKY BY ADDING A CLASS "scrolled" WHEN SCROLLED PAST A CERTAIN HEIGHT
const navigaion = document.querySelector("[data-navigation]")
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-header")
    if (window.scrollY > hero.offsetHeight) {
        navigaion.classList.add("scrolled")
    } else {
        navigaion.classList.remove("scrolled")
    }
})

// TOGGLE VISIBILITY OF NAVIGATION BAR WHEN HAMBURGER ICON IS CLICKED
const dropdownToggleBtn = document.querySelectorAll("nav .dropdown")
dropdownToggleBtn.forEach((button) => {
    let parent = button.closest("li")
    parent.addEventListener("click", () => {
        if (button.getAttribute("aria-expanded") === "false") {
            button.setAttribute("aria-expanded", "true")
            console.log(button.getAttribute("aria-expanded"))
        } else {
            button.setAttribute("aria-expanded", "false")
            console.log(button.getAttribute("aria-expanded"))
        }
    })
})

// TOGGLE VISISBILITY DROPDOWN ITEMS IN NAVIGATION WHEN CLICKED
const open = document.querySelector(".open-nav")
open.addEventListener("click", () => {
    const nav = document.querySelector(".nav-items")
    nav.classList.toggle("display-none")
    open.classList.toggle("nav-opened")
})

// LOGIC TO OPEN AND CLOSE DETAILS ABOUT A COURSE IN THE COURSE-DETAILS PAGE
const course = document.querySelectorAll(".course-details [data-toggle-course-details]")
course.forEach((element) => {
    element.addEventListener("click", () => {
        toggleCourseDetails(element)
    })
})

// FUNCTION FOR COURSE-DETAILS TOGGLE PAGE
function toggleCourseDetails(targetElement) {
    const showElement = targetElement
        .closest(".course-details__box")
        .querySelector(".course-details__content")
    if (showElement.getAttribute("aria-expanded") === "false") {
        showElement.setAttribute("aria-expanded", "true")
    } else {
        showElement.setAttribute("aria-expanded", "false")
    }
}
