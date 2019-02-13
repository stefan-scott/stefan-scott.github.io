// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let img;
let imgSize;
let imgArray = [];

function preload() {
  img = loadImage("assets/gear.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  imgSize = 200;
}
function draw() {
  background(220);
  for (let i = 0; i<imgArray.length; i++){
    image(img, imgArray[i][0], imgArray[i][1], imgArray[i][2], imgArray[i][2]);  
  }

  image(img, mouseX, mouseY, imgSize, imgSize);
}
function mousePressed(){
  let cur = [mouseX, mouseY, imgSize];
  imgArray.push(cur);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    imgSize += 25;
  }
  else {
    if (imgSize > 25) {
      imgSize -= 25;
    }
  }
  return false;
}
