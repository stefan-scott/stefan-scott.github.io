// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x, y;
let xSpeed, ySpeed;
let img;
let pos =0;
let imgSize = 200;
let images = [];

function preload(){

  img = loadImage("/assets/gear.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  x = width/2;
  y = height/2;
  xSpeed = random(-3,3);
  ySpeed = random(-5,5);
  background(0);
  noStroke();
}

function draw() {
  background(255);
  ellipse(x, y, 25, 25);
  x += xSpeed;
  y += ySpeed;
  fill(random(255),random(255),random(255));
  for(let i = 0; i < images.length; i++){
    print(images[i]);
    image(img, images[i][0], images[i][1], images[i][2], images[i][2]);
  }
  image(img, mouseX,mouseY,imgSize, imgSize);

}

function mousePressed(){
  xSpeed = random(-3,3);
  ySpeed = random(-5,5);
  let loc = [mouseX, mouseY, imgSize];
  images.push(loc);
  
}

function mouseWheel(event) {
  print(event.delta);

  if (event.delta > 0) imgSize += 50;
  else if (event.delta < 0 && imgSize > 50) imgSize -= 50;
  //move the square according to the vertical scroll amount
  //pos += event.delta;
  //print(pos);
  //uncomment to block page scrolling
  return false;
}






