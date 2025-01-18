const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async operations
const path = require('path');

const app = express();
const PORT = 8000;

// Middleware to parse JSON request bodies
app.use(express.json());

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

// POST a new user
app.post('/api/users', async (req, res) => {
    try {
        const users = await readUsers();
        const newUser = req.body;

        // Ensure the new user has a unique ID
        if (users.some(u => u.id === newUser.id)) {
            return res.status(400).json({ error: 'User with this ID already exists' });
        }

        users.push(newUser);
        await writeUsers(users);
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT to update an existing user
app.put('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Replace the entire user object
        users[userIndex] = { id, ...req.body };
        await writeUsers(users);
        res.json({ message: 'User updated successfully', user: users[userIndex] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PATCH to update specific fields of a user
app.patch('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = parseInt(req.params.id);
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update specific fields
        Object.assign(user, req.body);
        await writeUsers(users);
        res.json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE a user by ID
app.delete('/api/users/:id', async (req, res) => {
    try {
        const users = await readUsers();
        const id = parseInt(req.params.id);
        const userIndex = users.findIndex(u => u.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }

        users.splice(userIndex, 1);
        await writeUsers(users);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
