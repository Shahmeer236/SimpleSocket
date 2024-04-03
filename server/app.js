import express from 'express';
import {Server} from 'socket.io';
import {createServer} from 'http';
import cors from 'cors';
const Port = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3001',
        methods:['GET','POST']
    }
});




app.get('/', (req, res) => {
        res.send('Hello World');
});

io.on('connection',(socket)=>{
    console.log('User connected ',socket.id);


    socket.on('message', (message,room) => {
        console.log(message);
    io.to(room).emit('recive-message', message);
      });

    socket.on('join-room',(room)=>{
        socket.join(room);
        console.log('Room Joined',room);
    });



    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
})



server.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});
