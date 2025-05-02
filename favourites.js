// DOM Elements
const favouritesContainer = document.getElementById('favourites-container');
const userJokesContainer = document.getElementById('user-jokes-container');
const noFavouritesMessage = document.getElementById('no-favourites');
const noUserJokesMessage = document.getElementById('no-user-jokes');
const currentYear = document.getElementById('current-year');

// Initialize the page
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Load and display favourites and user jokes
    displayFavourites();
    displayUserJokes();
}

// Display favourite jokes
function displayFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favourites.length === 0) {
        favouritesContainer.style.display = 'none';
        noFavouritesMessage.style.display = 'block';
        return;
    }

    favouritesContainer.style.display = 'flex';
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

// Display user-added jokes
function displayUserJokes() {
    const userJokes = JSON.parse(localStorage.getItem('userJokes') || '[]');
    
    if (userJokes.length === 0) {
        userJokesContainer.style.display = 'none';
        noUserJokesMessage.style.display = 'block';
        return;
    }

    userJokesContainer.style.display = 'flex';
    noUserJokesMessage.style.display = 'none';

    userJokesContainer.innerHTML = userJokes.map(joke => `
        <div class="joke-card" data-id="${joke.id}">
            <span class="joke-category">${joke.category}</span>
            ${joke.type === 'twopart' 
                ? `<p class="setup">${joke.setup}</p>
                   <p class="delivery">${joke.delivery}</p>`
                : `<p class="joke">${joke.joke}</p>`
            }
            <button class="button button-secondary remove-user-joke" data-id="${joke.id}">
                Delete Joke
            </button>
        </div>
    `).join('');

    // Add event listeners to joke cards and remove buttons
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Favourites container click handler
    favouritesContainer.addEventListener('click', (e) => {
        const jokeCard = e.target.closest('.joke-card');
        if (!jokeCard) return;

        const removeButton = e.target.closest('.remove-favorite');
        if (removeButton) {
            const jokeId = parseInt(removeButton.dataset.id);
            removeFromFavorites(jokeId);
            return;
        }

        const jokeId = parseInt(jokeCard.dataset.id);
        const favourites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const joke = favourites.find(j => j.id === jokeId);
        
        if (joke) {
            sessionStorage.setItem('currentJoke', JSON.stringify(joke));
            window.location.href = 'single-joke.html';
        }
    });

    // User jokes container click handler
    userJokesContainer.addEventListener('click', (e) => {
        const jokeCard = e.target.closest('.joke-card');
        if (!jokeCard) return;

        const removeButton = e.target.closest('.remove-user-joke');
        if (removeButton) {
            const jokeId = parseInt(removeButton.dataset.id);
            removeUserJoke(jokeId);
            return;
        }

        const jokeId = parseInt(jokeCard.dataset.id);
        const userJokes = JSON.parse(localStorage.getItem('userJokes') || '[]');
        const joke = userJokes.find(j => j.id === jokeId);
        
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

// Remove user-added joke
function removeUserJoke(jokeId) {
    const userJokes = JSON.parse(localStorage.getItem('userJokes') || '[]');
    const updatedUserJokes = userJokes.filter(joke => joke.id !== jokeId);
    localStorage.setItem('userJokes', JSON.stringify(updatedUserJokes));
    
    // Refresh the display
    displayUserJokes();
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 