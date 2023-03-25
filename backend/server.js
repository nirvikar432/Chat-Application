const express = require('express');  //import express
const dotenv = require("dotenv");
const { chats } = require("./data/data.js");
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

const app = express()               //create instance of express variable
dotenv.config();
connectDB();
app.use(express.json())  // to accept the JSON data

app.get('/', (req, res) => {                 //creating express.js API
  res.send("API is Running Successfully")
});


app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
})

io.on("connection", (socket) => {
  console.log('Connected to Socket.io')

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    // console.log(userData._id)
    socket.emit('connected')

  })


  socket.on('join chat', (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room)

  })

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

})