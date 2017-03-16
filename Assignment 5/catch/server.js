// HTTP PORTION

var http = require('http');
var fs = require('fs');
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080);

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	//console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
}


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		socket.on('touches', function(data) {
			//console.log("Received touches: " + data.touch);
			//send this drawing data to EVERYONE but myself (aka don't send back to the sender/client it came from)
			socket.broadcast.emit('sendLocation', data);
		});

		/*socket.on('updatecore', function(data) {
			console.log("Received new score: " + data.score);
			//send this drawing data to EVERYONE but myself (aka don't send back to the sender/client it came from)
			socket.broadcast.emit('sendgoal', data);
		});*/


		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);