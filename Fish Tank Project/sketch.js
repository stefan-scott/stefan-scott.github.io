// Fish Aquarium Project
let testFish;

const BG_SLICE_HEIGHT = 10;
let topColor;
let bottomColor;

const CANVAS_SCALE = 0.3; //use to scale decorations to other sizes of Canvas

let sandSpots = [];
let tankDecorations = [];

let fishCollection = [];

function preload() {
  tankDecorations.push(loadImage("assets/tank coral 01.png"));
  tankDecorations.push(loadImage("assets/tank plant 01.png"));
  tankDecorations.push(loadImage("assets/tank rocks 01.png"));
  tankDecorations.push(loadImage("assets/tank rocks 02.png"));
  tankDecorations.push(loadImage("assets/tank ship 01.png"));
}

function setup() {
  createCanvas(800, 500);
  fishCollection.push(new ScottSFish(100));
  fishCollection.push(new ThomasSFish(45));
  fishCollection.push(new ThomasSFish(30));
  fishCollection.push(new JordanCFish(75));
  topColor = color(100, 154, 245);
  bottomColor = color(43, 74, 200);
  initSandSpots();
}

function draw() {
  //background(50);
  drawTank();
  for(let f of fishCollection){
    f.compare(fishCollection);
    f.move();
    f.display();
  }
  

  foregroundDecorations(); //should be last thing in draw()
}

//Function to render the background of the tank
function drawTank() {
  noStroke();
  //start with colored gradient for background
  for (let y = 0; y < height; y += BG_SLICE_HEIGHT) {
    fill(lerpColor(topColor, bottomColor, map(y, 0, height, 0, 1)));
    rect(0, y, width, y + BG_SLICE_HEIGHT);
  }

  //next, a sand bottom
  fill(220, 195, 100);
  rect(0, height * 0.8, width, height);
  stroke(170, 145, 80);
  strokeWeight(2);
  for (let i = 0; i < sandSpots.length; i++) {
    line(sandSpots[i][0], sandSpots[i][1], sandSpots[i][0] + 2, sandSpots[i][1]);
  }

  //add some decorations
  imageMode(CENTER);

  push(); //tall rock castle
  translate(width * 0.35, height * 0.50);
  scale(CANVAS_SCALE * 2);
  image(tankDecorations[2], 0, 0);
  pop();

  push(); //pirate ship
  translate(width * 0.74, height * 0.85);
  scale(CANVAS_SCALE * 2);
  image(tankDecorations[4], 0, 0);
  pop();
}

function foregroundDecorations() {
  //a function to move the draw order for a few tank decorations
  //until after the fish are drawn, so that these appear in the foreground
  push(); //coral
  translate(width * 0.13, height * 0.79);
  scale(CANVAS_SCALE * 1.5);
  image(tankDecorations[0], 0, 0);
  pop();

  push(); //plant
  translate(width * 0.92, height * 0.7);
  scale(CANVAS_SCALE * 2.5);
  image(tankDecorations[1], 0, 0);
  pop();
}

//function used to pre-generate sand grain spots, so the same random spots can be
//used each frame.
function initSandSpots() {
  for (let x = random(0, width * 0.01); x < width; x += random(1, 10)) {
    let y = random(height * 0.82, height * 0.98);
    sandSpots.push([x, y]);
  }
}

//just for testing different background gradients
function mouseClicked() {
  topColor = color(random(255), random(255), random(255));
  bottomColor = color(random(255), random(255), random(255));
}


/** A super class for animated objects 
    Make sure to implement your class AFTER this one */
class AnimatedObject {

  /** Location fields inherited by all subclass */
  constructor() {
    /* Constructor
     *  Note that your constructor should accept a single float specifying the size, which will overwrite the inherited default value 50
     *  In addition, your constructor should initialize x and y to a starting location where your creature will appear (either a random
     *  location or a predetermined fixed location)
     */

    //you can either use this.x and this.y   or  a vector(pos) to manage location
    this.x = random(width * 0.15, width * 0.85);
    this.y = random(height * 0.35, height * 0.75);
    this.pos = createVector(this.x, this.y);

    //As well, you can either use an xSpeed and ySpeed variable or a vel vector
    //to track movement velocity.
    this.xSpeed;
    this.ySpeed;
    this.vel;

    /** Size parameter inherited by subclass */
    this.size = 50;
  }

  /** Displays the object  */
  display() { }

  /** Advances the object's animation by one frame  */
  move() { }

  /** Optional Function:
   *  Parameter will store the array of all fish objects, which can be used
   *  for comparison if your fish's behavior should depend on proximity to
   *  other fish.
    */
  compare(objArr) { }

