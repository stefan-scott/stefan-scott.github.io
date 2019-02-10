// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let rSize = 30;
let x = [];
let y = [];
let s = [];
let col = [];
let c;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  c = color(random(255),random(255),random(255));
}

function draw() {
  background(220);
  print(x.length);
  for(let i = 0; i < x.length; i++){
    fill(col[i]);
    rect(x[i],y[i],s[i], s[i]);
  }
  fill (c);
  rect(mouseX, mouseY, rSize, rSize);
}

function mouseClicked(){
  x.push(mouseX);
  y.push(mouseY);
  s.push(rSize);
  col.push(c);
  c = color(random(255),random(255),random(255));
  //curC = color(int(random(255)),int(random(255)),int(random(255)));
}

function keyPressed(){
  if (key === "a"){
      rect(mouseX, mouseY, rSize, rSize);
  }

  if (key === "x"){
    ellipse(mouseX, mouseY, rSize, rSize);
}if (key === "b"){
  rSize += 10;
}


  
}
