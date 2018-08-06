module.exports = function(app) {
  let connections = [];
  let userList = [];
  
  app.get('/', function(req, res) {
    res.render('login');
  });
  
  app.post('/chat', function(req, res) {
    const user = req.body;
    
    app.get('io').on('connection', function(socket) { 
      socket.user = user.user;

      if (!connections.some(item => socket.id === item.id)) {
        connections.push(socket);   
      }
      
      console.log(`User "${user.user}" is online: ${connections.length} users online`);
      connections.map(socket => socket.emit('online now', {total: connections.length, users: connections.map(item => item.user)}))

      socket.on('disconnect', function(data) {
        connections = connections.filter(item => socket.id !== item.id);

        console.log(`User disconnected: ${connections.length} still connected`)
        connections.map(socket => socket.emit('online now', {total: connections.length, users: connections.map(item => item.user)}))
      });
    });

    res.render('chat', { user: user });
  });
};
