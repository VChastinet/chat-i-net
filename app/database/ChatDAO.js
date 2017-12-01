class ChatDAO {

  constructor(conn, coll){
    this.conn = conn;
    this.coll = coll
  }
  listMsgs(socket){
    return  this.coll.find().sort({_id:1}, function(error, res){
        if(error) throw new Error(error);
  
        socket.emit('output', res);
        //this.conn.close();
      });

     }

  inputMsgs(socket, client){
    //corrigir aqui
    return socket.on('input', function(data){
        let name = data.name;
        let msg = data.msg;
  
        if(msg == ""){
          return alert('please type a message')
        } else{
          this.coll.insert({name: name, msg: msg}, function(err, data){
            client.emit('output', [data]);
            
            //this.conn.close();
          });
        }
          
        if(this.coll.count() > 500){
            this.coll.findAndModify({query: {}, sort:{_id: -1}, remove: true}, function(){
            //this.conn.close();
          });
        }
    });
  }
}

module.exports = function(){
  return ChatDAO
}