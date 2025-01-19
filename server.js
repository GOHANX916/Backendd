const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve a simple endpoint to check the server status
app.get("/", (req, res) => {
  res.send("WebSocket server is running!");
});

// WebSocket connection logic
io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from clients
  socket.on("sendMessage", (message) => {
    console.log("Message received:", message);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit("receiveMessage", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});
