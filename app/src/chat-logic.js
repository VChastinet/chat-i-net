(function(){
  const socket = io();
  let $ = document.querySelector.bind(document);
  
  if(socket) console.log('conected to socket');
  
  socket.on('output', function(data){
    
    data.forEach(msg => {

      if(msg == "/clear"){
        $('#chat-txt ul').innerHTML = "";
      } else{
        let singleMsg = document.createElement('li');
        singleMsg.innerHTML = '<strong>'+ msg.name + '</strong>: ' + msg.msg;
        $('#chat-txt ul').appendChild(singleMsg);
      }
    });
    
    $("#chat-txt").scrollTop = $("#chat-txt").scrollHeight;
    
  }); 
      
    $('#msg').addEventListener('keydown', function(event){
      if(event.keyCode == 13 && !event.shiftKey){
        
        socket.emit('input', {
          name: $('#user').value,
          msg: $('#msg').value
        });
        
        $('#msg').value = "";
        
        $("#chat-txt").scrollTop = $("#chat-txt").scrollHeight;
        
        event.preventDefault();
      }
    });
  })();