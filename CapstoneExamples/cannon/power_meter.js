//  POWER METER
class PowerMeter { //--adding a rate to know how fast the meter moves up. Depends on time variable
  constructor(x, y, rate) {
    this.x = x;
    this.y = y;
    //growing rate for the power meter
    this.rate = rate;
    //creating colours for the fire gauge
    this.fireGaugeRed = 255;
    this.fireGaugeGreen = 0;
    this.fireGaugeBlue = 0;
  }
  display() {
    //fire gauge
    fill(this.fireGaugeRed, this.fireGaugeGreen, this.fireGaugeBlue);
    rect(this.x, this.y, 30, this.rate);

    //changing gauge colours
    //fade from red to yellow
    if (this.fireGaugeRed >= 255) {
      this.fireGaugeGreen += 10;
    }
    //fade to green
    if (this.fireGaugeGreen >= 255) {
      this.fireGaugeRed -= 10;
    }
    //fade to cyan
    if (this.fireGaugeRed <= 0) {
      this.fireGaugeBlue += 10;
    }
    //fade to blue
    if (this.fireGaugeBlue >= 255) {
      this.fireGaugeGreen -= 10;
    }

    //makes the rectangle grow
    this.rate += 2;
  }
  emptyGauge() {
    //resets the power meter colours
    this.fireGaugeRed = 255;
    this.fireGaugeGreen = 0;
    this.fireGaugeBlue = 0;
  }

}