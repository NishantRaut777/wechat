import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});

// get reciever's socket id for one one communication
export const getReceiverSocketId = (userId) =>{
    return userSocketMap[userId];
}

// storing online users
const userSocketMap = {};

io.on("connection" , (socket) => {
    console.log("A user connected", socket.id);

    // getting connected userid and adding in online user map
    const userId = socket.handshake.query.userId;
    if(userId) userSocketMap[userId] = socket.id;

    // emit() is used to send event to all connected clients
    // first paramter is event name which can be anything
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);

        // deleting userid on disconnect from onlineusers map
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
});

export { io, app, server };