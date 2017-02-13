var on; // ripple on true/false
var current = 0; // number of ripple sets
var diam; // ripple diameter
var x; // ripple x location
var y; // ripple y location
var a = 255; // ripple opacity

var ripples = []; // empty array called rings

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(71, 134, 237);
  // loop through all ripples objects and call its methods
  for (var i = 0; i < ripples.length; i++) {
    ripples[i].grow();
    ripples[i].display();
  }
}

function mousePressed() {
  console.log(ripples);
  ripples.push(new Ring(mouseX, mouseY));
}

function Ring(xin, yin) {
  
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