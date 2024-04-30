let ocean;
let submarine;
let hookImage;
let hook;
let subX = 950;
let subY = 150;
let treasure;
let treasureOB;
let treasures = []
let trash;
let trashOB;
let trashs = []
let diamond;
let diamondOB;
let diamonds = []



function preload() {
  ocean = loadImage('assets/oceanjpg.jpg');
  submarine = loadImage('assets/submarine.png');
  hookImage = loadImage('assets/hook.png');
  treasure = loadImage('assets/Treasure.png');
  trash = loadImage('assets/Trash.png');
  diamond = loadImage('assets/Diamond.png');
}

function setup() {        
  createCanvas(windowWidth, windowHeight);
  hook = new Hook(950, 250);
  treasureOB = new Treasure(100, 100)
  for (let i = 0; i <6; i ++){
    treasures.push(new Treasure(random(width), random(250, 900)));
  }
  trashOB = new Trash(100, 100)
  for (let i = 0; i <7; i ++){
    trashs.push(new Trash(random(width), random(250, 900)));
  }
  diamondOB = new Diamond(100, 100)
  for (let i = 0; i <7; i ++){
    diamonds.push(new Diamond(random(width), random(250, 900)));
  }
}

function draw() {
  background(255);
  image(ocean, 0, 0, windowWidth, windowHeight);
  image(submarine, 800, -25, 300, 250);
  hook.move();
  hook.display();
  for (let i = 0; i < treasures.length; i++) {
    treasures[i].display();
}
  for (let i = 0; i < trashs.length; i++) {
    trashs[i].display();
}
  for (let i = 0; i < diamonds.length; i++) {
    diamonds[i].display();
}
}

class Treasure {
  constructor(x, y) {
    this.position = createVector(x, y);
    
  }
  display() {
    image(treasure, this.position.x, this.position.y, 80, 80);

    
  }
}

class Trash {
  constructor(x, y) {
    this.position = createVector(x, y);
    
  }
  display() {
    image(trash, this.position.x, this.position.y, 80, 80);

    
  }
}
class Diamond {
  constructor(x, y) {
    this.position = createVector(x, y);
    
  }
  display() {
    image(diamond, this.position.x, this.position.y, 80, 80);

    
  }
}
function keyTyped() {
  if (key === ' ') {
    hook.dive();
  }
}

class Hook {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.target = createVector(x, y);
    this.vel = createVector(0, 0);
    this.state = 0;
    this.size = 50;
    this.angle = 0;
  }
  dive(){
    this.state = 1;
    this.vel = p5.Vector.fromAngle(this.angle);
    this.vel.mult(5);
  }

  move() {
    if (this.state === 0) {

      this.angle = radians(map(sin(frameCount * 0.03), -1, 1, 0, 180));
      this.position.x = subX + cos(this.angle) * 100;
      this.position.y = subY + sin(this.angle) * 100;
    } else if (this.state === 1) {
      this.position.add(this.vel);
      if (this.position.y > windowHeight) {
        this.vel.mult(-1)
        this.state = 2;
      }
      if (this.position.x > windowWidth) {
        this.vel.mult(-1)
        this.state = 2;
      }
      if (this.position.x < 0) {
        this.vel.mult(-1)
        this.state = 2;
      }

    } else if (this.state === 2) {
      this.position.add(this.vel);

      if (dist(950, 250, this.position.x, this.position.y) < 150) {
        this.state = 0;
      }
      
      

    }
  }
  
  


  display() {
    line(subX, subY, this.position.x, this.position.y);
    imageMode(CENTER);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle + radians(270));
    image(hookImage, 0, 0, this.size, this.size);
    pop()
    imageMode(CORNER);
  }
}

