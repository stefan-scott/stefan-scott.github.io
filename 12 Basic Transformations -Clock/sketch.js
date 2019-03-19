// Basic Transformations - Clock


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  push();
  translate(width/2, height/2);
  strokeWeight(3);
  ellipse(0,0,500,500);

  for (let i = 0 ; i < 360 ; i+= 6){
    push();
    rotate(radians(i));
    if (i % 30 === 0){
      //thick line
      strokeWeight(5);
      line(180,0,240,0);
    }
    else{
      //thin line
      strokeWeight(2);
      line(200,0,240,0);
    }
    
    pop();
  }
  //draw the hands!
  //the seconds hand
  push();
  rotate(radians(frameCount));
  strokeWeight(2);
  line(0,0,250,0);
  pop();

  push();
  strokeWeight(4);
  rotate(radians(frameCount/6));
  line(0,0,0,-150);
  pop();

  pop();

}
