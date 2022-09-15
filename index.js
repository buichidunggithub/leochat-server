import express, { json } from "express";
const app = express(); 
import cors from "cors";
import { connect } from "mongoose";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import messageRoute from "./routes/messagesRoute.js";
import { Server } from "socket.io";

config();
app.use(cors());
app.use(json());

app.use("/api/auth", userRoutes);
app.use("/api/message", messageRoute);

//mongoose connection
connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("DB Connection Successful!")
    }).catch((err) => console.log(err));

 const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io = new Server(server,{
    cors: {
        origin: process.env.ORIGIN_URL,
        credentials: true,
    },
});
//store all online users inside this map
global.onlineUsers =  new Map();
 
io.on("connection",(socket)=>{
    global.chatSocket = socket;
    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id);
    });

    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved",data.message);
        }
    });
});
