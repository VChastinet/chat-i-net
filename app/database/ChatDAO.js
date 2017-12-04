class ChatDAO {

  constructor(){
  }
  listMsgs(collection, socket){
    return  collection.find().sort({_id:1}).toArray(function(error, res){
        if(error) throw new Error(error);
        socket.emit('output', res);
      });
  }

  inputMsgs(collection, socket, client){
    return socket.on('input', function(data){

        let name = data.name;
        let msg = data.msg;
  
        if(msg == ""){
          return
        } else{
          collection.insert({name: name, msg: msg}, function(){
            client.emit('output', [data]);
          });
        }
      });
    }

  clearMsgs(collection, socket, client){
    return  socket.on('input', function(data){
        
        let msg = data.msg;
  
        if(msg == "/clear"){
          collection.drop(function(err, reply){
            if(err) throw new Error(error);
            client.emit('output', ['/clear']);
          })
        } 
      });
  }
}

module.exports = function(){
  return ChatDAO
}