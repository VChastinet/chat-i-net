const app = require('./config/express')();
const http = require('http').Server(app);
const io = require('socket.io')(http).sockets;


app.set('io', io);

app.database.ConnectionFactory(app);

const port = process.env.PORT || 4000;

http.listen(port, function(){
  console.log('server runing on: ' + port);
});