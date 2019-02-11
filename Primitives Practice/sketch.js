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
let count = 0;
let cSize = 20;
let choice = 1;
let type = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  c = color(random(255), random(255), random(255));
  rectMode(CENTER);
}

function draw() {
  background(220);
  print(x.length);
  for (let i = 0; i < x.length; i++) {
    fill(col[i]);
    if (type[i] === 1) {
      rect(x[i], y[i], s[i], s[i]);
    }
    if (type[i] === 2) {
      ellipse(x[i], y[i], s[i], s[i]);
    }

  }
  fill(c, 100);
  if (choice === 1) {
    rect(mouseX, mouseY, rSize, rSize);
  }
  else if (choice === 2) {
    ellipse(mouseX, mouseY, rSize, rSize);
  }
  else if (choice === 3) {
    triangle(mouseX, mouseY, mouseX+15, mouseY-25, mouseX+30, mouseY);
  }
  name();
  circles();
}

function mouseClicked() {
  x.push(mouseX);
  y.push(mouseY);
  s.push(rSize);
  type.push(choice);
  col.push(c);
  c = color(random(255), random(255), random(255));
  //curC = color(int(random(255)),int(random(255)),int(random(255)));
}

function keyPressed() {
  fill(random(255), random(255), random(255));
  if (key === "a") {
    //rect(mouseX, mouseY, rSize, rSize);
    choice = 1;
  }

  if (key === "x") {
    //ellipse(mouseX, mouseY, rSize, rSize);
    choice = 2;
  }
  if (key === "c") {
    //triangle(mouseX, mouseY, mouseX+15, mouseY-25, mouseX+30, mouseY);
    choice = 3;
  }
  if (key === " ") {
    background(250);
  }
  if (keyCode === UP_ARROW) {
    rSize += 10;
  }
  else if (keyCode === DOWN_ARROW) {
    rSize -= 10;
  }



}

function name() {
  fill(180, 50, 130);
  textFont('calibri', 30);
  text("Mr. Scott", width * .75, height * .45);


}

function circles() {
  print(count);
  if (count < 60) {
    fill(255, 50, 80);
  }
  else if (count === 60) {
    cSize = 20;
  }
  else if (count < 120) {
    fill(50, 140, 95);
  }
  else {
    cSize = 20;
    count = 0;
  }

  ellipse(200, 200, cSize, cSize);
  cSize += 2;
  count++;
}
