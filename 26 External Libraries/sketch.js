let scribble; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  scribble = new Scribble();
}

function draw() {
  background(220);
  randomSeed(0);
  let x = [mouseX - 100, mouseX + 100, mouseX + 100, mouseX - 100];
  let y = [mouseY - 100, mouseY - 100, mouseY + 100, mouseY + 100];
  scribble.scribbleFilling(x,y,4,40);
  scribble.scribbleRoundedRect(mouseX,mouseY,200,200,10);
  
}
