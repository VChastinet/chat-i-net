const mongo = require('mongodb').MongoClient;

function MongoConnect(app){
  const chatDAO = new app.database.ChatDAO('chat')

  //let mongoUrl = process.env.MONGODB_URI

  return mongo.connect('mongodb://127.0.0.1:27017/chat-i-net', function(error, db){
    
    if(error) throw new Error(error);

    console.log("connected to database");

    let client = app.get('io');

    let collection = db.collection('chat');

    client.on('connection', chatDAO.listMsgs(collection));
    client.on('connection', chatDAO.inputMsgs(collection, client));

    
  });

}

module.exports = function(){
  return MongoConnect;
}
