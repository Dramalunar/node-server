const http = require('http');
const { tasks } = require('./app');

const server = http.createServer((req,res) => {
    if (req.url === '/tasks' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify(tasks));
    } else {
        res.statusCode = 404;
        res.end();
    }
});

const port = 3001;

server.listen(port,() => {
    console.log(`Servidor iniciado en http://localhost:${port}`)
})