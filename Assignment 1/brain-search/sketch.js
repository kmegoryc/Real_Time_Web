var img;
var maxdist = 20;
var circleSize = 5;
var courier;
var sanFran;
var a = 0.2;
var right = 140;
var textLeft = 45;


function preload() {
  img = loadImage("resources/brain.png");
  courier = loadFont("resources/courier-new.ttf");
  sanFran = loadFont("resources/san-francisco.ttf");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  
  background(255);
  image(img, 0 + right, 0);
  
  if (circleSize >= 20) {
    a = -0.2
  }
  else if (circleSize <= 5) {
    a = 0.2
  }
  
  circleSize += a;
  
  //stroke/fill styling for circles 
  stroke(51, 153, 255);
  strokeWeight(2);
  fill(230);
  
  ellipse(531 + right, 219, circleSize, circleSize); //occipital lobe
  ellipse(563 + right, 89, circleSize, circleSize); //partietal lobe
  ellipse(832 + right, 74, circleSize, circleSize); //frontal lobe
  ellipse(674 + right, 151, circleSize, circleSize); //temporal lobe
  ellipse(631 + right, 246, circleSize, circleSize); //cerebellum
  
  //text styles
  noStroke();
  fill(0);
  
  textFont(courier);
  textSize(15);
  text("click a part of the brain to uncover facts", textLeft, windowHeight-30);
  
  textSize(30);
 
  
  if (mouseIsPressed === true) {
    
    print(mouseX)
    print(mouseY)
  
    if(dist(mouseX, mouseY, 531 + right, 219) <= maxdist) {
        textFont(courier);
        text("Occipital Lobe", textLeft, 100);
        textSize(15);
        text("oc·cip·i·tal - vision (color, light, movement)", textLeft, 130);
        textFont(sanFran);
        text("Visual Acuity: -2.00", textLeft, 180);
        text("Visual Talent: Can solve Magic Eye instantly", textLeft, 200);
        text("Favorite Color: Turquoise", textLeft, 220);
        text("Favorite Sights: Total Luner Eclipse, Aurora Borealis, Mountains, Sunset", textLeft, 240);
    }
    else if(dist(mouseX, mouseY, 563 + right, 89) <= maxdist) {
        textFont(courier);
        text("Parietal Lobe", textLeft, 100)
        textSize(15);
        text("pa·ri·e·tal - language, sense of touch, perception", textLeft, 130);
        textFont(sanFran);
        text("Languages: English, Hebrew", textLeft, 180);
        text("Prefers warmth > cold", textLeft, 200);
        text("Low pain tolerance", textLeft, 220);
    }
    else if(dist(mouseX, mouseY, 832 + right, 74) <= maxdist) {
        textFont(courier);
        text("Frontal Lobe", textLeft, 100)
        textSize(15);
        text("fron·tal - personality, emotions, judgement, speech, intelligence", textLeft, 130);
        textFont(sanFran);
        text("Academic Interests: Creative Interactivity, Programming, Web & App Development, Math", textLeft, 180);
        text("Extra Interests: Dance, Music (guitar, piano, voice), Traveling, Rock Climbing", textLeft, 200);
        text("Personality: Mostly introverted, at times extroverted; very task-oriented", textLeft, 220);
    }
    else if(dist(mouseX, mouseY, 674 + right, 151) <= maxdist) {
        textFont(courier);
        text("Temporal Lobe", textLeft, 100);
        textSize(15);
        text("tem·po·ral - hearing, memory", textLeft, 130);
        textFont(sanFran);
        text("Low-level hearing capabilities", textLeft, 180);
        text("Best memories associated with friends, family & adventures", textLeft, 200);
    }
    else if(dist(mouseX, mouseY, 631 + right, 246) <= maxdist) {
        textFont(courier);
        text("Cerebellum", textLeft, 100)
        textSize(15);
        text("cer·e·bel·lum - coordination, posture, balance", textLeft, 130);
        textFont(sanFran);
        text("Great coordination", textLeft, 180);
        text("Below average balance", textLeft, 200);
    }
  }
}