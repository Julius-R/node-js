var http = require('http');
var module = require('./module')

http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type' : 'text/plain'});
  res.write(module.myString);
  module.myFun();
  res.end();
}).listen(8000);
