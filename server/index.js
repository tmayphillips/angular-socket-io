const Express = require('express')()
const Http = require('http').createServer(Express)
const SocketIO = require('socket.io')(Http, { cors: { origins: '*' } })
class Message{
    constructor(room, user, message){}
}

const port = process.env.PORT || 1978
const userNames = [];
const rooms = []; //roomName: { users:[{socket.id: name}], messages:['user/: message 1']}
const users = [];
SocketIO.on('connection', (socket) => {
    let currentRoom = '';
    console.log('a user connected');

    socket.on("set user", (userName) => {
        if(!users[socket.id]){
            users[socket.id] = userName;
            userNames.push(userName);
        }

        SocketIO.emit('new user', userNames)
    })

    socket.on("message", (info) => {
        console.log(`user: ${socket.id}| uName: ${users[socket.id]} | message: ${info.message} | roomName: ${info.roomName}`)
        SocketIO.emit('message data', {user: users[socket.id], message: info.message})
    })
});

Http.listen(port, () => {
    console.log('Listening on port: ' + port)
})
