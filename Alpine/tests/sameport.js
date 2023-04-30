const http = require('http');
const express = require('express');

// Initialize Express app
const app = express();

// Register Express routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello from Express!' });
});

// Custom socket handling logic
const handleSocketConnection = (socket) => {
  console.log('New socket connection');

  // Forward the socket to the custom HTTP server
  customHttpServer.emit('connection', socket);
};

// Create a custom HTTP server and pass it to the Express app
const customHttpServer = http.createServer(app);

// Start the custom HTTP server
const PORT = 3001;
customHttpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create a raw net server
const net = require('net');
const netServer = net.createServer(handleSocketConnection);

// Start the net server on another port
netServer.listen(process.env.port, () => {
  console.log(`Net server is running on port ${NET_SERVER_PORT}`);
});
