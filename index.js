const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http).sockets;
var connections = [];


app.set('io', io);

app.database.ConnectionFactory(app);

const port = process.env.PORT || 4000;

http.listen(port, function(){
  console.log('server runing on: ' + port);
});

io.on('connection', function(socket){
  connections.push(socket)
  console.log(" %s users online", connections.length);

  
  socket.emit('online now', connections.length);
  
  socket.on('disconnect', function(data){
    
    connections.splice(connections.indexOf(socket), 1)
    console.log("user disconnected: %s still connected", connections.length);

  });
});