const mongo = require('mongodb').MongoClient;

function MongoConnect(app){
  const chatDAO = new app.database.ChatDAO()

  console.log();

  return mongo.connect(process.env.MONGODB_URI, function(error, db){
  
    if(error) throw new Error(error);

    console.log("connected to database");

    let client = app.get('io');

    let collection = db.collection('chat');

    client.on('connection', function(socket){
      chatDAO.listMsgs(collection, socket);
      chatDAO.inputMsgs(collection, socket, client);
      chatDAO.clearMsgs(collection, socket,client);
    });
    
  });

}

module.exports = function(){
  return MongoConnect;
}
