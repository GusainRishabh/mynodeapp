const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Connect to the database
const db = new sqlite3.Database('computer');

// SQL query to select data
const sql = "SELECT * FROM customer";

// Execute the query
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }

    // Close the database connection
    db.close();

    // Convert the rows to JSON format
    const jsonData = JSON.stringify(rows, null, 4);

    // Write JSON data to a file
    fs.writeFile('profile.json', jsonData, (err) => {
        if (err) {
            throw err;
        }
        console.log('Data has been saved to data1.json');
    });
});