var ripples = []; // empty array named ripples

function preload() {
  mySound = loadSound('assets/waterdrop.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound.setVolume(0.1);
  noFill();
}

function draw() {
  background(71, 134, 237);
  // loop through all ripples objects and call its methods
  for (var i = 0; i < ripples.length; i++) {
    ripples[i].grow();
    ripples[i].display();
    //check if the ripple has disappeared, if so, remove it from the ripples array
    if(ripples[i].a <= 0) {
      ripples.splice(i, 1);
    }
  }
}

function mousePressed() {
  // adds a Ripple to the ripples array
  ripples.push(new Ripple(mouseX, mouseY));
  console.log(ripples)
  //play water drop sound
  mySound.play();
  // when the mouse is pressed, send Ripple data 
  sendRipple(
    {
    'x': mouseX,
    'y': mouseY
    }
    );
}

function Ripple(xin, yin) {
  
  this.x = xin;
  this.y = yin;
  this.diam = 1;
  this.a = 255;
  
  this.grow = function() {
    this.a-=random(0, 1);
    // grow ripple size at decelerating rate
    for(var g = 1.0; g > 0.1; g--){
      this.diam+=g;
    }
  }
  
  this.display = function() {
    // draw ripples to screen
    stroke(255, 255, 255, this.a);
    strokeWeight(2);
    ellipse(this.x, this.y, this.diam, this.diam);
    strokeWeight(1.5);
    ellipse(this.x, this.y, this.diam+30, this.diam+30);
    strokeWeight(3);
    ellipse(this.x, this.y, this.diam+50, this.diam+50); 
    strokeWeight(1);
    ellipse(this.x, this.y, this.diam+20, this.diam+20);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function sendRipple(message) {
  socket.emit('drawing', message);
}

function otherDraw(dataX, dataY) {
  // add Ripple to the ripples array for the new client(s)
  ripples.push(new Ripple(dataX, dataY));
}

