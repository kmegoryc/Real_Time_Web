// P5 STUFF ONLY
var sensor1;
var sensor2;
var brightness;
var mapDiam;
var mapColor;
var bubbles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill('lightblue');
	strokeWeight(2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	for(var i = 0; i < bubbles.length; i++){
    	bubbles[i].display();
    	bubbles[i].move();
  	}

	//translate(windowWidth/2, windowHeight/2);
	mapDiam = map(sensor1, 0, 1023, 0, 100);
	mapColor = map(sensor2, 0, 1023, 0, 255);
	fill(mapColor);
	
  //brightness should be a value between 0 and 255, but based on mouse
  brightness = Math.floor(map(mouseX, 0, width, 0, 255));
}

//add a Bubble object to the array when someone clicks
function mouseClicked() {
  bubbles.push(new Bubble(mouseX, mouseY));
  //console.log(bubbles);

  console.log(brightness);
  socket.emit('led', brightness);
}

function touchEnded() {
  for(var i = 0; i < bubbles.length; i++){
    if(bubbles[i].poke()) {
      //splice deletes an item from the array
      bubbles.splice(i, 1);
    }
  }
}

function Bubble(bubbleX, bubbleY) {
  //CONSTRUCTOR: 
  this.x = bubbleX;
  this.y = bubbleY;
  this.size = mapDiam;
  
  //METHODS:
  this.display = function () {
    stroke('darkcyan');
    strokeWeight(3);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  this.move = function() {
    //add random motion to each bubble
    this.x = this.x + random(-1, 1);
    this.y = this.y + -1;
  }
  
  this.poke = function() {
    //check if the mouse is in the bounds of a bubble
    if (mouseX  > (this.x-this.size/2) 
      && mouseX < (this.x+this.size/2) 
      && mouseY > (this.y-this.size/2)
      && mouseY < (this.y+this.size/2)) {

      //console.log(this.x + ", " + this.y);
      return true;
    }
    else {
      return false;
    }
  }
}


////////////////////////////////////////////////

// all non-p5 javascript needs to go inside init() 
// so that this code executes only AFTER the page has loaded

/*function init(){

	// SOCKET STUFF
	var socket = io.connect();

	socket.on('connect', function() {
		console.log("Connected");
	});

	socket.on('sensor', function(data){
		//console.log(data);

    //PARSE: (sensor1 + "," + sensor2)
    //split it into an array
		var values = split(data, ",");
    sensor1 = Number(values[0]);
    sensor2 = Number(values[1]);
	});

}

window.addEventListener('load', init);*/


