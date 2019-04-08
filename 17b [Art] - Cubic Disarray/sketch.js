// Cubic Disarray Reproduction
const squareSize = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  rectMode(CENTER);
  noFill();
  noLoop();
}

function drawRectangles(){
  for (let x = squareSize/2; x < width-squareSize/2; x+=squareSize){
    for (let y=squareSize/2; y <height-squareSize/2; y+=squareSize){
      push();
      translate(x,y);
      let rAmount = map(y,0,height,0,60);
      rotate(radians(random(-rAmount,rAmount)));
      let offset = map(y,0,height,0, 15);
      rect(random(-offset,offset),random(-offset,offset),squareSize,squareSize);
      pop();
    }
  }
}

function draw() {
  background(255);
  drawRectangles();

}
