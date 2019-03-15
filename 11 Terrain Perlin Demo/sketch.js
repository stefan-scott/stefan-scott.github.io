// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tWidth = 1;
let start = 0;
let start2 = 40;
let start3 = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  //noLoop();
}

function drawTerrain(){
  //do all the work to draw terrain 1 frame
  
  let xOff = start;
  let xOff2 = start2;
  let xOff3 = start3;
  let highest = height;
  let highestX = 0;
  for (let x = 0; x < width; x += tWidth){
    let curHeight = noise(xOff)*height*0.5;
    stroke(0);
    rect(x, curHeight, x + tWidth, height);

    curHeight = noise(xOff2)*height*0.8;
    stroke(200,100,70);
    rect(x, curHeight, x + tWidth, height);

    curHeight = noise(xOff3)*height;
    stroke(100,240,180);
    rect(x, curHeight, x + tWidth, height);
    xOff += 0.01;
    xOff2 += 0.01;
    xOff3 += 0.01;
    
  }
  start += 0.01;
  start2 += 0.02;
  start3 += 0.04;
  

}

function draw() {
  background(220);
  drawTerrain();
}
