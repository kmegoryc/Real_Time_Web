var balls = [];
var balloons = [];
var rand;
var lineX, lineY;
var speedx = 4;
var score = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	fill(0);
    lineX = random(0, windowWidth);
    lineY = 20;
}

function draw() {
	  background(0);
    strokeWeight(6);
    stroke('white');

    //add speed to lineX to change x position
    lineX = lineX + speedx

    //draw line
    line(lineX, lineY, lineX+150, lineY);

    //if it hits edge, switch directions
    if((lineX+150 > width) || (lineX < 0)){
        speedx = speedx * -1;
    }

	for(var i = 0; i < balls.length; i++){
        balls[i].display();
        balls[i].move();
        balls[i].exit();
        balls[i].goal();
    }

    //check if there are any goals
    removeBall();
    
}

function updateLocation(dataTouch) {
    balls.push(new Ball(dataTouch.x, dataTouch.y));
    console.log(balls);
}

function Ball(ballX, ballY) {

  //CONSTRUCTOR: 
  this.x = ballX;
  this.y = ballY;
  this.size = random(15, 50);
  
  //METHODS:
  this.display = function () {
    stroke('white');
    strokeWeight(6);
    ellipse(this.x, this.y, this.size, this.size);
  }
  
  this.move = function() {
    this.y = this.y - 4;
  }

  this.exit = function() {
    //console.log(this.y);
    if(this.y < 0) {
        return true;
    }
    else {
        return false;
    }
  }

  this.goal = function() {
    if((this.y < lineY) 
        && (this.x > lineX)
        && (this.x < lineX+150)) {
        return true;
    }
    else {
        return false;
    }
  }
}

function removeBall() {
  for(var i = 0; i < balls.length; i++){
    if(balls[i].goal()) {
        //splice deletes an item from the array
        balls.splice(i, 1);
        console.log("goalreceived!");
        score += 1;
        console.log(score);
        document.getElementById('score').innerHTML = score;
    }
    else if(balls[i].exit()) {
        //splice deletes an item from the array
        balls.splice(i, 1);
        console.log("ball gone!");
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
