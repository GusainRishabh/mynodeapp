const fs = require('fs');

// File path of the JSON file
const filePath = 'data1.js';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse JSON data
    const jsonData = JSON.parse(data);
    console.log('JSON data:', jsonData);
  } catch (err) {
    console.error('Error parsing JSON:', err);
  }
});