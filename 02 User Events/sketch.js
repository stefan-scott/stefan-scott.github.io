// User Events + Day 1 Challenge
// Mr. Scott
// Sept 11, 2025

// GLOBAL VARIABLES HERE...
let circleColor =  false;
//  declaration    initialization

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  challenge();  //coordinate system challenge
}

function keyPressed(){
  // this is special EVENT function, gets
  // automatically called anytime a keyboard
  // button is pressed.

  print("key was pressed");
  circleColor = !circleColor;
  
  // how to tell WHICH key was pressed???

}

function challenge(){
  // draw 5 hollow circles, in 4 corners and 
  // center position,  50px in diameter each
  noFill();

  if(circleColor){  //circleColor === true
    fill(255,0,0);
  }
  //5 circles
  circle(0,0,50); 
  circle(width,0,50);
  circle(0,height,50);
  circle(width,height,50);
  circle(width * 0.5,height * 0.5,50);
}
