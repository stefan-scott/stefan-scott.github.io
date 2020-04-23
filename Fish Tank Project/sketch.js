// Fish Aquarium Project
let testFish;

const BG_SLICE_HEIGHT = 10;
let topColor;
let bottomColor;

const CANVAS_SCALE = 0.4; //use to scale decorations to other sizes of Canvas

let sandSpots = [];
let tankDecorations = [];

function preload() {
  tankDecorations.push(loadImage("assets/tank coral 01.png"));
  tankDecorations.push(loadImage("assets/tank plant 01.png"));
  tankDecorations.push(loadImage("assets/tank rocks 01.png"));
  tankDecorations.push(loadImage("assets/tank rocks 02.png"));
  tankDecorations.push(loadImage("assets/tank ship 01.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  testFish = new ScottSFish(100);
  topColor = color(100, 154, 245);
  bottomColor = color(43, 74, 200);
  initSandSpots();
}

function draw() {
  //background(50);
  drawTank();
  testFish.move();
  testFish.display();

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
    this.y = random(height * 0.35, width * 0.75);
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
      if (random(200) < 5) {
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



