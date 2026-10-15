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

// Dark mode
const themeButton = document.querySelector("#dark-mode");

if (themeButton) {
    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        const darkModeEnabled = document.body.classList.contains("dark-mode");

        themeButton.setAttribute("aria-pressed", darkModeEnabled);
        themeButton.textContent = darkModeEnabled ? "☀" : "◐";
        themeButton.setAttribute(
            "aria-label",
            darkModeEnabled ? "Switch to light mode" : "Switch to dark mode"
        );
    });
}

// Load programs from JSON
async function loadPrograms() {
    const programList = document.querySelector("#program-list");

    if (!programList) {
        return;
    }

    let file = "data/mexico.json";

    if (window.location.pathname.endsWith("abroad.html")) {
        file = "data/abroad.json";
    }

    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Could not load programs");
        }

        const programs = await response.json();

        programList.innerHTML = "";

        programs.forEach((program) => {
            const card = document.createElement("article");
            card.classList.add("program-card");

            const name = document.createElement("h3");
            name.textContent = program.name || program.university || "University";

            const country = document.createElement("p");
            country.textContent = `Country: ${program.country || "Not specified"}`;

            const degree = document.createElement("p");
            degree.textContent = `Program: ${program.program || program.degree || "Not specified"}`;

            const description = document.createElement("p");
            description.textContent = program.description || "More information about this program is available from the university.";

            card.append(name, country, degree, description);

            if (program.url) {
                const link = document.createElement("a");
                link.href = program.url;
                link.textContent = "Visit university website";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                card.appendChild(link);
            }

            programList.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading programs:", error);
        programList.textContent = "Programs could not be loaded. Please try again later.";
    }
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