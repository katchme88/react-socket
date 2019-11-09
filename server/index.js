var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5000);
// WARNING: app.listen(80) will NOT work here!
const staticDir = __dirname + '/static/'
app.get('/', function (req, res) {
  res.sendFile(staticDir, 'index.html');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('message', function (data) {
    socket.broadcast.emit('message', data)
  });
  socket.on('connected', function (data) {
    console.log(data);
  });
});