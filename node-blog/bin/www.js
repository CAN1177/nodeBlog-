const http = require('http');
const PORT = 8000

const serverHeader = require('../app')

const server = http.createServer(serverHeader)

server.listen(PORT)