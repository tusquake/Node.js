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

const myServer = http.createServer((req, res) => {
    console.log('Request Received');
    console.log(req.headers);
    const log = `\n${Date.now()} ${req.url}\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('logg.txt', log, (err) => {
        if (err) throw err;
        
        switch(myUrl.pathname) {
            case '/':
                res.end('Hello From Server');
                break;
            case '/about':
                const username = myUrl.query.myname;
                res.end(`Welcome to About Page ${username}`);
                break;
            case '/contact':
                res.end('Welcome to Contact Page');
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end(`You are searching for ${search}`);
                break;
            case '/signup':
                if(req.method==="GET") {
                    res.end('Welcome to Signup Page');
                }
                else if(req.method==="POST") { 
                    res.end('Successfully Signed Up');
                }
            default:
                res.end('404 Page Not Found');
        }
    });
});

myServer.listen(3000, () => console.log('Server is running on port 3000'));
