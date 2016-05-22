var R = require('ramda')
var checksum = require('checksum')
var crc = require('crc');

var array = [120,120,31,18,16,5,22,1,49,29,203,0,95,7,108,8,53,151,81,0,60,157,2,220,123,16,65,0,159,170,0,23,146,84,13,10]
var msj = "0D0101234567890123450001" 
console.log(crc.crc16(array))

var crc16 = require('crc-itu').crc16;

// with string and encoding
var ret = crc16('0D0101234567890123450001', 'hex');
console.log('CRC: ', ret.toString(16)); // 7bf9

console.log('Tamano: ',array.length)

R.forEach(function(num){
	console.log(num,' - ',num.toString(16))
},array)

console.log(array.slice(11, 15))

console.log(array.slice(15, 19))
