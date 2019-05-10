// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(220);
  cantor(width*0.1, height *0.3, width*0.8, 9);
}

function cantor(x,y,len,depth){
  if (depth > 1){
    line(x,y,x+len,y);
    rect(x,y,len,10);
    y += 20;
    cantor(x,y,len/3,depth-1); //left third
    cantor(x + len*2/3,y,len/3, depth-1); //right third
  }
}
