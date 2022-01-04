const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;
var cors = require('cors');
app.use(cors());
const io = require('socket.io')(http, {
    cors: {
        origins: ['http://localhost:5500'],
        methods: ["GET", "POST"]
    }
})

// app.get('/', (req, res)=>{
//     res.sendFile(__dirname+ '/index.html');
// })

io.on('connection', (socket) => {
    console.log('a user connected');
});

http.listen(port, ()=>{
    console.log(`Socket io server running on port http://localhost:${port}/`)
})