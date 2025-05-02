// DOM Elements
const jokeForm = document.getElementById('joke-form');
const categorySelect = document.getElementById('category');
const typeSelect = document.getElementById('type');
const singleJokeGroup = document.getElementById('single-joke-group');
const twopartJokeGroup = document.getElementById('twopart-joke-group');
const cancelButton = document.getElementById('cancel-button');
const currentYear = document.getElementById('current-year');

// Initialize the page
function init() {
    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Load categories
    loadCategories();

    // Set up event listeners
    setupEventListeners();
}

// Load categories from jokes data
function loadCategories() {
    try {
        // Extract unique categories
        const categories = new Set(jokesData.map(joke => joke.category));
        
        // Populate category select
        categorySelect.innerHTML = `
            <option value="">Select a category</option>
            ${Array.from(categories).sort().map(category => `
                <option value="${category}">${category}</option>
            `).join('')}
        `;
    } catch (error) {
        console.error('Error loading categories:', error);
        categorySelect.innerHTML = '<option value="">Error loading categories</option>';
    }
}

// Set up event listeners
function setupEventListeners() {
    // Type select change handler
    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        singleJokeGroup.style.display = type === 'single' ? 'block' : 'none';
        twopartJokeGroup.style.display = type === 'twopart' ? 'block' : 'none';
        
        // Update required attributes
        document.getElementById('joke').required = type === 'single';
        document.getElementById('setup').required = type === 'twopart';
        document.getElementById('delivery').required = type === 'twopart';
    });

    // Form submit handler
    jokeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(jokeForm);
        const joke = {
            category: formData.get('category'),
            type: formData.get('type'),
            id: Date.now(), // Generate a unique ID
            safe: true,
            lang: 'en'
        };

        if (joke.type === 'single') {
            joke.joke = formData.get('joke');
        } else {
            joke.setup = formData.get('setup');
            joke.delivery = formData.get('delivery');
        }

        try {
            // In a real application, you would send this to a server
            // For now, we'll store it in localStorage
            const jokes = JSON.parse(localStorage.getItem('userJokes') || '[]');
            jokes.push(joke);
            localStorage.setItem('userJokes', JSON.stringify(jokes));

            // Show success message
            alert('Joke added successfully!');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error saving joke:', error);
            alert('Error saving joke. Please try again.');
        }
    });

    // Cancel button click handler
    cancelButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
}

// Initialize the page when the DOM is loaded
document.addEventListener('DOMContentLoaded', init); 