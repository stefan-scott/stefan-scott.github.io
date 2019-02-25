// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = 0; //0 - top  1 - right    2 -bottom
               //3 - left
const rectSize = 30;
let x = 0;
let y = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  if (state === 0){  //on top, going right
      x += 5;
      if (x > windowWidth - rectSize) state = 1;
  }
  else if (state === 1){  //on right, going down
    if (key === " ")
  }
  rect(x,y,rectSize,rectSize);
  //add the other


}
