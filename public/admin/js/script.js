const buttonsStatus = document.querySelectorAll("[button-status]");
const searchInput = document.querySelector("[search-input]");
const searchButton = document.getElementById("search-button");

let url = new URL(window.location.href);

// Set active button based on URL parameter
function setActiveButtonFromParam() {
    const statusParam = url.searchParams.get("status");
    buttonsStatus.forEach(btn => {
        const s = btn.getAttribute("button-status");
        if ((statusParam === null || statusParam === "") && s === "") {
            btn.classList.add("active");
        } else if (statusParam === s) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });
}

// Event listeners for status filter buttons
if (buttonsStatus.length > 0) {
    setActiveButtonFromParam();
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            buttonsStatus.forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            window.location.href = url.href;
        });
    });
}

// Search functionality
if (searchInput) {
    // prefill input from URL
    searchInput.value = url.searchParams.get("q") || "";

    const doSearch = () => {
        const q = searchInput.value.trim();
        if (q) url.searchParams.set("q", q);
        else url.searchParams.delete("q");
        // preserve status param if present
        window.location.href = url.href;
    };

    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            doSearch();
        }
    });

    if (searchButton) {
        searchButton.addEventListener("click", doSearch);
    }
}


// Pagination
const paginationButtons = document.querySelectorAll("[button-pagination]");
paginationButtons.forEach(button => {
    button.addEventListener("click", () => {
        const page = button.getAttribute("button-pagination");
        
        if (page) {
            url.searchParams.set("page", page);
            window.location.href = url.href;
        }
    });
});

