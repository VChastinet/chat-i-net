const mongo = require('mongojs');

function MongoConnect(collection){
  
  //let mongoUrl = process.env.MONGODB_URI
  const db = mongo('mongodb://127.0.0.1:27017/chat-i-net', collection);
  
  return db;

}

module.exports = function(){
  return MongoConnect;
}
