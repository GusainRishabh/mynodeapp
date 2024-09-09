const fs = require('fs');

// JSON data to be saved
const jsonData = {
  name: 'John Doe',
  age: 30,
  email: 'john@example123.com'
};

// Convert JSON data to a string
const jsonString = JSON.stringify(jsonData);

// File path where you want to save the JSON data
const filePath = 'data.json';

// Write the JSON string to the file
fs.writeFile(filePath, jsonString, 'utf8', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('JSON data has been saved to', filePath);
});