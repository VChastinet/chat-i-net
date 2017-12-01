class ChatDAO {

  constructor(){
  }
  listMsgs(collection){
    return function(socket){
  
      collection.find().sort({_id:1}).toArray(function(error, res){
        if(error) throw new Error(error);
  
        socket.emit('output', res);
      });

     }
  }

  inputMsgs(collection, client){
    return function(socket){
  
      function sendStatus(status){
        socket.emit('status', status);
      }
      socket.on('input', function(data){
        let name = data.name;
        let msg = data.msg;
  
        if(name == "" || msg == ""){
          sendStatus('please choose a nickname and type a message')
        } else{
          collection.insert({name: name, msg: msg}, function(){
            client.emit('output', [data]);
            sendStatus({username:name});
          });
          
          if(collection.count() > 500){
              collection.findAndModify({query: {}, sort:{_id: -1}, remove: true});
          }
        }
      });
    }
  }
}

module.exports = function(){
  return ChatDAO
}