// DOM Elements
const jokeCategory = document.getElementById('joke-category');
const jokeContent = document.getElementById('joke-content');
const backButton = document.getElementById('back-button');
const favoriteButton = document.getElementById('favorite-button');
const currentYear = document.getElementById('current-year');

// Audio context for sound effects
let audioContext;
let gainNode;

// Initialize audio context
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.3; // Set volume to 30%
    gainNode.connect(audioContext.destination);
}

// Play a pleasant "add" sound
function playAddToFavoritesSound() {
    if (!audioContext) {
        initAudio();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    // Configure the sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4 note
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1); // A5 note

    // Configure the envelope
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    // Connect and play
    oscillator.connect(gain);
    gain.connect(gainNode);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Play a pleasant "remove" sound
function playRemoveFromFavoritesSound() {
    if (!audioContext) {
        initAudio();
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    // Configure the sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5 note
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1); // A4 note

    // Configure the envelope
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    // Connect and play
    oscillator.connect(gain);
    gain.connect(gainNode);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
}

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
            playAddToFavoritesSound(); // Play sound when adding to favorites
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            favoriteButton.textContent = 'Add to Favorites';
            playRemoveFromFavoritesSound(); // Play sound when removing from favorites
        }
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 