// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  fill(int(random(255)),int(random(255)),int(random(255)));
}

function draw() {
  background(220);
  rect(width/2,height/2,mouseX, mouseY);
  if (frameCount % 60 === 0) {
    fill(int(random(255)),int(random(255)),int(random(255)));
  }
}


