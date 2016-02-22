var app = require('express')();
var http = require('http').Server(app);
var io= require('socket.io').listen(http);

app.get('/', function(req, res){
  res.sendFile(__dirname+'client/index.html');
});

io.on('connection',function(socket){
    console.log('a user conect');
    socket.on('disconnect',function(){
      console.log('user disconnect');
    });
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:jajajajjaja');
});

io.on('connection', function(socket) {
    socket.on('chat message', function(msg){
      console.log('message: '+msg);
    });
});

io.emit('some event',{for: 'everyone'});

io.on('connection',function(socket) {
    socket.broadcast.emit('hi');
});

io.on('connection',function(socket) {
   socket.on('chat message', function(msg){
     io.emit('chat message',msg);
   });
});
