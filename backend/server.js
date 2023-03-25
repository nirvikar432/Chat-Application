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


app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});