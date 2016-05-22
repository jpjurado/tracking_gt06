var net = require('net');
var crc16 = require('crc-itu').crc16;

var server = net.createServer();  
server.on('connection', handleConnection);

server.listen(8000, function() {  
  console.log('server listening to %j', server.address());
});

function handleConnection(conn) {  
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('new client connection from %s', remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  function onConnData(d) {
    console.log('connection data from %s: %j', remoteAddress, d);
    

    //conn.write(d);
    console.log(d)
    var msj = handleMessage(conn,d.toJSON().data)
    console.log('Response msg:',msj)
    if(msj)
      setTimeout(function(){ conn.write(new Buffer(msj)) }, 500);
      //)
  }

  function onConnClose() {
    console.log('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}

function handleMessage(msg){
  console.log(msg.length)
  var headers = msg.slice(0,2)
  var length = msg[3]
  var command = msg.slice(msg.slice(2,2+length))
  //var footers =
  //
  console.log(headers,command)
}

function checksumToArray(cs){
  console.log('CS**',cs)
  cs = ''+cs
  var upper = cs.substring(0,2)
  var lower = cs.substring(2,4)
  return [parseInt(upper,16),parseInt(lower,16)]
}

function arrayToHex(cmd){
  var hex = ''
  for (var i = 0; i < cmd.length; i++) {
    if(cmd[i] <= 0xf)
      hex+='0'
    hex+=cmd[i].toString(16)
  }
  console.log(cmd)
  console.log('HEX: ',hex)
  return hex
}

function handleMessage(conn,msg){
  console.log(msg.length)
  var headers = msg.slice(0,2)
  var length = msg[2]
  var command = msg.slice(3,3+length)
  //var footers =
  //
  console.log(length)
  console.log(headers,command)

  var protocol_number = command[0]
  switch(protocol_number){
    case 0x01:
      console.log('Login message');

      var ID = command.slice(1,9) //Terminal ID
      var sn = command.slice(9,11) //Serial number
      var checksum = command.slice(11,13) //Checksum

      console.log(ID,sn,checksum)

      console.log(command)

      var toChecksum = msg.slice(2,2+length-1)
      console.log('+++',toChecksum)

      console.log('HEX Check:',arrayToHex(toChecksum))
      
      var hex = crc16(arrayToHex(toChecksum), 'hex');
      console.log('CRC: ', hex.toString(16)); // 7bf9

      var response = []
      response = response.concat([0x78,0x78,0x05,0x01])
      response = response.concat(sn)

      console.log('msg to checksum,',response.slice(2,6))
      var cs_response = crc16(arrayToHex(response.slice(2,6)),'hex');
      console.log('Checksum responsse',cs_response)
      console.log('Checksum :',checksumToArray(cs_response))

      response = response.concat(checksumToArray(cs_response.toString(16)))
      response = response.concat([0x0D,0x0A])
      console.log('Resonse',response)
      return response
      //conn.write(response)
      
    break
    case 0x12:
      console.log('Dataaaaa')
      var date_time = command.slice(1,7) //Date time
      var qgn = command[7] //Quantyty of GPS satellites
      var lat = command.slice(8,12)
      var lon = command.slice(12,16)
      var speed = command[16]
      var course = command.slice(17,19)
      var MCC = command.slice(19,21)
      var MNC = command[21]
      var LAC = command.slice(22,24)
      var cell_ID = command.slice(24,27)
      var sn = command.slice(27,29) //Serial number
      var checksum = command.slice(29,31) //Checksum

      console.log(sn,checksum)

      return undefined
    break
    case 0x80:

    break 
  }
}