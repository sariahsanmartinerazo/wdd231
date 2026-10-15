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

// Menu navigation (small screens) and button 
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    const isOpen = navigation.classList.contains("open");
    menuButton.setAttribute("aria-expanded, isOpen");
});