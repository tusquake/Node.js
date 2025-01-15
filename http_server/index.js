const http = require('http');
const fs = require('fs');

const myServer = http.createServer((req, res) => {
    console.log('Request Received');
    console.log(req.headers);
    const log = `\n${Date.now()} ${req.url}\n`;
    fs.appendFile('logg.txt', log, (err) => {
        switch(req.url){
            case '/':
                res.end('Hello From Server');
                break;
            case '/about':
                res.end('Welcome to About Page');
                break;
            case '/contact':
                res.end('Welcome to Contact Page');
                break;
            default :
            res.end('404 Page Not Found');
        }
    });
});

myServer.listen(3000, () => console.log('Server is running on port 3000'));  