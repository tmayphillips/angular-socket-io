const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
var cors = require('cors');
app.use(cors());
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:4200'],
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});