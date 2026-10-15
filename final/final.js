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
    menuButton.setAttribute("aria-expanded", "isOpen");
});

// Dark mode 
themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const darkModeEnabled = document.body.classList.contains("dark-mode");
    themeButton.setAttribute("aria-pressed", darkModeEnabled);
    if (darkModeEnabled) {
        themeButton.textContent = "☀";
        themeButton.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeButton.textContent = "◐";
        themeButton.setAttribute("aria-label", "Switch to dark mode");
    }
});

// Get member data from JSON
const response = await fetch("data/mexico.json")
if (!response.ok) {
    throw new Error("Could not load Mexican programs");
}
const programs = await response.json();