  /* Methods that provide access to class data fields 
     If you choose to use vectors, be sure to override
     the position and velocity functions to return this.pos.x and similar.
  */
  getX() { return this.x; }
  getY() { return this.y; }
  getSize() { return this.size; }
  getxSpeed() { return this.xSpeed; }
  getySpeed() { return this.ySpeed; }
}




/*****************************************
Define your Fish class below
please name according to this convention:
Lastname Firstinitial Fish
i.e  for Sebastion Tate:  class TateSFish
******************************************/
class scottSFishBubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = true;
    this.size = random(5, 12);
  }

  move() {
    this.y -= random(2);
    this.x += random(-1, 1);
    if (this.y < 0) {
      this.alive = false;
    }
  }

  display() {
    fill(255, 25);
    stroke(255);
    strokeWeight(2);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size, this.size);
  }

  isAlive() { return this.alive; }

}

class ScottSFish extends AnimatedObject {

  constructor(s) {
    super();
    //this.pos = createVector(random(width * 0.1, width * 0.9), random(height * 0.7, height * 0.3));
    this.size = s;
    this.bubbles = [];  //array to hold ScottSFishBubble objects
    this.bubbleCounter = 0;  //used to sequence creation of new ScottSFishBubble objects
    this.MAX_SPEED = 5;
    if (random(2) < 1) {  //pick initial movement either left or right
      this.vel = createVector(random(-this.MAX_SPEED, -this.MAX_SPEED / 2), random(-3, 3));
      this.dir = 0; //left
    }
    else {
      this.vel = createVector(random(this.MAX_SPEED / 2, this.MAX_SPEED), random(-3, 3));
      this.dir = 1; //right
    }

    this.amount = 0;   //to use with LERP for fish movement
    this.step = 0.005;
    this.zeroxVector = createVector(0, 0);
    this.imagesLoaded = 0;
    this.fishImages = [];
    this.fishImages.push(loadImage("assets/scottFishL.png", this.loadedImages()));
    this.fishImages.push(loadImage("assets/scottFishR.png", this.loadedImages()));
  }

  loadedImages() {
    this.imagesLoaded++;  //once this variable equals the total # of pictures, we know they are loaded.
  }
    
  move() {

    if (this.imagesLoaded === 2) {
      //move fish first
      //add a check about going off-screen. If so, pick new vel in opposite direction
      if (this.pos.y + this.vel.y > height*0.9) {  //if about to bump into sand
        this.vel.y *= -1;
      }
      else if (this.pos.y + this.vel.y < 0) { //if about to leave top of window
        this.vel.y *= -1;
      }
      if (this.pos.x + this.vel.x > width) {  //if about to leave right side of window
        this.vel.x *= -1;
        this.dir = 0;
      }
      else if (this.pos.x + this.vel.x < 0) { //if about to leave left side of window
        this.vel.x *= -1;
        this.dir = 1;
      }
      else {
        this.pos.add(this.vel);
        if (frameCount % 3 === 0) {
          if (this.amount < .3) {
            this.vel = p5.Vector.lerp(this.vel, this.zeroxVector, this.amount);
            this.amount += this.step;
          }
          else {  //pick new velocity vector and move
            if (random(2) < 1) {
              this.vel = createVector(random(-this.MAX_SPEED, -this.MAX_SPEED / 2), random(-3, 3));
              this.dir = 0; //left
            }
            else {
              this.vel = createVector(random(this.MAX_SPEED / 2, this.MAX_SPEED), random(-3, 3));
              this.dir = 1; //right
            }
            this.amount = 0;
          }
        }
      }
      //small chance to blow bubbles
      if (random(200) < 4) {
        this.bubbleCounter = int(random(30, 70));
      }
      if (this.bubbleCounter > 0) {
        if (this.bubbleCounter % 10 === 0) {
          if (this.dir === 1) { //facing right
            this.bubbles.push(new scottSFishBubble(this.pos.x + this.size/2, this.pos.y));
          }
          else { //facing left
            this.bubbles.push(new scottSFishBubble(this.pos.x - this.size/2, this.pos.y));
          }

        }
        this.bubbleCounter--;
      }
    }
  }

  display() {
    if (this.imagesLoaded === 2) {

      //display fish first
      // ellipseMode(CENTER);
      // fill(0, 255, 0);

      // ellipse(this.pos.x, this.pos.y, this.size * 2, this.size);
      if(this.dir===0){
        image(this.fishImages[0],this.pos.x,this.pos.y,this.size,this.size);
      }
      else{
        image(this.fishImages[1],this.pos.x,this.pos.y,this.size, this.size);
      }

      //display any bubble objects
      for (let i = this.bubbles.length - 1; i >= 0; i--) {
        this.bubbles[i].move();
        this.bubbles[i].display();
        if (this.bubbles[i].isAlive() === false) {
          this.bubbles.splice(i, 1);
        }
      }
    }
  }

