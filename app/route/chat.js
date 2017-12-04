module.exports = function(app){
var connections = [];
  
  app.get('/', function(req, res){
   res.render('login');
  });

  app.post('/chat', function(req, res){
    const user = req.body;

    app.get('io').on('connection', function(socket){
      connections.push(socket)
      console.log(" %s users online", connections.length);
    
      
      socket.emit('online now', connections.length);
      
      socket.on('disconnect', function(data){
        
        connections.splice(connections.indexOf(socket), 1)
        console.log("user disconnected: %s still connected", connections.length);
    
      });
    });

    res.render('chat', {user: user});

  })
  
}