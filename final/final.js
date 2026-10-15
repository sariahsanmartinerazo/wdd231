// General functions

//Current year
const currentYear = document.querySelector("#currentyear");
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

//Last modified
const lastModified = document.querySelector("#lastmodified");
if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Menu Button navigation (small screens)
