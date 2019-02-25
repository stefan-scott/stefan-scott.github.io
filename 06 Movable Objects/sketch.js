// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let x = 200;
let y = 200;
let rSize = 50;
let mouseOver = false;
let pickedUp = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(0);
  fill(150, 0, 0);
  mouseOver = false;
  if (mouseX >= x - rSize / 2 && mouseX <= x + rSize / 2) {
    if (mouseY >= y - rSize / 2 && mouseY <= y + rSize / 2) {
      fill(255, 0, 0);
      mouseOver = true;
    }
  }
  if (pickedUp){
    x = mouseX;
    y = mouseY;
  }
  rect(x, y, rSize, rSize);
}


function mousePressed(){
  if (mouseOver){
    pickedUp = true;
  } 
} 

function mouseReleased(){
  pickedUp = false;
}