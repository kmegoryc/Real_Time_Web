var img;

document.ontouchmove = function(event){
	event.preventDefault();
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill(255);
	stroke('violet');
}

function draw() {
	background(0);
	//touches[] is built into p5, so you don't have to declare it at the top
	//this draws ellipses on mobile screen
	for(var i = 0; i < touches.length; i++){
		ellipse(touches[i].x, touches[i].y, 35, 35);
	}
	
}

function touchStarted() {
	for(var i = 0; i < touches.length; i++){
		sendTouches(
	    {
	    'touch': touches[i]
	    }
	    );
	}
	return false;
}

function sendTouches(message) {
  socket.emit('touches', message);
}







