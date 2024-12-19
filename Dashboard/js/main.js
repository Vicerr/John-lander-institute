// DROPDOWN FUNCTIONALITY
const buttonsForDropdowns = document.querySelectorAll("[data-dropdown-toggle-btn]")

buttonsForDropdowns.forEach((button) => {
    let dropdownParent = button.closest(".dropdown-container")
    let dropdown = dropdownParent?.querySelector(".dropdown-box") // Use optional chaining

    if (!dropdown) return // Skip if dropdown does not exist

    button.addEventListener("click", () => {
        dropdown.classList.toggle("hide-dropdown")
    })

    // Close dropdown if clicked outside of the parent container
    document.addEventListener("click", (event) => {
        if (!button.parentElement.contains(event.target)) {
            dropdown.classList.add("hide-dropdown")
        }
    })
})

// GET ROW HEADERS AND POPULATE DROPDOWN
const table = document.getElementById("table")
const headers = Array.from(table?.querySelectorAll("thead th:not(:last-child)") || []) // Safe fallback to empty array

headers.forEach((item) => {
    let filterItemList = document.querySelector(".filter-items")

    if (!filterItemList) return // Skip if filter container does not exist

    const filterItem = `<p class="dropdown-item">${item.textContent}</p>`
    filterItemList.insertAdjacentHTML("beforeend", filterItem)
})

// GET DROPDOWN FOR TABLE ACTIONS
const tableActions = document.querySelectorAll("[data-table-action]")
tableActions.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (e.target.classList.contains("dropdown-item")) {
            element.querySelector(".button span:first-child").textContent = e.target.textContent
        }
    })
})

// CUSTOM OPTION LIST FUNCTIONALITY
const optionListContainer = document.querySelectorAll(".custom-option-list")
optionListContainer.forEach((element) => {
    element.addEventListener("click", (e) => {
        if (e.target.classList.contains("option-list-item")) {
            const optionValueInput = document.querySelector("[data-dropdown-toggle-btn]")
            if (optionValueInput) {
                optionValueInput.value = e.target.textContent
            }
        }
    })
})

// SEARCH INPUT FUNCTIONALITY
const searchInput = document.getElementById("searchInput")
const rows = table?.querySelectorAll("tbody tr") || [] // Safe fallback to empty array

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase()

        rows.forEach((row) => {
            const cells = Array.from(row.cells)
            const rowText = cells.map((cell) => cell.textContent.toLowerCase()).join(" ")

            row.style.display = rowText.includes(query) ? "" : "none"
        })
    })
}

// PAGINATION LOGIC
const paginationList = document.querySelector(".pagination-button-container")
const prevBtn = document.querySelector(".pagination-btn-prev")
const nextBtn = document.querySelector(".pagination-btn-next")

const itemsPerPage = 8 // Set total items per page
let currentPage = 1

// Check if rows exist before calculating pages
const totalPages = Math.ceil(rows.length / itemsPerPage)

function displayContent(page) {
    const start = (page - 1) * itemsPerPage
    const end = start + itemsPerPage

    rows.forEach((row) => (row.style.display = "none")) // Hide all rows initially
    for (let i = start; i < end; i++) {
        if (rows[i]) rows[i].style.display = "table-row"
    }
}

function createPagination() {
    if (!paginationList) return // Skip if pagination container doesn't exist
    paginationList.innerHTML = ""

    for (let i = 1; i <= totalPages; i++) {
        const span = document.createElement("span")
        span.classList = "pagination-item"
        span.textContent = i
        span.classList.toggle("active", i === currentPage)
        span.addEventListener("click", () => {
            currentPage = i
            updatePagination()
        })
        paginationList.appendChild(span)
    }
}

function updatePagination() {
    displayContent(currentPage)
    createPagination()

    if (prevBtn) prevBtn.disabled = currentPage === 1
    if (nextBtn) nextBtn.disabled = currentPage === totalPages
}

if (paginationList && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--
            updatePagination()
        }
    })

    nextBtn.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++
            updatePagination()
        }
    })

    // Initialize pagination
    updatePagination()
}

function submitForm() {
    const formBtn = document.getElementById("submit-form")
    // checks if form is empty
    if (formBtn) {
        formBtn.click()
    }
}
const imageFile = document.getElementById("imageInput")
const form = document.getElementById("form")
const deleteImageFile = document.querySelector("[data-delete-uploaded-item]")

const placeholderContainer = document.querySelector(".placeholder-container")
placeholderContainer?.addEventListener("click", () => {
    document.getElementById("imageInput").click()
})

let displayImageName = document.querySelector(".uploaded-files-container p")
deleteImageFile?.addEventListener("click", function (e) {
    if (imageFile.value) {
        imageFile.value = ""
    } else {
        return
    }
    displayImageName.textContent = "No file selected"
})

imageFile?.addEventListener("change", function (e) {
    const filename = this.files[0]?.name
    document.querySelector(".uploaded-files-container p").textContent = filename
})

function handleDrop(event) {
    event.preventDefault() // Prevent default behavior (open as link)

    const file = event.dataTransfer.files[0]?.name // Get the dropped file
    document.querySelector(".uploaded-files-container p").textContent = file
}

// Allow drop by preventing default behavior
function allowDrop(event) {
    event.preventDefault() // Necessary to allow the drop
}
const staffActionContainer = document.querySelector(".user-actions-container")
const btnToToggleStaffAction = document.querySelectorAll("[data-open-popover]")
btnToToggleStaffAction?.forEach((row) => {
    row.addEventListener("click", (e) => {
        staffActionContainer.classList.remove("hide-element")
    })
})

staffActionContainer?.addEventListener("click", (e) => {
    if (e.target.classList.contains("user-actions-container")) {
        staffActionContainer.classList.add("hide-element")
    }
})

const popoverContainer = document.querySelector(".popover-container")
const btnToTogglePopover = document.querySelectorAll("[data-delete-course]")
btnToTogglePopover?.forEach((button) => {
    button.addEventListener("click", (e) => {
        popoverContainer.classList.remove("hide-element")
    })
})
popoverContainer?.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("popover-container") ||
        e.target.classList.contains("close-popover") ||
        e.target.classList.contains("close-action")
    ) {
        popoverContainer.classList.add("hide-element")
    }
})

// ADD ACTIVE CLASS ON LINK
// create an array of manual comparison between pages i wan't the active class to be on
const activeLinks = {
    "/courses": ["add-course"],
    "/management": ["add-student", "view-student"],
    "/media": ["events", "upload-content"],
    "/messages": ["internship-details"],
    "/library": ["add-library"],
    "/resources": ["add-resource"],
}

const navLinks = document.querySelectorAll(".nav-link > a")

navLinks.forEach((link) => {
    const currentPage = window.location.pathname.replace(".html", "") //removes ".html"
    const linkHref = link?.getAttribute("href")?.replace(".html", "") //removes ".html"

    if (
        currentPage === linkHref || // Exact match
        activeLinks[linkHref]?.some((relatedPage) => currentPage === `/${relatedPage}`) // Match related pages
    ) {
        link.classList.add("active")
    }
    // console.log(`Checking link: ${linkHref} against current page: ${currentPage}`)
})
