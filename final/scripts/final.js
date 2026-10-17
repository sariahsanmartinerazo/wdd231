// Current year
const currentYear = document.querySelector("#currentyear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Last modified
const lastModified = document.querySelector("#lastmodified");

if (lastModified) {
    lastModified.textContent = document.lastModified;
}

// Mobile navigation
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");

        const isOpen = navigation.classList.contains("open");
        menuButton.setAttribute("aria-expanded", isOpen);
    });
}

 // Dark mode with localStorage
const themeButton = document.querySelector("#dark-mode");

// 1. Read the saved preference
const savedTheme = localStorage.getItem("theme");

// 2. Apply the saved theme when the page loads
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// 3. Update the button to match the current theme
function updateThemeButton() {
    if (!themeButton) return;

    const darkModeEnabled =
        document.body.classList.contains("dark-mode");

    themeButton.setAttribute("aria-pressed", darkModeEnabled);
    themeButton.textContent = darkModeEnabled ? "☀" : "◐";
    themeButton.setAttribute(
        "aria-label",
        darkModeEnabled
            ? "Switch to light mode"
            : "Switch to dark mode"
    );
}

updateThemeButton();

// 4. Save the new preference when the user clicks
if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const darkModeEnabled =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "theme",
            darkModeEnabled ? "dark" : "light"
        );

        updateThemeButton();
    });
}

// Load programs from JSON
async function loadPrograms() {
    const programList = document.querySelector("#program-list");
    if (!programList) return;

    const file = window.location.pathname.endsWith("abroad.html")
        ? "data/abroad.json"
        : "data/mexico.json";
    
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Could not load ${file}: ${response.status}`);
        }

        const programs = await response.json();
        programList.innerHTML = "";

        programs.forEach((program) => {
            const card = document.createElement("article");
            card.classList.add("program-card");

            // University name
            const title = document.createElement("h2");
            title.textContent = program.university;
            card.appendChild(title);

            // University image
            if (program.image) {
                const image = document.createElement("img");
                image.src = `images/${program.image}`;
                image.alt = `image of ${program.university}`;
                image.loading = "lazy";
                image.width = 300;
                image.height = 200;
                card.appendChild(image);
            } 

            // Academic focus
            addSection(card, "Academic Focus", program.focus);

            //Estimated cost
            addSection(card, "Estimated Cost", program.cost);

            //University website 
            if (program.link) {
                const link = document.createElement("a");
                link.href = program.link;
                link.textContent = "Visit university Website";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                card.appendChild(link);
            }
            programList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading programs:", error);
        programList.textContent =
            "Programs could not be loaded. Please try again later.";
    }
}

//create a text section
function addSection(card, headingText, content) {
    if (!content) return;

    const heading = document.createElement("h3");
    heading.textContent = headingText;

    const paragraph = document.createElement("p");
    paragraph.textContent = content;

    card.append(heading, paragraph);
}

//Create a List section
function addList(card, headingText, items) {
    if (!Array.isArray(items) || items.length === 0) return;

    const heading = document.createElement("h3");
    heading.textContent = headingText;

    const list = document.createElement("ul");

    items.forEach((itemText) => {
        const item = document.createElement("li");
        item.textContent = itemText;
        list.appendChild(item);
    });
    card.append(heading, list);
}

loadPrograms();

// Display submitted form information
const submissionDetails = document.querySelector("#submission-details");

if (submissionDetails) {
    const params = new URLSearchParams(window.location.search);

    const heading = document.createElement("h2");
    heading.textContent = "Your submitted information";
    submissionDetails.appendChild(heading);

    const fields = [
        ["Name", "name"],
        ["Email", "email"],
        ["Interest", "interest"],
        ["Message", "message"]
    ];

    fields.forEach(([label, key]) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${params.get(key) || "Not provided"}`;
        submissionDetails.appendChild(paragraph);
    });
}