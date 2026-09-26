const memberContainer = document.querySelector("#member-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const themeButton = document.querySelector("#theme-toggle");
const spotlightContainer = document.querySelector("#spotlight-container");

// Get member data from JSON
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (memberContainer) {
            displayMembers(data.members);
        }

        if (spotlightContainer) {
            const qualifiedMembers = data.members.filter(
                member => member.membership >= 2
            );
            const selectedMembers = qualifiedMembers
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
       
        selectedMembers.forEach((member) => {
            spotlightContainer.innerHTML += `
            <article class = "spotlight-card">
            <img src="images/${member.image}" alt="${member.name} logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><strong>Membership:</strong>
            ${member.membership === 3? "Gold Member" : "Silver Member"}
             </p>

            <a href="${member.website}" target="_blank" rel="noopener noreferrer">
            Visit Website </a>
            </article>
            `;
        });
        }

    } catch (error) {
        console.error("Error loading member data:", error);

        if (memberContainer) {
           memberContainer.innerHTML = `
            <p class="error-message">
                Sorry, the member directory could not be loaded.
            </p>
        `; 
        }     
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
                <strong>Membership:</strong>
                ${member.membership}
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
if (memberContainer || spotlightContainer) {
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
const temperatureElement = document.querySelector("#temperature");
const descriptionElement = document.querySelector("#description");

if (temperatureElement && descriptionElement) {

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
}
//forecast 
const forecastContainer = document.querySelector("#forecast-container");
if (forecastContainer) {
    fetch(forecastURL)
    .then(response => response.json())
    .then(data => {

        const forecast = data.list;
        const selectedForecasts = [
            forecast[0],
            forecast[8],
            forecast[16]
        ];

        forecastContainer.innerHTML = "";

        selectedForecasts.forEach((day) => {

            forecastContainer.innerHTML += `
                <article>
                    <h4>${day.dt_txt}</h4>
                    <p>${day.main.temp} °C</p>
                    <p>${day.weather[0].description}</p>
                </article>
            `;
        });
    });
}
/* =========================
   WEATHER
========================= */

.weather {
    background-color: var(--light-color);
    padding: 1.5rem;
    margin-top: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.weather h2 {
    text-align: center;
    margin-top: 0;
    color: var(--dark-color);
}

#current-weather {
    background-color: var(--white);
    padding: 1rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    text-align: center;
}

#current-weather h3 {
    margin-top: 0;
    color: var(--dark-color);
}

#temperature {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0.5rem 0;
    color: var(--dark-color);
}

#description {
    margin: 0;
    text-transform: capitalize;
}

#forecast h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: var(--dark-color);
}

#forecast-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

#forecast-container article {
    background-color: var(--white);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    border-top: 3px solid var(--secondary-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

#forecast-container h4 {
    margin-top: 0;
    color: var(--dark-color);
}

#forecast-container p {
    margin: 0.4rem 0;
}



       


