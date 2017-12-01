const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http).sockets;
var connections = [];


app.set('io', io);


const port = process.env.PORT || 4000;

http.listen(port, function(){
  console.log('server runing on: ' + port);
});


io.on('connection', function(socket){
  connections.push(socket)
  console.log(" %s users online", connections.length);
  
  const conn = app.database.ConnectionFactory(['chat']);
  const coll = conn.chat;
  
  const chatDAO = new app.database.ChatDAO(conn, coll)
  
  chatDAO.listMsgs(socket)

  chatDAO.inputMsgs(socket, io)
  
  socket.on('disconnect', function(data){
    
    connections.splice(connections.indexOf(socket), 1)
    console.log("user disconnected: %s still connected", connections.length);

  });
});