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

/////////////////////////////////
// READING THE JSON FILE

//read and parse modules.json file
var moduleData = fs.readFileSync('modules.json');
var modules = JSON.parse(moduleData);


// WEBSOCKET PORTION

var io = require('socket.io').listen(httpServer);

io.sockets.on('connection', 

	function (socket) {
	
		console.log("We have a new client: " + socket.id);

		//student has connected, and needs the updated module array
		socket.on('connected', function() {
			console.log('client connected, sending words');

			//send current array in modules.json file
			io.sockets.emit('getArray', modules);
		});

		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});

		/*socket.on('moduleDataChanged', function(data){
			console.log('received: ' + data);
			io.sockets.emit('studentData', data);
		});*/

		//data was entered in the teacher's form
		socket.on('dataEntered', function(data){
			console.log('received: ' + data);

			//add the new data to our modules array
			modules.push(data);
			console.log(modules);

			//need to turn array into text-based data
			//opposite of 'parse' is 'stringify'
			var dataToWrite = JSON.stringify(modules);

			//write the file to the modules.json on the server with updated data
			fs.writeFile('modules.json', dataToWrite, function(callback){
				console.log('data added!');
			});

			//send this updated array to EVERYONE
			//io.sockets.emit('getArray', modules);
			io.sockets.emit('allModules', modules);
		});


		
	}
);