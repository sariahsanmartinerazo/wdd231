import { discoverItems } from "../data/discover.mjs";
 // Discover page
    const discoverGrid = document.querySelector("#discover-grid");
    if (discoverGrid) {
        discoverItems.forEach((item) => {
            const card = document.createElement("article");
            card.classList.add(`card-${discoverItems.indexOf(item) + 1}`);

            card.innerHTML =`
            <h2>${item.name}</h2>
            <figure>
            <img src="images/${item.image}" alt="${item.name}" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button">Learn More</button>
            `;
            discoverGrid.appendChild(card);
        });
}
// visitor message
const visitorMessage = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();
if (!lastVisit) {
    visitorMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const daysSinceVisit = Math.floor(
        (currentVisit - Number(lastVisit)) / (100 * 60 * 60 * 24)
    );
    if (daysSinceVisit < 1) {
        visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
        visitorMessage.textContent =
            `You last visited ${daySinceVisit} ${daysSinceVisit === 1 ? "day" : "days"} ago.`; 
    }
}
localStorage.setItem("lastVisit", currentVisit);