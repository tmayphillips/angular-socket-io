const Express = require('express')()
const Http = require('http').Server(Express)
const SocketIO = require('socket.io')(Http, { cors: { origins: '*' } })

const port = process.env.PORT || 3000
Http.listen(port, () => {
    console.log('Listening on port: ' + port)
})

SocketIO.on('connection', (socket) => {
    console.log('a user connected');
});
