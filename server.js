var net = require('net');

var server = net.createServer(function(socket) {
	console.log('New Connection')
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(8090, '127.0.0.1');