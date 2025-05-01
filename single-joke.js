// DOM Elements
const jokeCategory = document.getElementById('joke-category');
const jokeContent = document.getElementById('joke-content');
const backButton = document.getElementById('back-button');
const favoriteButton = document.getElementById('favorite-button');
const currentYear = document.getElementById('current-year');

// Initialize the page
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Get joke from sessionStorage
    const jokeJson = sessionStorage.getItem('currentJoke');
    if (!jokeJson) {
        window.location.href = 'index.html';
        return;
    }

    const joke = JSON.parse(jokeJson);
    displayJoke(joke);

    // Set up event listeners
    setupEventListeners();
}

// Display the joke
function displayJoke(joke) {
    jokeCategory.textContent = joke.category;
    
    if (joke.type === 'twopart') {
        jokeContent.innerHTML = `
            <p class="setup">${joke.setup}</p>
            <p class="delivery">${joke.delivery}</p>
        `;
    } else {
        jokeContent.innerHTML = `<p class="joke">${joke.joke}</p>`;
    }

    // Check if joke is already in favorites
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.some(fav => fav.id === joke.id);
    favoriteButton.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
}

// Set up event listeners
function setupEventListeners() {
    // Back button click handler
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Favorite button click handler
    favoriteButton.addEventListener('click', () => {
        const jokeJson = sessionStorage.getItem('currentJoke');
        const joke = JSON.parse(jokeJson);
        
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const index = favorites.findIndex(fav => fav.id === joke.id);
        
        if (index === -1) {
            // Add to favorites
            favorites.push(joke);
            favoriteButton.textContent = 'Remove from Favorites';
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            favoriteButton.textContent = 'Add to Favorites';
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 