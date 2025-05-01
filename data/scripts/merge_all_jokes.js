const fs = require('fs');
const path = require('path');

const DATA_DIR = './data';
const OUTPUT_FILE = 'jokes.json';

// Function to read and parse a JSON file
function readJsonFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return null;
    }
}

// Main function to merge all jokes
function mergeAllJokes() {
    // Get all files in the data directory
    const files = fs.readdirSync(DATA_DIR);
    const allJokes = [];
    const seenIds = new Set();

    // Process each file
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(DATA_DIR, file);
            const data = readJsonFile(filePath);
            
            if (data && data.jokes && Array.isArray(data.jokes)) {
                // Add each joke if it's not a duplicate
                data.jokes.forEach(joke => {
                    if (joke.id && !seenIds.has(joke.id)) {
                        seenIds.add(joke.id);
                        allJokes.push(joke);
                    }
                });
            }
        }
    });

    // Write the merged jokes to the output file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allJokes, null, 4));
    console.log(`Successfully merged ${allJokes.length} unique jokes into ${OUTPUT_FILE}`);
}

// Run the merge function
mergeAllJokes(); 