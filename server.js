//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
/*
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));
var messages = [];
var sockets = [];

io.on('connection', function (socket) {
    messages.forEach(function (data) {
      socket.emit('message', data);
    });

    sockets.push(socket);

    socket.on('disconnect', function () {
      sockets.splice(sockets.indexOf(socket), 1);
      updateRoster();
    });

    socket.on('message', function (msg) {
      var text = String(msg || '');

      if (!text)
        return;

      socket.get('name', function (err, name) {
        var data = {
          name: name,
          text: text
        };

        broadcast('message', data);
        messages.push(data);
      });
    });

    socket.on('identify', function (name) {
      socket.set('name', String(name || 'Anonymous'), function (err) {
        updateRoster();
      });
    });
  });

function updateRoster() {
  async.map(
    sockets,
    function (socket, callback) {
      socket.get('name', callback);
    },
    function (err, names) {
      broadcast('roster', names);
    }
  );
}

function broadcast(event, data) {
  sockets.forEach(function (socket) {
    socket.emit(event, data);
  });
}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(process.env.PORT, process.env.IP);


var app = require('express')();
var http = require('http').Server(app);
var io= require('socket.io').listen(http);

app.get('/', function(req, res){
  res.sendfile('client/index.html');
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
*/
var express = require('express'),
http = require('http'),
app=express(),
server=http.createServer(app),
path=require('path');
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname,'client')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
	  console.log(msg);
    io.sockets.emit('chat message', msg);
  });
});
io.on('connection',function(socket){
    console.log('a user conect');
    socket.on('disconnect',function(){
      console.log('user disconnect');
    });
});
server.listen( 3000, function(){
  console.log('listening on *:'+ 3000);
});

