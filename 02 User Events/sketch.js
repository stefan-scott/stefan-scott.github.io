// User Events + Day 1 Challenge
// Mr. Scott
// Sept 11, 2025

// GLOBAL VARIABLES HERE...
// can only work with "simple" data in this
// section of code. No system variables are
// available until in setup(), ...after canvas is made

let circleColor = false;
let currentColor = "white";

let x; let y = 300;
let tSize = 50;  //for text-font size
//  declaration    initialization

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  x = width / 2;
}

function draw() {  //60 fps
  background(220);
  challenge();  //coordinate system challenge
  movement();
  rect(x, y, 60, 30);
  mouseReport();
}

function mouseReport(){
  // inspect some of the built-ins (system variables)
  // for working with the mouse
  fill(0);
  let src = mouseX + ", " + mouseY + ", " + mouseIsPressed+","+mouseButton;
  textSize(tSize);
  text(src, mouseX, mouseY);

  if(mouseIsPressed){
    
  }
}

function mousePressed(){
  //function automatically called ONCE per mouse click interaction
  tSize = random(10, 80);
}






function movement() {
  // check for keyboard presses each frame
  // and move the rectangle accordingly

  // if (keyCode === RIGHT_ARROW && keyIsPressed) x += 5;
  // else if (keyCode === LEFT_ARROW && keyIsPressed) x -= 5;

  if (keyIsDown(UP_ARROW)) y -= 15;
  if (keyIsDown(DOWN_ARROW)) y += 15;
  if (keyIsDown(LEFT_ARROW)) x -= 15;
  if (keyIsDown(RIGHT_ARROW)) x += 15;
}

function keyPressed() {
  // this is special EVENT function, gets
  // automatically called anytime a keyboard
  // button is pressed.


  print("key was pressed");
  if (key === "g") currentColor = "green";
  else if (keyCode === CONTROL) currentColor = "aqua";

  circleColor = !circleColor;

  // how to tell WHICH key was pressed???

}

function challenge() {
  // draw 5 hollow circles, in 4 corners and 
  // center position,  50px in diameter each
  noFill();

  if (circleColor) {  //circleColor === true
    fill(currentColor);
  }
  //5 circles
  circle(0, 0, 50);
  circle(width, 0, 50);
  circle(0, height, 50);
  circle(width, height, 50);
  circle(width * 0.5, height * 0.5, 50);
}
