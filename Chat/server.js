var express = require('express');
var app = express();
var server = require('http').createServer(app);
var bodyparser = require('body-parser');
var io = require('socket.io')(server);
var encode = bodyparser.urlencoded({ extended: false });
app.get('/', function(req, res, next) {
    res.sendfile('./public/index.html');

});

app.use(express.static('public'));
io.on('connection', function(client) {
    // console.log('Client is connecting...');
    // client.on('join', function(data) {
    //     console.log(data);
    // });
    client.on('messages', function(data) {
        client.emit('thread', data);
        client.broadcast.emit('thread', data);
    });
});

server.listen(8000, function() {
    console.log('server is running');
});