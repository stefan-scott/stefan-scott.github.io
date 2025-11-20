// CANNON

class Cannon {
  constructor(x, y, direction) { //pretty self-explanatory variables
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.forcedownY = 0; //  gravity
    this.dropSpeed = 0.1; // <
    this.drop = true; //      <
    this.touchingGround = false;
    this.healthAmount = 5;

    //hitbox
    this.cannonLeftSide;
    this.cannonRightSide;
    this.cannonTop;
    this.cannonBase;
  }
  display() {
    noStroke();
    fill(31, 26, 26);
    //cannon barrel
    //player 2
    rectMode(CENTER);
    if (this.x > windowWidth / 2) {
      //rotating the cannon
      push();
      translate(this.x, this.y);
      rotate(this.direction);
      rect(25, 0, 70, 20);
      pop();
    }
    //player 1
    else {
      push();
      translate(this.x, this.y); //rotation
      rotate(this.direction);
      rect(-25, 0, 70, 20);
      pop();
    }
    fill(31, 26, 26);
    //cannon head
    circle(this.x, this.y, 50);
    rectMode(CENTER);
    //wheels - optional
    fill(0);

    //cannon base
    fill(122, 63, 0);
    rect(this.x, this.y + 25, 70, 20);
    //making it drop\\
    if (this.drop === false) {
      this.forcedownY = 0;
    }
    if (this.drop === true) {
      this.y += this.forcedownY; //adding gravity to the Y position
      this.forcedownY = this.forcedownY + this.dropSpeed; //making the force generate overtime
    }

    //health bar
    fill(3, 252, 32);
    if (this.healthAmount === 1) { circle(this.x - 50, this.y - 50, 20); } //1 HEALTH
    if (this.healthAmount === 2) { circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //2 HEALTH
    if (this.healthAmount === 3) { circle(this.x, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //3 HEALTH
    if (this.healthAmount === 4) { circle(this.x + 25, this.y - 50, 20); circle(this.x, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); } //4 HEALTH
    if (this.healthAmount === 5) { circle(this.x + 50, this.y - 50, 20); circle(this.x + 25, this.y - 50, 20); circle(this.x, this.y - 50, 20); circle(this.x - 50, this.y - 50, 20); circle(this.x - 25, this.y - 50, 20); }  //5 HEALTH

    //hitbox
    this.cannonLeftSide = this.x - 35;
    this.cannonRightSide = this.x + 35;
    this.cannonTop = this.y - 25;
    this.cannonBase = this.y + 35;
  }

}

