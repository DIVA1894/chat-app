const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:5173", // React frontend URL
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data); // Broadcast message to all users
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.get("/", (req, res) => {
    res.send("Chat server is running!");
});

server.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
