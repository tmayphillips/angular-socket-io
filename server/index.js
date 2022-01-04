const Express = require('express')()
const Http = require('http').createServer(Express)
const SocketIO = require('socket.io')(Http, { cors: { origins: '*' } })

const port = process.env.PORT || 1978

const rooms = []; //roomName: { users:[{socket.id: name}], messages:['user/: message 1']}
const users = [{'BrAdYTzvC0E9f9MjAAAF':'bobby'}];
SocketIO.on('connection', (socket) => {
    let currentRoom = '';
    console.log('a user connected');

    socket.on("set user", (userName) => {
        if(!users[socket.id]){
            users[socket.id] = userName;
        }
        console.log(users[socket.id])
    })

    socket.on("message", (info) => {
        console.log(`user: ${socket.id}| uName: ${users[socket.id]} | message: ${info.message} | roomName: ${info.roomName}`)
        
        SocketIO.emit('message', {user: users[socket.id], message: info.message})
    })
});

Http.listen(port, () => {
    console.log('Listening on port: ' + port)
})