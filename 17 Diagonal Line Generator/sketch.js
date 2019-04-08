// Cubic Disarray Reproduction
const squareSize = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  rectMode(CENTER);
}

function drawRectangles(){
  for (let x = squareSize/2; x < width-squareSize/2; x+=squareSize){
    for (let y=squareSize/2; y <height-squareSize/2; y+=squareSize){
      rect(x,y,squareSize,squareSize);
    }
  }
}

function draw() {
  background(220);
  drawRectangles();

}
