// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let leftOn = false;
let rightOn = true;
let side;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  determineSide();

  //draw left rect
  if (leftOn)  fill(255);
  else fill(0);
  rect(0,0,width/2,height);

  //draw right rect
  if (rightOn)  fill(255);
  else fill(0);
  rect(width/2,0,width/2,height);
  

}

function mousePressed(){
  if (side===0){
    leftOn = !leftOn;
  }
  else{
    rightOn = !rightOn;
  }
}

function determineSide(){
  if (mouseX < windowWidth/2) side = 0;
  else side =1;
}
