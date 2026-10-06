import { discoverItems } from "../data/discover.mjs";
 // Discover page
    const discoverGrid = document.querySelector("#discover-grid");
    if (discoverGrid) {
        discoverItems.forEach((Item) => {
            const card = document.createElement("article");

            card.innerHTML =`
            <h2>${Item.name}</h2>
            <figure>
            <img src="images/${Item.image}" alt="${Item.name}" loading="lazy">
            </figure>
            <address>${Item.address}</address>
            <p>${Item.description}</p>
            <button type="button">Learn More</button>
            `;
            discoverGrid.appendChild(card);
        });
    }