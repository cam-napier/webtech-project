const fs = require('fs');
const path = require('path');

// Directory containing the JSON files
const dataDir = './data';

// Read all JSON files in the data directory
const files = fs.readdirSync(dataDir)
    .filter(file => file.endsWith('.json') && file !== 'dev_jokes.json');

// Array to store all jokes
let allJokes = [];

// Read each file and extract jokes
files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);
    
    if (jsonData.jokes && Array.isArray(jsonData.jokes)) {
        allJokes = allJokes.concat(jsonData.jokes);
    }
});

// Remove duplicates based on id
const uniqueJokes = [];
const seenIds = new Set();
let duplicatesRemoved = 0;

allJokes.forEach(joke => {
    if (joke.id && !seenIds.has(joke.id)) {
        seenIds.add(joke.id);
        uniqueJokes.push(joke);
    } else {
        duplicatesRemoved++;
    }
});

// Create the final object
const finalData = {
    category: "Programming",
    jokes: uniqueJokes
};

// Write to dev_jokes.json
fs.writeFileSync(
    path.join(dataDir, 'dev_jokes.json'),
    JSON.stringify(finalData, null, 4)
);

console.log(`Successfully merged ${uniqueJokes.length} unique jokes into dev_jokes.json`);
console.log(`Removed ${duplicatesRemoved} duplicate jokes`); 