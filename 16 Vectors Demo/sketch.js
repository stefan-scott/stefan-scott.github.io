// Vectors Demo

let m;
function setup() {
  createCanvas(windowWidth, windowHeight);
  m = new Mover(width/2,height/2);
}

function draw() {
  m.move();
  m.display();
}

class Mover{
  //constructor and properties
  constructor(x_, y_){
    this.size = 2;
    this.position = createVector(x_, y_);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.color = color(random(200,random(200),random(90),30));
  }
  move(){
    this.acceleration = p5.Vector.random2D().mult(2);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.velocity.limit(5);
    this.edges();
  }

  edges(){
    if(this.position.x < 0)this.position.x = width;
    if(this.position.x > width)this.position.x = 0;

    if(this.position.y < 0)this.position.y = height;
    if(this.position.y > height)this.position.y = 0;
  }

  display(){
    fill(this.color);
    ellipseMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    ellipse(0,0,this.size, this.size);
    pop();
  }
}



// let position;
// let velocity;
// let gravity;
// position = createVector(width/2, height/2);
//   velocity = createVector(random(-5,5),random(-5,-1)) ;
//   gravity = createVector(0,0.08);
//    push();
//   translate(width/2,height/2);
//   let mouse = createVector(mouseX,mouseY);
//   let center = createVector(width/2,height/2);

  

//   let towardsMouse = mouse.sub(center);
//   //towardsMouse.limit(100);
//   towardsMouse.normalize();
//   towardsMouse.mult(50);
//   line(0,0,towardsMouse.x, towardsMouse.y);
  
//   let m = towardsMouse.mag();
//   textSize(30);
//   text(m, 0, 50);
  
//   pop();

  
  // velocity.add(gravity);
  // position.add(velocity);
  // ellipse(position.x,position.y, 40,40);