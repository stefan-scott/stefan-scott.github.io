let myWalker;
function setup() {
  createCanvas(windowWidth, windowHeight);
  myWalker = new Walker(width/2, height/2);
}

function draw() {
  //background(220);
  myWalker.move();
  myWalker.display();
}


class Walker{
  //Constructor and Class Properties
  constructor(x_, y_){
    this.x = x_;
    this.y = y_;
    this.c = color(random(255),random(255),random(255));
    this.speed = 10;
    this.size = 5;
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


}


