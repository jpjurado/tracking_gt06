var net = require('net');

var server = '167.114.164.227' 
server = 'localhost' 

var client = new net.Socket();
client.connect(8000, server, function() {
	console.log('Connected');
	var msg = [0x78,0x78,0x0d,0x01,0x03,0x53,0x41,0x35,0x32,0x15,0x03,0x62,0x00,0x02,0x2d,0x06,0x0d,0x0a]
	//[0x78,0x78,0x0d,0x01,0x01,0x23,0x45,0x67,0x89,0x01,0x23,0x45,0x00,0x01,0x8c,0xdd,0x0d,0x0a]
	//[120,120,13,1,3,85,72,128,32,18,104,120,0,13,168,61,13,10]
	var buf = new Buffer(msg)
	client.write(buf);
});

client.on('data', function(d) {
	console.log('Received: ');
	console.log(d)
	//client.destroy(); // kill client after server's response
	var msg = [120,120,31,18,16,5,22,1,49,29,203,0,95,7,108,8,53,151,81,0,60,157,2,220,123,16,65,0,159,170,0,23,146,84,13,10]
	var buf = new Buffer(msg)
	client.write(buf);
});

client.on('close', function() {
	console.log('Connection closed');
});