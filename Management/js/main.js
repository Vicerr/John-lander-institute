// TOGGLE VISISBILITY DROPDOWN ITEMS IN NAVIGATION WHEN CLICKED
const open = document.querySelector(".open-nav")
open.addEventListener("click", () => {
    const nav = document.querySelector(".nav-items")
    nav.classList.toggle("display-none")
    open.classList.toggle("nav-opened")
})

const closeLogoutPopoverBtn = document.querySelector("[data-close-logout-popover]")
const openLogoutPopoverBtn = document.querySelector("[data-open-logout-popover]")

closeLogoutPopoverBtn.addEventListener("click", () => {
    document
        .querySelector(".popover:has([data-close-logout-popover])")
        .classList.add("hide-popover")
})
openLogoutPopoverBtn.addEventListener("click", () => {
    document
        .querySelector(".popover:has([data-close-logout-popover])")
        .classList.remove("hide-popover")
})
