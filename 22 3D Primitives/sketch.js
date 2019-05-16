// 3D primites and Fractal
let angle = 5;
let angleSpeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
}

function draw() {
  //angle = map(mouseX, 0, width, -120, 120);
  angle += angleSpeed;
  if(angle < -40 || angle > 40)angleSpeed *=-1;
  background(220);
  push();
  rotateY(radians(frameCount));
  for(let i = 0; i<360; i+= 45){
    push();
    rotateY(radians(i));
    boxes(70);
    pop();  
  }
  pop();
}

function boxes(size){
  if (size > 10){
    rotateZ(radians(angle)); 
    translate(size*1.5,0);
    box(size);
    
    boxes(size*0.8);
  }
}
