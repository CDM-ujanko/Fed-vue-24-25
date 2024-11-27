import http from 'http';

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log('Hit: ', req.url);
    console.log(req.headers);

    if (req.url === '/admin') {
        res.end(`
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1> Welcome to the admin page!<h1>
                </body>
                </html>
                
            `);
    } else {
        res.end(req.url);
    }

}).listen(3000);