// Mr. Scott
// Interactive Programs

function setup() { //runs ONCE at the start
  createCanvas(windowWidth, windowHeight);
}

function draw() { //runs OVER and OVER
                  //targeting 60 frames per second
  //background(220);
  fill(mouseY,mouseX,0);
  circle(mouseX, mouseY, 30);
}
