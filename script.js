// Global variables
let jokes = [];
// Using a Set to store unique categories
let categories = new Set();

// DOM Elements
const categoryList = document.getElementById('category-list');
const jokesContainer = document.getElementById('jokes-container');

// Initialize the application
function init() {
        // Use jokes data directly
        jokes = jokesData;
        
        // Extract unique categories
        jokes.forEach(joke => {
            categories.add(joke.category);
        });

        // Populate categories
        populateCategories();

        // Display random jokes
        displayRandomJokes(10);
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


// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 