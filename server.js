const http = require('http');

const tasks = [
    {id:1,description: 'hacer las compras', completed: false},
    {id:2,description: 'limpiar la casa', completed: false},
    {id:3,description: 'hacer ejercicio', completed: false}
]

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