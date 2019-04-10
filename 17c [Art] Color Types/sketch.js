// Color Solutions Demo
let rectWidth = 10;
let rectHeight = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawRowRGB(height * 0.2);
  drawRowHSB(height/2);
}

function drawRowHSB(yPos){
  colorMode(HSB, 360);
  for (let x = 0; x < width; x+=rectWidth){
    //fill (HUE,  SATURATION,  BRIGHTNESS)
    fill( x/10 %360 , 280, 330 );
    rect(x,yPos, rectWidth, rectHeight);
  }
}

function drawRowRGB(yPos){
  colorMode(RGB);
  for (let x = 0; x < width; x+=rectWidth){
    fill(random(255),random(255),random(255));
    rect(x,yPos, rectWidth, rectHeight);
  }
}

function draw() {
  //background(220);
}
