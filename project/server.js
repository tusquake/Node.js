const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async operations
exports.fs = fs;
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
// app.use(express.json());


app.use(express.urlencoded({extended: false}));


app.use((req, res, next) => {
    fs.appendFile('log.txt', `Request URL: ${req.url}\n`, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }  }); 
    console.log('Middleware 1 Time:', Date.now());
    // next();
    req.myUserName = 'tusharseth';
    next();
});


app.use((req, res, next) => {
    console.log('Middleware 2 Time:', Date.now(), req.myUserName);
    next();
});

// Path to the users.json file
const usersFilePath = path.join(__dirname, 'users.json');

// Utility function to read users.json
const readUsers = async () => {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users file:', error);
        throw new Error('Could not read users file');
    }
};

// Utility function to write to users.json
const writeUsers = async (users) => {
    try {
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to users file:', error);
        throw new Error('Could not write to users file');
    }
};

// GET all users
app.get('/api/users', async (req, res) => {
// console.log('I am in get route',req.myUserName);
// res.setHeader('myName', 'Tushar Seth')
console.log(req.headers);
    try {
        const users = await readUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET a specific user by ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const user = users.find(u => u.id === parseInt(req.params.id));
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
