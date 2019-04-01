let walkers = [];
const NUM_WALKERS = 400;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM_WALKERS; i++){
    walkers.push(new Walker(random(width), random(height)));
  }
}

function draw() {
  //background(220);
  for (let i = 0; i < NUM_WALKERS; i++){
    if(walkers[i].movementType===0){
          walkers[i].movePerlin();
    }
    else{
      walkers[i].move();
    }
          walkers[i].display();
  }
}


class Walker{
  //Constructor and Class Properties
  constructor(x_, y_){
    this.movementType = Math.floor(random(2));
    this.x = x_;
    this.y = y_;
    this.c = color(random(255),random(255),random(255),150);
    this.speed = random(1,10);
    this.size = random(5,15);
    this.xOff = random(200);
    this.yOff = random(200);
  }
  //Class Methods
  display(){
    rectMode(CENTER);
    fill(this.c);
    rect(this.x, this.y, this.size, this.size);
  }

  move(){
    let myChoice = Math.floor(random(4));
    print(myChoice);
    if (myChoice === 0){ //RIGHT
      this.x += this.speed;
    }
    else if (myChoice === 1){ //LEFT
      this.x -= this.speed;
    }
    else if (myChoice === 2){ //UP
      this.y -= this.speed;
    }
    else{ //DOWN
      this.y += this.speed;
    }
  }

  movePerlin(){
    this.x += map(noise(this.xOff), 0, 1, -this.speed, this.speed);
    this.y += map(noise(this.yOff), 0, 1, -this.speed, this.speed);
    this.xOff += 0.02;
    this.yOff += 0.02;
  }

}