  compare(objArr) {
    //

  }

}

class ThomasSFish extends AnimatedObject{
  
  constructor(size_) {
    
    super();

    this.sightRange = 75; // Range in pixels the fish will avoid other fish
    this.bubbleChance = 1; // Percent chance to blow a bubble each frame
    this.bubbleSize = 1.5; // Size of bubbles blown by this fish, relative to the fish's size
    this.bubbleRandomness = 0.67; // Decimal percent of the randomness of the bubbles' size
    this.friction = 1.03; // Speed at which the fish's velocity will slow
    this.minVel = 0.05;
    this.maxVel = 8;

    this.size = size_;
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(this.minVel, this.maxVel));
    this.bubbleArr = []; // Array of bubbles this fish has blown
  }

  display() {
    
    // Draws the fish to the screen
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noStroke();
    fill(27, 85, 76);
    ellipse(0, 0, this.size, this.size / 1.5);
    triangle(0, 0, -this.size / 1.4, this.size / 2, -this.size / 1.4, -this.size / 2);
    fill(0);
    ellipse(this.size / 2.5, 0, this.size / 5);
    pop();
  }
  
  move() {

    // Applies friction
    this.vel.x /= this.friction;
    this.vel.y /= this.friction;

    if (this.vel.mag() < this.minVel) {
      // Gives the fish a random velocity once it goes slower than its min velocity
      this.vel = p5.Vector.random2D();
      this.vel.setMag(random(this.minVel, this.maxVel));
    }

    // Makes the fish bounce off the window edges
    if (this.pos.x + this.vel.x - this.size / 2 < 0 || this.pos.x + this.vel.x + this.size / 2 > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y + this.vel.y - this.size / 2 < 0 || this.pos.y + this.vel.y + this.size / 2 > height) {
      this.vel.y *= -1;
    }
    
    this.pos.add(this.vel); // Updates the fishes' velocities

    // Code for bubbles
    this.blowBubble();
    this.updateBubbles();

  }
  
  blowBubble() {
    
    // Makes the fish have a chance to blow a bubble
    if (this.bubbleChance > int(random(0, 99))) {
      this.bubbleArr.push(new ThomasSFishBubble(this.pos.x, this.pos.y, this.vel.x, this.bubbleSize + random(-this.bubbleRandomness, this.bubbleRandomness), this));
    }
  }

  updateBubbles() {
    
    // Updates all bubbles related to this fish
    for (let i = this.bubbleArr.length - 1; i >= 0; i--) {
      this.bubbleArr[i].display();
      this.bubbleArr[i].move(i);
    }
  }

  compare(objArr) {
    
    // Compares this fish against all other fishes
    for (let j = 0; j < objArr.length; j++) {
      if (objArr[j] !== this) {
        if (sqrt(pow(this.pos.x - objArr[j].pos.x, 2) + pow(this.pos.y - objArr[j].pos.y, 2)) < this.sightRange + objArr[j].size) {
          // If the distance between the two fish is smaller than it's sight range, face away from it
          this.vel.rotate(-this.vel.heading() + Math.atan2(objArr[j].pos.y - this.pos.y, objArr[j].pos.x - this.pos.x) + radians(180));
        }
      }
    }
  }
}

class ThomasSFishBubble extends AnimatedObject {

  constructor(x_, y_, xVel, size_, parentFish_) {
    
    super();
    
    this.buoyancy = -4; // Speed the bubble will float up
    this.xVelFriction = 1.03; // Speed the bubble will slow it's initial x velocity

    this.pos = createVector(x_, y_);
    this.vel = createVector(xVel, this.buoyancy);
    this.parentFish = parentFish_;
    this.size = this.parentFish.size / size_;
  }

  display() {
    
    // Draws the bubble to the screen
    fill(0, 0);
    stroke(255, 255, 255);
    strokeWeight(1);
    ellipse(this.pos.x, this.pos.y, this.size / 2);
  }

  move(i) {
    
    this.pos.add(this.vel); // Updates the position
    this.vel.x = this.vel.x / this.xVelFriction; // Slows the x velocity by a little due to friction

    if (this.pos.y + this.size / 2 < 0) {
      // Deletes the bubble if it's above the screen
      this.parentFish.bubbleArr.splice(i, 1);
    }
  }
}

class JordanCFish extends AnimatedObject {

