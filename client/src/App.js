import React, { useEffect,useMemo,useState } from 'react';
import {io} from 'socket.io-client'

function App() {
  // const socket = io('http://localhost:3000');
  const socket = useMemo(() => io('http://localhost:3000'), []);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [socketId,setSocketId]=useState("");
  const [messages, setMessages] = useState([]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
   
    socket.emit("message", message,room);
    setMessage("");
    
  };

  const handleRoomJoin = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("");
  }


  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id);
      console.log('Connected to server', socket.id);   
    }); 
    socket.on('recive-message', (message) => {
      console.log(message);
      setMessages([...messages, message]);
    });

  });
  

  return (
    <div>
      <h6>{socketId}</h6>

      <form onSubmit={handleRoomJoin}>
        <input type='text' id='roomJoin' placeholder='roomName' value={roomName}  onChange={(e) => setRoomName(e.target.value)} />
        <button type="submit">Join</button>
      </form>


      <form onSubmit={handleSubmit}>
        <input type='text' id='room' placeholder='room' value={room}  onChange={(e) => setRoom(e.target.value)} />
      <input type='text' id='message' value={message}  onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
        </ul>
    </div>
  );
}

export default App;
