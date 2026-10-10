
import { discoverItems } from "../data/discover.mjs";

// Discover page
const discoverGrid = document.querySelector("#discover-grid");

if (discoverGrid) {
    discoverItems.forEach((item, index) => {
        const card = document.createElement("article");

        card.classList.add(`card-${index + 1}`);

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img
                    src="images/${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button
                type="button"
                class="learn-more"
                data-index="${index}"
            >
                Learn More
            </button>
        `;

        discoverGrid.appendChild(card);
    });
}

// Visitor message
const visitorMessage = document.querySelector("#visitor-message");
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (visitorMessage) {
    if (!lastVisit) {
        visitorMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceVisit = Math.floor(
            (currentVisit - Number(lastVisit)) /
            (1000 * 60 * 60 * 24)
        );

        if (daysSinceVisit < 1) {
            visitorMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitorMessage.textContent =
                `You last visited ${daysSinceVisit} ${
                    daysSinceVisit === 1 ? "day" : "days"
                } ago.`;
        }
    }

    localStorage.setItem("lastVisit", currentVisit);
}

// Discover modal
const placeModal = document.querySelector("#place-modal");
const modalTitle = document.querySelector("#modal-title");
const modalAddress = document.querySelector("#modal-address");
const modalDescription = document.querySelector("#modal-description");
const closeModal = document.querySelector("#close-modal");

if (
    discoverGrid &&
    placeModal &&
    modalTitle &&
    modalAddress &&
    modalDescription &&
    closeModal
) {
    // Open the modal with the selected place
    discoverGrid.addEventListener("click", (event) => {
        const button = event.target.closest(".learn-more");

        if (!button) {
            return;
        }

        const index = Number(button.dataset.index);
        const item = discoverItems[index];

        if (!item) {
            return;
        }

        modalTitle.textContent = item.name;
        modalAddress.textContent = item.address;
        modalDescription.textContent = item.description;

        placeModal.showModal();
    });

    // Close the modal
    closeModal.addEventListener("click", () => {
        placeModal.close();
    });
}
// Discover modal
const placeModal = document.querySelector("#place-modal");
const modalTitle = document.querySelector("#modal-title");
const modalAddress = document.querySelector("#modal-address");
const modalDescription = document.querySelector("#modal-description");
const closeModal = document.querySelector("#close-modal");

// Open the modal with the selected place
discoverGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".learn-more");

    if (!button) return;

    const index = Number(button.dataset.index);
    const item = discoverItems[index];

    modalTitle.textContent = item.name;
    modalAddress.textContent = item.address;
    modalDescription.textContent = item.description;

    placeModal.showModal();
});

// Close the modal
closeModal.addEventListener("click", () => {
    placeModal.close();
});

