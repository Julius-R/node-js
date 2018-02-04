var http = require('http');//important to require http

function onRequest(request, response){
  response.writeHead(200, {'Content-Type' : 'text/plain'});
  response.write('Hello World');
  response.end();
}

http.createServer(onRequest).listen(8000); //creates a server that is listening to port 8000
