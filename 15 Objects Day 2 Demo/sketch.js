let ballObjects = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
  ballObjects.push( new Ball (mouseX, mouseY)  );
}

function draw() {
  background(220);
  for (let currentBall of ballObjects){
    currentBall.display();
  }
}

class Ball{
  //Constructor and Class Properties
  constructor(x_, y_){
    this.x = x_;
    this.y = y_;
    this.xSpeed = random(-5,5);
    this.ySpeed = random(-5,5);
    this.size = 30;
  }

  //Class Methods
  display(){
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
