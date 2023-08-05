const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
let users = []; 
io.on("connection", (socket) => {
    

    socket.on("submit", ({message, name}) =>{
        users.push({id: socket.id, name: name});
        const currentUser = users.find((user) => user.id === socket.id)
        io.emit("response", {message, user: currentUser.name})
    });

    socket.on("disconnect", (data) => {
        const inew = users.filter((c) => c.id !== socket.id);
        users = inew;
    })
});

server.listen(5000, () => {
    console.log(5000);
})