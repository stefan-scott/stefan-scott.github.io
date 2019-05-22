// Particle Systems
let pArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  pArray.push(new Particle(mouseX, mouseY));
  for (let i = 0; i < pArray.length; i++){
    pArray[i].move();
    pArray[i].display();  
    if (pArray[i].isAlive() === false){
      pArray.splice(i,1);
      i--;  
    }
  }
}

function mouseClicked(){
  
}

class Particle{
  constructor(x_, y_){
    this.x = x_;
    this.y = y_;
    this.c = color(random(255),random(255),random(255));
    this.size = random(10,30);
    this.ySpeed = random(-1,1);
    this.xSpeed = random(-1,1);
    this.lifetime = int(random(40,100));
  }

  move(){
    this.lifetime -= 1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  isAlive(){
    if (this.lifetime > 0) return true;
    else return false;
  }

  display(){
    ellipseMode(CENTER);
    fill(this.c);
    ellipse(this.x,this.y,this.size,this.size);
  }

}
