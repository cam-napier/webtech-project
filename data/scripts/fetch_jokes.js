const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&amount=10';
const TARGET_COUNT = 100;
const DATA_FILE = path.join('./data', 'christmas_jokes.json');

// Function to fetch jokes from API
function fetchJokes() {
    return new Promise((resolve, reject) => {
        https.get(API_URL, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    resolve(jsonData.jokes || []);
                } catch (e) {
                    reject(e);
                }
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Function to read existing jokes
function readExistingJokes() {
    try {
        const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
        const jsonData = JSON.parse(fileContent);
        return jsonData.jokes || [];
    } catch (e) {
        console.error('Error reading existing jokes:', e.message);
        return [];
    }
}

// Function to write jokes to file
function writeJokes(jokes) {
    const data = {
        category: "Programming",
        jokes: jokes
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 4));
}

// Main function to fetch and merge jokes
async function main() {
    let existingJokes = readExistingJokes();
    const seenIds = new Set(existingJokes.map(joke => joke.id));
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // Prevent infinite loops

    console.log(`Starting with ${existingJokes.length} existing jokes`);

    while (existingJokes.length < TARGET_COUNT && attempts < MAX_ATTEMPTS) {
        try {
            const newJokes = await fetchJokes();
            let addedCount = 0;

            for (const joke of newJokes) {
                if (joke.id && !seenIds.has(joke.id)) {
                    seenIds.add(joke.id);
                    existingJokes.push(joke);
                    addedCount++;
                }
            }

            console.log(`Fetched ${newJokes.length} jokes, added ${addedCount} new ones`);
            console.log(`Total unique jokes: ${existingJokes.length}`);

            // Write after each successful fetch
            writeJokes(existingJokes);

            if (existingJokes.length >= TARGET_COUNT) {
                console.log(`Reached target of ${TARGET_COUNT} unique jokes!`);
                break;
            }

            // Wait a bit before next request to be nice to the API
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.error('Error fetching jokes:', error.message);
        }
        attempts++;
    }

    if (attempts >= MAX_ATTEMPTS) {
        console.log('Reached maximum attempts. Stopping.');
    }
}

main(); 