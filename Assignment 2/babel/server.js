// HTTP Portion
// You won't be making changes in this HTTP portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
var url = require('url');
httpServer.listen(8080); //this is part of our url when we access our page

function requestHandler(req, res) {

	var parsedUrl = url.parse(req.url);
	console.log("The Request is: " + parsedUrl.pathname);
		
	fs.readFile(__dirname + parsedUrl.pathname, 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading ' + parsedUrl.pathname);
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
  	
  	/*
  	res.writeHead(200);
  	res.end("Life is wonderful");
  	*/
}

// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
//socket.on("name", callback)
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {

		//All message sending back and forth happens here!

		//THIS IS WHERE EVERYTHING HAPPENS
		//where we listen for messages and send messages
	
		console.log("We have a new client: " + socket.id);

		
		// When this user emits, client side: socket.emit('otherevent', some data);
		socket.on('chatmessage', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received a chat message: " + data);
			
			// Send it to all of the clients
			io.sockets.emit('chatmessage', data);
		});
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected: " + socket.id);
		});
	}
);