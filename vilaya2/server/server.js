const express = require('express')
const cors = require('cors')
const path = require('path');
const bingoRouter = require('./routes/bingoRouter')();
const { addUser, removeUser, getUser, getUsersInRoom,users } = require('./socket/users');
const { callbackPromise } = require('nodemailer/lib/shared');

const PORT = 3001

const server = express()

const http = require('http').createServer(server)

const io = require('socket.io')(http)

var corsOptions = {         
  origin: '*',      
  optionsSuccessStatus: 200,     
}       

server.use(cors(corsOptions))        
 
server.use(express.json());

server.use(express.static(path.resolve(__dirname,'../client/build')));

server.get('/',(req,res)=>{
  res.sendFile(path.resolve('index.html'))
})

server.use('/bingo', bingoRouter)
 
         
//-----------------------------------socket.io---------------------------------------------
           
io.on('connection',(socket)=>{
     
  socket.on('join',(data) =>{  
      
    let room = data.roomId   
    let name = data.userName
    let email = data.emailId
 
    const { error, user } = addUser({ id: socket.id, name, room ,email});
   
    socket.join(user.room);   

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  })             
 
  socket.on('sendMessage',(message) =>{
   
 
    io.to(message.roomId).emit('message', {text: message.dice });
 
  })       
  
  socket.on('end', () => {

    const user = removeUser(socket.id);

    socket.leave(user.room);
 
    if(user) {
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  }) 
    
})          
   
//-----------------------------------------------------------------------------------------------
  

http.listen(PORT, () => {
  console.log('Server started on port! ' + PORT)
})
