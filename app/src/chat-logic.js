(function() {
  const socket = io();
  const $ = document.querySelector.bind(document);

  if (socket) console.log('conected to socket');

  socket.on('disconnect', 'birl');

  socket.on('output', function(data) {
    data.forEach(msg => {
      if (msg == '/clear') {
        $('#chat-txt ul').innerHTML = '';
        return;
      } 
      
      const singleMsg = document.createElement('li');
      singleMsg.classList.add('msg-li');
      singleMsg.innerHTML = `<strong>${msg.name}</strong>: ${msg.msg}`;
      $('#chat-txt ul').appendChild(singleMsg);
      
    });

    $('#chat-txt').scrollTop = $('#chat-txt').scrollHeight;
  });

  $('#msg').addEventListener('keydown', function(event) {
    if (event.keyCode == 13 && !event.shiftKey) {
      socket.emit('input', {
        name: $('#user').value,
        msg: $('#msg').value
      });

      $('#msg').value = '';

      $('#chat-txt').scrollTop = $('#chat-txt').scrollHeight;

      event.preventDefault();
    }
  }); 

  socket.on('online now', function(data){
    $('#online-users ul').innerHTML = '';
    console.log(data)

    const users = data.users;
    const total = data.total;
    $('#total').innerHTML = total;

    users.map(user => {
      const singleUser = document.createElement('li');
      singleUser.classList.add('user-li');
      singleUser.innerHTML = `❮ ${user} ❯`;
      $('#online-users ul').appendChild(singleUser);
    })
  });
})();
