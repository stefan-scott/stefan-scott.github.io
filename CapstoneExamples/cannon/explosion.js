//eXPLOSION
class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.opacity = 200;
  }
  display() { //explosion is just a circle that fades out
    fill(252, 84, 0, this.opacity);
    circle(this.x, this.y, 100);
    this.opacity -= 5;
  }
}