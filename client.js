var net = require('net');

var client = new net.Socket();
client.connect(9000, 'localhost', function() {
	console.log('Connected');
	var msg = [0x78,0x78,0x0d,0x01,0x01,0x23,0x45,0x67,0x98,0x01,0x23,0x45,0x00,0x01,0x8c,0xdd,0x0d,0x0a]
	//[120,120,13,1,3,85,72,128,32,18,104,120,0,13,168,61,13,10]
	var buf = new Buffer(msg)
	client.write(buf);
});

client.on('data', function(d) {
	console.log('Received: ');
	console.log(d)
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});