const { MongoClient } = require('mongodb');


function MongoConnect(app) {
  const uri = process.env.MONGODB_URI;
  const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const chatDAO = new app.database.ChatDAO();
  
  return mongo.connect((error) => {
    if (error) throw new Error(`ocorreu um erro: ${error}`);

    const collection = mongo.db('mongochat').collection('chat');

    console.log('connected to database');

    let client = app.get('io');

    client.on('connection', function (socket) {
      chatDAO.listMsgs(collection, socket);
      chatDAO.inputMsgs(collection, socket, client);
      chatDAO.clearMsgs(collection, socket, client);
    });
  });
}

module.exports = function () {
  return MongoConnect;
};
