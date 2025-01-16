const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello From Express');
});

app.get('/about', (req, res) => {
    const username = req.query.myname;
    return res.send(`Welcome to About ${username}`);
});

const myServer = http.createServer(app);

myServer.listen(8000, () => console.log('Server is running on port 3000'));
