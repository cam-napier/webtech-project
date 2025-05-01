// Global variables
let jokes = [];
// Using a Set to store unique categories
let categories = new Set();
let currentCategory = null;


// DOM Elements
const categoryList = document.getElementById('category-list');
const jokesContainer = document.getElementById('jokes-container');
const currentYear = document.getElementById('current-year');

// Initialize the application
function init() {
        // Use jokes data directly
        jokes = jokesData;
        
        // Extract unique categories
        jokes.forEach(joke => {
            categories.add(joke.category);
        });

        // Set current year in footer
        currentYear.textContent = new Date().getFullYear();


        // Populate categories
        populateCategories();

        // Display random jokes
        displayRandomJokes(10);

        // Add event listeners
        setupEventListeners();
}

// Populate categories in the sidebar
function populateCategories() {
    const sortedCategories = Array.from(categories).sort();
    
    categoryList.innerHTML = sortedCategories.map(category => `
        <li>
            <a href="#" data-category="${category}">${category}</a>
        </li>
    `).join('');
}

// Display random jokes
function displayRandomJokes(count, category = null) {
    let filteredJokes = category 
        ? jokes.filter(joke => joke.category === category)
        : jokes;
    
    // Shuffle array and get first n elements
    const randomJokes = [...filteredJokes]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
    
    displayJokes(randomJokes);
}

// Display jokes in the main content area
function displayJokes(jokesToDisplay) {
    jokesContainer.innerHTML = jokesToDisplay.map(joke => `
        <div class="joke-card" data-id="${joke.id}">
            <span class="joke-category">${joke.category}</span>
            ${joke.type === 'twopart' 
                ? `<p class="setup">${joke.setup}</p>
                   <p class="delivery">${joke.delivery}</p>`
                : `<p class="joke">${joke.joke}</p>`
            }
        </div>
    `).join('');
}

// Set up event listeners
function setupEventListeners() {
    // Category click handler
    categoryList.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryLink = e.target.closest('a');
        if (!categoryLink) return;

        const category = categoryLink.dataset.category;
                
        // Display jokes for selected category
        currentCategory = category;
        displayRandomJokes(10, category);
    });

    // Joke card click handler
    jokesContainer.addEventListener('click', (e) => {
        const jokeCard = e.target.closest('.joke-card');
        if (!jokeCard) return;

        const jokeId = parseInt(jokeCard.dataset.id);
        const joke = jokes.find(j => j.id === jokeId);
        
        if (joke) {
            // Store joke in sessionStorage for single joke view
            sessionStorage.setItem('currentJoke', JSON.stringify(joke));
            window.location.href = 'single-joke.html';
        }
    });
}


// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 