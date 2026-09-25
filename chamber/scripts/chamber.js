const memberContainer = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const themeButton = document.querySelector("#theme-toggle");

// Get member data from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        console.error("Error loading member data:", error);

        memberContainer.innerHTML = `
            <p class="error-message">
                Sorry, the member directory could not be loaded.
            </p>
        `;
    }
}

// Display members
function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        let membershipText = "";

        if (member.membership === 3) {
            membershipText = "Gold Member";
        } else if (member.membership === 2) {
            membershipText = "Silver Member";
        } else {
            membershipText = "Member";
        }

        card.innerHTML = `
            <img 
                src="images/${member.image}" 
                alt="${member.name} logo"
                loading="lazy"
                width="300"
                height="200"
            >

            <div class="member-info">
                <h2>${member.name}</h2>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    <a href="tel:${member.phone}">
                        ${member.phone}
                    </a>
                </p>

                <p>
                    <strong>Email:</strong>
                    <a href="mailto:${member.email}">
                        ${member.email}
                    </a>
                </p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipText}
                </p>

                <p>
                    <a 
                        href="${member.website}" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Visit Website
                    </a>
                </p>
            </div>
        `;

        memberContainer.appendChild(card);
    });
}

// Grid view
if (gridButton) {
    gridButton.addEventListener("click", () => {
    memberContainer.classList.add("grid-view");
    memberContainer.classList.remove("list-view");

    gridButton.classList.add("active");
    listButton.classList.remove("active");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
    });
}

// List view
if (listButton) {
    listButton.addEventListener("click", () => {
        memberContainer.classList.add("list-view");
        memberContainer.classList.remove("grid-view");

        listButton.classList.add("active");
        gridButton.classList.remove("active");

        gridButton.setAttribute("aria-pressed", "false");
        listButton.setAttribute("aria-pressed", "true");
    });
}

// Mobile navigation
menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute("aria-expanded", isOpen);
});

// Current year
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified date
document.querySelector("#lastmodified").textContent = document.lastModified;

// Load members only on the directory page
if (memberContainer) {
    getMembers();
}

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

//weather
const API_KEY = "a1b987205d22701279a2a5151569aa64";
const city = "Poza Rica,MX";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        const temperature = data.main.temp;
        const description = data.weather[0].description;

        console.log(temperature);
        console.log(description);

        document.querySelector("#temperature").textContent = `${temperature} °C`;
        document.querySelector("#description").textContent = description;
    });

fetch(forecastURL)
    .then(response => response.json())
    .then(data => {
        const forecast = data.list;

        console.log(forecast[0].dt_txt);
        console.log(forecast[0].main.temp);
        console.log(forecast[0].weather[0].description);
        console.log(forecast[8].dt_txt);
        console.log(forecast[8].main.temp);
        console.log(forecast[8].weather[0].description);
        console.log(forecast[16].dt_txt);
        console.log(forecast[16].main.temp);
        console.log(forecast[16].weather[0].description);
    });