  constructor(s) {
    super();
    this.x = width / 2;
    this.y = height / 2;
    this.size = s;
    this.consS = s;//Acts as a constant of the inputted size
    this.loadCounter = 0;// counts that everything has loaded
    this.loadBool = false;
    //FISH VARIABLES
    this.fish = [];
    this.fish.push(loadImage("assets/FishyL.png", this.loadCheck()));
    this.fish.push(loadImage("assets/FishyR.png", this.loadCheck()));
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
    this.CV = 1; // Const for velocity
    this.CAcc = 0.1; // Constant for acceleration
    this.acc;
    this.dest = createVector(random(width), random(height));// creates a random destination
    this.direct = true;// direction
    this.action = false;//Displays when the size should grow based off of this.compare
    this.color;
    this.bub = [];
    this.ToDest = 5; // how close can the fish get to destination
  }

  // Ensures the fish image load before everything else
  loadCheck() {
    this.loadCounter++;
    if (this.loadCounter === 2) {
      this.loadBool = true;
    }
  }

  // Bubble function, creates a new bubble and erase and old one when it reaches it's destination
  bubbly() {
    this.bub.push(new JordanBubbles(this.pos.x, this.pos.y, this.consS));
    for (let i = 0; i < this.bub.length; i++) {
      this.bub[i].action();
      if (this.bub[i].isAlive() === false) {
        this.bub.splice(i, 1);
      }
    }
  }

  // Displays fishes
  display() {
    imageMode(CENTER);
    this.bubbly();
    let dir = 0; // 0-left 1 - 1-right
    if (this.loadBool) {// calculates the direction of the fish
      if (this.dest.x - this.pos.x > 0) {
        dir = 1;
      }
      if (this.dest.x - this.pos.x < 0) {
        dir = 0;
      }
      if (this.dest.x - this.pos.x === 0) {
        dir = 0;
      }

      if (this.action === false) {
        image(this.fish[dir], this.pos.x, this.pos.y, this.size, this.size);
      }
      if (this.action) {
        image(this.fish[dir], this.pos.x, this.pos.y, this.size, this.size);
        this.action = false;
      }

    }
  }

  /** Advances the object's animation by one frame  */
  move() {
    imageMode(CENTER);
    if (abs(this.pos.x - this.dest.x) > this.ToDest && abs(this.pos.y - this.dest.y) > this.ToDest) {// If the distance between the fish and its destination are within a certain num
      this.acc = p5.Vector.sub(this.dest, this.pos);
      this.acc.setMag(this.CAcc);
      this.vel.add(this.acc);
      this.vel.limit(this.CV);
      this.pos.add(this.vel);
    }
    else {// else pick a new destination
      if (this.direct) {// toggles the directions so fish swims both to left and right
        this.dest.set(int(random(width * 0.1, width / 2)), random(height * 0.80));
        while (p5.Vector.sub(this.dest, this.pos) < this.ToDest) {
          this.dest.set(int(random(width * 0.1, width / 2)), random(height * 0.80));
        }
        this.direct = false;
      }
      else if (this.direct === false) {
        this.dest.set(int(random(width / 2, width * 0.8)), random(height * 0.80));
        while (p5.Vector.sub(this.dest, this.pos) < this.ToDest) {
          this.dest.set(int(random(width / 2, width * 0.8)), random(height * 0.80));
        }
        this.direct = true;
      }
    }
  }

  //Compares the object to other fishes
  compare(objArr) {
    for (let i = 0; i < objArr.length; i++) {
      if (objArr[i] !== this) {// If close than compare the fish
        if (abs(objArr[i].getX() - this.pos.x) < this.ToDest*15 && abs(objArr[i].getY() - this.pos.y) < this.ToDest*15) {
          this.size = this.consS * 1.2;
        }
        else {
          this.size = this.consS;
        }
        this.action = true;
      }
    }
  }

  getX() {
    return this.pos.x;
  }
  getY() {
    return this.pos.y;
  }
  getSize() {
    return this.size;
  }
  getxSpeed() {
    return this.vel.x;
  }
  getySpeed() {
    return this.vel.y;
  }
}


class JordanBubbles {
  constructor(x, y, s) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(3));
    this.acc;
    this.s = s * 0.08;
    this.size = int(random(this.s, this.s * 2));
    this.alive = true;
    this.rand = int(random(15));
    this.CV = 1.5; //const for Velocity
    this.CA = 0.1; //const for acceleration
  }

  // boolean fo when to remove a bubble
  isAlive() {
    return this.alive;
  }

  display() {
    stroke(0, 100, 255);
    fill(0, 20, 255, 50);
    ellipse(this.pos.x, this.pos.y, this.size);
  }

  move() {
    let top = createVector(this.pos.x, -10);
    this.acc = p5.Vector.sub(top, this.pos);
    this.acc.setMag(this.CA);
    this.vel.add(this.acc);
    this.vel.limit(this.CV);
    this.pos.add(this.vel);
    if (this.pos.y - top.y < 0) {
      this.alive = false;
    }
  }

  action() {
    if (this.rand === 1) {
      this.move();
      this.display();
    }
  }
}
