// Color Solutions Demo
let rectWidth = 10;
let rectHeight = 50;
let colors = ["#ECCE12", "#D3BB03", "#EF2149", "#900D1E", "#382C18" ];
//let colors = [color(20,30,40),]

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawRowRGB(height * 0.2);
  drawRowHSB(height/2);
  drawRowCustom(height * 0.8);
}

function drawRowCustom(yPos){
  colorMode(RGB);
  let counter = 0;
  for (let x = 0; x < width; x+=rectWidth){
    //fill(colors[counter%5]);
    fill(colors[int(random(colors.length))]);
    rect(x,yPos, rectWidth, rectHeight);
    counter ++;
  }
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
