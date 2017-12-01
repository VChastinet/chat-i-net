module.exports = function(app){

  
  app.get('/', function(req, res){
   res.render('login');
  });

  app.post('/chat', function(req, res){
    const user = req.body;

    res.render('chat', {user: user});

  })
  
}