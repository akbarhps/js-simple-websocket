const express = require('express');
const socket = require('socket.io');

// Setup App
const PORT = process.env.PORT || 3000;
const app = express();
const server = app.listen(PORT,
  console.log("Server running on port " + PORT)
);

// Send static file to client
app.use(express.static('public'));

// Socket setup & pass server
const io = socket(server);
io.on('connection', (socket) => {
  console.log(`${socket.id} is connected`);

  // Handle chat event
  socket.on('chat', function (data) {
    console.log(data);
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    console.log(data);
    socket.broadcast.emit('typing', data);
  });

});