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
