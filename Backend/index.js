const express = require('express')
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

//definign the express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Function to check if database exists and create it if necessary
function createDatabaseIfNotExists() {
    db.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME, (err, result) => {
        if (err) {
            console.error('Error creating database:', err);
            return;
        }
        console.log('Database checked/created');
        useDatabase();  
    });
}

// Function to use the database
function useDatabase() {
    db.query('USE ' + process.env.DB_NAME, (err, result) => {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }
        console.log('Using database:', process.env.DB_NAME);
        createTableIfNotExists();  // Create the table if it doesn't exist
    });
}

// Function to create the table if it doesn't exist
function createTableIfNotExists() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Registration (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            phone VARCHAR(10) NOT NULL,
            dob DATE NOT NULL
        )
    `;
    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table checked/created');
    });
}

// Run the database and table creation logic when server starts
createDatabaseIfNotExists();


// Add new user
app.post('/register', (req, res) => {
    const { name, email, phone, dob } = req.body;
    const query = 'INSERT INTO Registration (name, email, phone, dob) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, phone, dob], (err, result) => {
        if (err) throw err;
        res.send('User registered successfully!');
    });
});

// Update user
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, dob } = req.body;
    const query = 'UPDATE Registration SET name = ?, email = ?, phone = ?, dob = ? WHERE id = ?';
    db.query(query, [name, email, phone, dob, id], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully!');
    });
});

// Delete user
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Registration WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully!');
    });
});

// Get all users
app.get('/users', (req, res) => {
    const query = 'SELECT * FROM Registration';
    db.query(query, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})