const express = require('express'); // Import Express
const users = require('./users.json'); // Import the JSON file

const app = express(); // Create an Express app
const PORT = 8000; // Set the port number

// Route to serve JSON data
app.get('/api/users', (req, res) => {
    return res.json(users); // Send the users JSON data as a response
});

app.route('/api/users/:id')
    .get((req, res) => {
        const id = parseInt(req.params.id); // Get the id from URL
        const user = users.find(user => user.id === id); // Find the user
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); // User not found
        }
        return res.json(user); // Return user
    })
    .put((req, res) => {
        const id = parseInt(req.params.id); // Get the id from URL
        const user = users.find(user => user.id === id); // Find the user
        if (!user) {
            return res.status(404).json({ error: 'User not found' }); // User not found
        }
        Object.assign(user, req.body); // Update user properties
        return res.json(user); // Return updated user
    })
    .delete((req, res) => {
        const id = parseInt(req.params.id); // Get the id from URL
        const userIndex = users.findIndex(user => user.id === id); // Find the user index
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' }); // User not found
        }
        users.splice(userIndex, 1); // Remove the user
        return res.json({ message: 'User deleted successfully' }); // Confirmation
    });

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id; // Get the id parameter from the URL
    const user = users.find(user => user.id === parseInt(id)); // Find the user with the given id
    if (!user) {
        return res.status(404).json({ error: 'User not found' }); // Return an error response
    }
    return res.json(user); // Send the user JSON data as a response
});


app.post('/api/users', (req, res) => {
    // TODO create new user
    return res.json({ message: 'Create new user' });
});


app.patch('/api/users', (req, res) => {
    // TODO Edit the user with id
    return res.json({ message: 'Create new user' });
});

app.delete('/api/users', (req, res) => {

    // TODO Delete the user with id
    return res.json({ message: 'Delete the user' });
});

// Route to serve an HTML page with user data
app.get('/users', (req, res) => {
    // Create an HTML string to display user data
    const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Users</title>
        </head>
        <body>
            <h1>User List</h1>
            <ul>
                ${users.map(user => `<li>${user.first_name} - ${user.email}</li>`).join('')}
            </ul>
        </body>
        </html>
    `;
    res.send(html); // Send the HTML as a response
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
