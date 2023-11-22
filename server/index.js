const express = require('express');
const app = express();
const PORT = 5000;

const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

app.get('api', (req, res) => {
    res.json({
        message: 'Hello'
    })
});

const users = [];

socketIO.on('connection', (socket) => {
    console.log(`User '${socket.id}' has connected.`);

    socket.on('message', (msg) => {
        socketIO.emit('response', msg)
    });

    socket.on('login', (user) => {
        users.push(user);
        socketIO.emit('responseUsers', users);
    });

    socket.on('logout', (username) => {
        let user = users.find(item => item.username === username.username);
        let index = users.indexOf(user);
        if (index !== -1) {
            users.splice(index, 1);
            socketIO.emit('responseUsers', users);
        } else {
            console.log(`${user} have not found/`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User '${socket.id}' has disconnected.`)
    });
});

http.listen(PORT, () => {
    console.log('Server is working.')
});
