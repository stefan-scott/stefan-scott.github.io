// Coordinate Systems and User Events
// Mr. Scott
// September 10, 2025
// A first look at interactive programs with p5.js 

function setup() { //runs ONCE at the start

  createCanvas(400, 400);
  print(windowWidth, windowHeight, width, height);
  //windowWidth: current brower width
  //width:       canvas width
}

function draw() { //runs OVER and OVER
  //targeting 60 frames per second
  //STRIVE to keep draw() clean and tidy
  background(220);  //draws a big solid rectangle
  //0 - black    255 - white
  drawTwoCircles();
}

function drawTwoCircles() { //[ALT][SHFT][F] → Autoformat
  // draws two circles, one at a fixed location
  // and one at the mouse location.

  // Draw order:
  // Later a thing is "drawn" (further down in draw())
  // The higher it is in the draw stack

  fill(255, 0, 255);
  circle(width / 2, height / 2, 100);

  fill(0, 255, 0); //colors are a bit like 
  //picking up a marker, or
  //filling a paintbrush with paint...
  //R, G, B
  circle(mouseX, mouseY, 30);


}
