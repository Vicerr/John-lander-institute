const buttonsForDropdowns = document.querySelectorAll("[data-dropdown-toggle-btn]")

buttonsForDropdowns.forEach((button) => {
    button.addEventListener("click", () => {
        let dropdownParent = button.closest(".dropdown-container")
        let dropdown = dropdownParent.querySelector(".dropdown-box")

        if (dropdown.classList.contains("hide-dropdown")) {
            dropdown.classList.remove("hide-dropdown")
        } else {
            dropdown.classList.add("hide-dropdown")
        }
    })
})
