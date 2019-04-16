const express = require('express');

//App setup
const app = express();
var server = app.listen(8800, ()=>{
    console.log('Listening to requests on port 8800');
});

//Static files
app.use(express.static('public'));


//Socket setup
const socket = require('socket.io');

const io = socket(server);

io.on('connection', (socket)=>{
    console.log('made socket connection', socket.id);

    //Handle chat event
    socket.on('chat', (data)=>{
        io.emit('chat', data);
    });

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data)
    });
});