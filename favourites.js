// DOM Elements
const favouritesContainer = document.getElementById('favourites-container');
const noFavouritesMessage = document.getElementById('no-favourites');
const currentYear = document.getElementById('current-year');

// Initialize the page
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Load and display favourites
    displayFavourites();
}

// Display favourite jokes
function displayFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favourites.length === 0) {
        favouritesContainer.style.display = 'none';
        noFavouritesMessage.style.display = 'block';
        return;
    }

    favouritesContainer.style.display = 'grid';
    noFavouritesMessage.style.display = 'none';

    favouritesContainer.innerHTML = favourites.map(joke => `
        <div class="joke-card" data-id="${joke.id}">
            <span class="joke-category">${joke.category}</span>
            ${joke.type === 'twopart' 
                ? `<p class="setup">${joke.setup}</p>
                   <p class="delivery">${joke.delivery}</p>`
                : `<p class="joke">${joke.joke}</p>`
            }
            <button class="button button-secondary remove-favorite" data-id="${joke.id}">
                Remove from Favorites
            </button>
        </div>
    `).join('');

    // Add event listeners to joke cards and remove buttons
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Joke card click handler
    favouritesContainer.addEventListener('click', (e) => {
        const jokeCard = e.target.closest('.joke-card');
        if (!jokeCard) return;

        const removeButton = e.target.closest('.remove-favorite');
        if (removeButton) {
            // Handle remove from favorites
            const jokeId = parseInt(removeButton.dataset.id);
            removeFromFavorites(jokeId);
            return;
        }

        // Handle viewing joke
        const jokeId = parseInt(jokeCard.dataset.id);
        const favourites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const joke = favourites.find(j => j.id === jokeId);
        
        if (joke) {
            sessionStorage.setItem('currentJoke', JSON.stringify(joke));
            window.location.href = 'single-joke.html';
        }
    });
}

// Remove joke from favorites
function removeFromFavorites(jokeId) {
    const favourites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const updatedFavourites = favourites.filter(joke => joke.id !== jokeId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavourites));
    
    // Refresh the display
    displayFavourites();
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 