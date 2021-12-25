// Arduino 16x16 LED Code Creator
// Stefan Scott
// Feb 2020
//
// To help with creating animations to ultimately be displayed using an
// arduino and 256 WS2812 Addressable RGB LEDs.
//
// Program provides basic drawing/animation playback ability. Works-in-progress
// can be saved and loaded. Once an animation is ready to export, that capability
// will generate a INO arduino file to interpret all the frame of animation
// (Generated code is based off of provided source at: https://www.brainy-bits.com/arduino-16x16-matrix-frame/)
//
// The playback speed chosen in the browser will match the playback speed on the Arduino.
//
// Painting interaction is done with the mouse. Several key bindings are used as well (copy-paste frames, start playback,
// playback speed, sample color, save editable file, export final)

let currentPixelX = 0;
let currentPixelY = 0;
let PIXEL_SIZE;
let paletteX, paletteY;

let cur;
let currentR = 255;  //presently selected painting color
let currentG = 255;
let currentB = 255;

let animFrames = [];
let currentFrame = 0;
let NUM_FRAMES = 4; //Ended up adding two buttons to add/remove frames once the program is running.

let historyFrames = []; //to store the history for each frame
const MAX_HISTORY_ACTIONS = 50;  //number of history items to store for each frame
let currentlyPainting = false; //boolean to track when a painting action is complete (for history purposes);
let controlPressed = false;
let zPressed = false; //state variables for CONTROL-Z combination


let playback = false; //boolean to toggle if animation is being displayed or not
let animationSpeed = 30;  //change images every 30 frames

let clipboard;
let brightnessSlider;
let newFrameButton = false;
let removeFrameButton = false;

let authorID;   //a random ID number to better facilitate merging ino files later on; should allow the array names to not overlap, 
//unless we are particularly unlucky.

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  PIXEL_SIZE = width * .03;    //commmit 48% of screen width to image
  paletteX = PIXEL_SIZE * 16.5;
  paletteY = 0;
  stroke(255);
  authorID = int(random(5000));

  for (let i = 0; i < NUM_FRAMES; i++) {
    animFrames.push(new Frame);
    historyFrames.push([]); //create an array for each frame's history to hold snapshots of the Canvas
    historyFrames[i].push(new Frame());
  }
  clipboard = new Frame();
  c.drop(handleFile);
  brightnessSlider = new Slider(width * .8, height * .14, height * .25);
}

function handleFile(file) {
  //First, parse through all the text and store in an array
  let pixelData = [];
  if (file.type === "text") {
    let word = "";
    for (let i = 0; i < file.data.length; i++) {
      if (file.data[i] !== "\n") {
        word += file.data[i];
      }
      else {//encountered
        //print(word);
        pixelData.push(word);
        word = "";
      }
    }
    //next, check first entry to see if it has "8bit savefile" marker
    if (pixelData[0] === "8bit savefile") {
      print("Correct file type detected");
      let imagesToLoad = int(pixelData[1]);
      animFrames = []; //erase old image info
      let counter = 2; //position in file info
      for (let i = 0; i < imagesToLoad; i++) {
        animFrames.push(new Frame());
        for (let y = 0; y < 16; y++) {
          for (let x = 0; x < 16; x++) {
            let r_ = int(pixelData[counter]);
            let g_ = int(pixelData[counter + 1]);
            let b_ = int(pixelData[counter + 2]);
            animFrames[i].pixelGrid[y][x].updateColor(r_, g_, b_);
            counter += 3;
          }
        }
      }

    }
    else {
      print("Error - unrecognized file info");
    }
  }
}

function recordAction() {
  let temp = new Frame();
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      let r_ = animFrames[currentFrame].pixelGrid[y][x].r;
      let g_ = animFrames[currentFrame].pixelGrid[y][x].g;
      let b_ = animFrames[currentFrame].pixelGrid[y][x].b;
      temp.pixelGrid[y][x].updateColor(r_, g_, b_);
    }
  }
  historyFrames[currentFrame].push(temp);
  //check if too many items are stored in that array, if so splice off the oldest one
  if (historyFrames[currentFrame].length > MAX_HISTORY_ACTIONS) {
    historyFrames[currentFrame].shift();  //remove oldest item and shift everything else left
  }
}

function undoAction() {
  if (historyFrames[currentFrame].length > 1) {  //only allow undo if there is something to undo in history
    historyFrames[currentFrame].pop();  //remove most recently stored frame
    for (let y = 0; y < 16; y++) {  //nested loop to restore what is now the most recently stored frame 
      for (let x = 0; x < 16; x++) {
        let r_ = historyFrames[currentFrame][historyFrames[currentFrame].length-1].pixelGrid[y][x].r;
        let g_ = historyFrames[currentFrame][historyFrames[currentFrame].length-1].pixelGrid[y][x].g;
        let b_ = historyFrames[currentFrame][historyFrames[currentFrame].length-1].pixelGrid[y][x].b;
        animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
    }
  }
}

function copyToClipboard() {
  //clipboard is a temporary 2D array to store one frame's worth of information,
  //to be pasted somewhere
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      let r_ = animFrames[currentFrame].pixelGrid[y][x].r;
      let g_ = animFrames[currentFrame].pixelGrid[y][x].g;
      let b_ = animFrames[currentFrame].pixelGrid[y][x].b;
      clipboard.pixelGrid[y][x].updateColor(r_, g_, b_);
    }
  }
}

function pasteClipboard() {
  //takes data from the clipboard and overwrites the current frame's pixel data
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      let r_ = clipboard.pixelGrid[y][x].r;
      let g_ = clipboard.pixelGrid[y][x].g;
      let b_ = clipboard.pixelGrid[y][x].b;
      animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
    }
  }
}

function drawGradient(x, y, stepSize) {
  //draws the Hue selection gradient for pen color
  noStroke();
  colorMode(HSB, 255);
  for (let i = 0; i < width * 0.25; i += stepSize) {
    for (let j = 0; j < height * 0.25; j += stepSize) {
      fill(brightnessSlider.val, map(i, 0, width * .25, 0, 255), (map(j, 0, height * .25, 0, 255))); //add V sliderw 
      rect(x + i, y + j, stepSize, stepSize);
    }
  }
  colorMode(RGB);


  //strokeWeight(4);
  rectMode(CENTER);
  fill(currentR, currentG, currentB);
  rect(width * .542, y + height * .355, width * .06, width * .06);  //make proportional size

  //make outer rectangle the hovered-over color
  noFill();
  strokeWeight(width * .02);
  let hover = get(mouseX, mouseY);
  stroke(red(hover), green(hover), blue(hover));
  rect(width * .542, y + height * .355, width * .065, width * .065);
  rectMode(CORNER);
  stroke(120);
  strokeWeight(1);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  PIXEL_SIZE = width * .03;  //update image grid

  paletteX = PIXEL_SIZE * 16.5;  //update color picker location
  paletteY = 0;

  brightnessSlider.x = width * .8;  //RESIZE SLIDER
  brightnessSlider.h = height * .25
}

function keyPressed() {  //not mixing key and keyCode, as I believe both will have 

  if (playback) {
    if (keyCode === 32) { //space
      playback = !playback;
    }
    else if (keyCode === 87) { //W   - increase animation speed
      print("W");
      if (animationSpeed > 5) animationSpeed -= 3;
    }
    else if (keyCode === 83) { //S
      if (animationSpeed < 60) animationSpeed += 3;
    }
  }
  else {

    if (keyCode === 32) { //space
      playback = !playback;
    }
    else if (keyCode === 90) { //Z
      zPressed = true;
    }
    else if (keyCode === CONTROL) {
      controlPressed = true;
    }
    else if (keyCode === 65) {  //a        some contents regardless of what was pressed most recently
      if (currentFrame > 0) currentFrame--;
    }
    else if (keyCode === 68) { //d
      if (currentFrame < NUM_FRAMES - 1) currentFrame++;
    }
    else if (keyCode === 32) { //space
      playback = !playback;
    }

    else if (keyCode === 85) {  //U -> save file
      saveWIP();
    }
    else if (keyCode === 67) {  //C -> copy current frame
      copyToClipboard();
    }
    else if (keyCode === 66) { //B -> paste clipboard to frame
      pasteClipboard();
    }
    else if (keyCode === 69) {  //E -> export INO file
      exportINO();
    }
    else if (keyCode === 88) { //x -> sample color
      cur = get(mouseX, mouseY);
      currentR = red(cur);
      currentG = green(cur);
      currentB = blue(cur);
    }
    else if (keyCode === LEFT_ARROW) {
      shiftImage(LEFT_ARROW);
    }
    else if (keyCode === RIGHT_ARROW) {
      shiftImage(RIGHT_ARROW);
    }
    else if (keyCode === UP_ARROW) {
      shiftImage(UP_ARROW);
    }
    else if (keyCode === DOWN_ARROW) {
      shiftImage(DOWN_ARROW);
    }
    if (zPressed && controlPressed) {
      zPressed = false;
      //controlPressed = false;
      undoAction();
      print("UNDO");
    }
  }
  print(animationSpeed);
}

function keyReleased() {
  if (keyCode === CONTROL) {
    controlPressed = false;
  }
}

function locateCurrentPixel() {
  currentPixelX = floor(mouseX / (PIXEL_SIZE));
  currentPixelY = floor(mouseY / (PIXEL_SIZE));

  if (currentPixelX < 0) currentPixelX = 0;
  if (currentPixelY < 0) currentPixelY = 0;

  if (currentPixelY <= 15 && currentPixelX <= 15) {
    strokeWeight(3);
    noFill();
    rect(PIXEL_SIZE * currentPixelX, PIXEL_SIZE * currentPixelY, PIXEL_SIZE, PIXEL_SIZE);
    strokeWeight(1);
  }
  //print(currentPixelX, currentPixelY);
}

function textInfo() {
  stroke(255);
  textSize(20);
  fill(0);
  text("Frame: " + (currentFrame + 1) + "/" + NUM_FRAMES, width * .5, height * .5);
  textSize(height * .025);
  text("A / D → Change current Frame (Backward/Forward)", width * .5, height * .58);
  text("SPACE → Toggle Animation Preview", width * .5, height * .63);
  text("S / W → Change Animation Speed (Only During Preview)", width * .5, height * .68);
  text("ARROW KEYS → Shift Current Frame", width * .5, height * .73);
  text("C / B → Copy Current Frame / Paste Current Frame", width * .5, height * .78);
  text("U → Save a WIP file.  To load drag file only editor window", width * .5, height * .83);
  text("E → Export Animation to Arduino Code", width * .5, height * .88);
  text("X → Sample Existing Color for Brush (mouseOver color), ", width * .5, height * .93)
  text("CONTROL-Z → Undo (up to 50 actions per frame) ", width * .5, height * .98)


}

function addRemoveFrames() {

  //Add Frame Button
  stroke(255);
  textSize(12);
  rectMode(CENTER);
  if (mouseX >= width * .5 + 135 && mouseX <= width * .5 + 225 && mouseY >= height * .5 - 20 && mouseY <= height * .5 + 10) {
    fill(0, 50, 190);
    if (mouseIsPressed) {
      newFrameButton = true;
      fill(0, 50, 255);
    }
    if (newFrameButton === true) {
      if (!mouseIsPressed) {
        newFrameButton = false;
        animFrames.push(new Frame);
        historyFrames.push([]); //create an array for each frame's history to hold snapshots of the Canvas
        historyFrames[historyFrames.length-1].push(new Frame());
        NUM_FRAMES++;
      }
    }
    rect(width * .5 + 180, height * .5 - 5, 90, 30);
    fill(255);
    noStroke();
    text("Add a frame", width * .5 + 150, height * .5);

  }
  else {
    noFill();
    rect(width * .5 + 180, height * .5 - 5, 90, 30);
    fill(0);
    text("Add a frame", width * .5 + 150, height * .5);
  }
  rectMode(CORNER);

  //Remove Frame Button
  stroke(255);
  textSize(12);
  rectMode(CENTER);
  //print(mouseX) - width * 1;
  if (mouseX >= width * .5 + 255 && mouseX <= width * .5 + 408 && mouseY >= height * .5 - 20 && mouseY <= height * .5 + 10) {
    fill(0, 50, 190);
    if (mouseIsPressed) {
      removeFrameButton = true;
      fill(0, 50, 255);
    }
    if (removeFrameButton === true) {
      if (!mouseIsPressed) {
        if (NUM_FRAMES > 1) {
          removeFrameButton = false;
          animFrames.splice(currentFrame, 1);  //remove the current frame
          historyFrames.splice(currentFrame, 1);
          if (currentFrame > 1) currentFrame--;
          NUM_FRAMES--;
        }

      }
    }
    rect(width * .5 + 330, height * .5 - 5, 150, 30);
    fill(255);
    noStroke();
    text("Remove Current Frame", width * .5 + 270, height * .5);

  }
  else {
    noFill();
    rect(width * .5 + 330, height * .5 - 5, 150, 30);
    fill(0);
    text("Remove Current Frame", width * .5 + 270, height * .5);
  }
  rectMode(CORNER);
}

function draw() {
  background(220);
  textInfo();
  addRemoveFrames();
  //drawRGBColors();
  brightnessSlider.run();
  drawGradient(width * .5, height * .02, 10);
  if (!playback) {
    locateCurrentPixel();
    animFrames[currentFrame].drawOperations();
  }
  else {
    animFrames[currentFrame].renderPixels();
    if (frameCount % animationSpeed === 0) {
      currentFrame++;
      if (currentFrame > NUM_FRAMES - 1) currentFrame = 0;
    }
  }




}


class Frame {


  constructor() {

    this.pixelGrid = [];
    this.createEmptyImage();
  }

  createEmptyImage() {
    for (let i = 0; i < 16; i++) {
      this.pixelGrid.push([]);  //add a new row
      for (let j = 0; j < 16; j++) { //for each row, add 16 pixel objects
        this.pixelGrid[i].push(new Pixel(i, j));
      }
    }
  }



  mouseEvent() {
    //to Do: Track Changes to add an undo feature.
    if (mouseIsPressed) {
      currentlyPainting = true;
      if (currentPixelY <= 15 && currentPixelX <= 15) {  //cursor in the drawing area
        this.pixelGrid[currentPixelY][currentPixelX].updateColor(currentR, currentG, currentB);
        print("draw");
      }
      else if (mouseX >= width * .5 && mouseX < width * .75 && mouseY <= height * .5) {

        cur = get(mouseX, mouseY);
        print("set color: ", currentPixelX, currentPixelY, red(cur));
        currentR = red(cur);
        currentG = green(cur);
        currentB = blue(cur);
      }
    }
    else {
      if (currentlyPainting) {
        recordAction();
        currentlyPainting = false;
        print(historyFrames[currentFrame]);
      }
    }
  }

  renderPixels() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        fill(this.pixelGrid[y][x].r, this.pixelGrid[y][x].g, this.pixelGrid[y][x].b);
        rect(PIXEL_SIZE * x, PIXEL_SIZE * y, PIXEL_SIZE, PIXEL_SIZE);
      }
    }
  }

  drawOperations() {
    this.renderPixels();
    this.mouseEvent();
  }

}

class Pixel {
  //constructor
  constructor(x_, y_) {
    this.x = x_;   //pixel GRID position (not absolute pixel location on screen)
    this.y = y_;
    this.r = 0;  //initialize pixel to white
    this.g = 0;
    this.b = 0;
  }
  //class methods
  updateColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
}



class Slider {
  constructor(x_, y_, h_) {
    this.x = x_;
    this.y = y_;
    this.h = h_;
    this.val = 128
    this.position = map(this.val, 0, 255, 0, this.h);
    this.dragged = false;
  }

  run() {
    this.draggable();
    this.display();
  }

  display() {

    //display sliderbar first
    rectMode(CENTER);
    colorMode(HSB, 255);
    noStroke();

    for (let y_ = this.y - this.h / 2; y_ < this.y + this.h / 2; y_++) {
      fill(map(y_, this.y - this.h / 2, this.y + this.h / 2, 255, 0), 255, 255);
      rect(this.x, y_, 10, 1);
    }
    colorMode(RGB);
    noFill();
    stroke(120);
    rect(this.x, this.y, 10, this.h);




    //display the movable slider next
    if (mouseX >= this.x - 10 && mouseX <= this.x + 10 && mouseY >= this.position - 5 && mouseY <= this.position + 5) {
      strokeWeight(3);
      fill(160);
      rect(this.x, this.position, 25, 13);
    }
    else {
      strokeWeight(2);
      fill(240);
      rect(this.x, this.position, 20, 10);
    }

    rectMode(CORNER);
  }

  draggable() {
    if (mouseX >= this.x - 10 && mouseX <= this.x + 10 && mouseY >= this.position - 5 && mouseY <= this.position + 5) {
      if (mouseIsPressed) {
        this.dragged = true;
      }
    }
    if (this.dragged === true) {
      this.position = constrain(mouseY, this.y - this.h / 2, this.y + this.h / 2);
      this.val = map(this.position, this.y - this.h / 2, this.y + this.h / 2, 255, 0);
      print(this.val);
      if (!mouseIsPressed) {
        this.dragged = false;
      }
    }
    else if (mouseIsPressed && this.dragged === false && mouseX >= this.x - 10 && mouseX <= this.x + 10 && mouseY >= this.y - this.h / 2 && mouseY <= this.y + this.h / 2) {
      //clicking on the bar, but not the slider
      this.dragged = true;
    }

  }


}

function loadWIP() {
  //load a previously worked on animation

}

function saveWIP() {
  //save the individual images in a file to allow for loading them later
  let saveData = [];
  saveData.push("8bit savefile");  //marker to look for on load
  saveData.push(NUM_FRAMES);  //number of images
  for (let i = 0; i < NUM_FRAMES; i++) { //once for each image
    for (let y = 0; y < 16; y++) { //always 16 rows
      for (let x = 0; x < 16; x++) {  //for each pixel, we'll write the RGB each on a separate line
        saveData.push(animFrames[i].pixelGrid[y][x].r);
        saveData.push(animFrames[i].pixelGrid[y][x].g);
        saveData.push(animFrames[i].pixelGrid[y][x].b);
      }
    }
  }
  print("trying to save");
  saveStrings(saveData, "animation.txt");

}

function shiftImage(dir) {
  if (dir === LEFT_ARROW) {
    for (let y = 0; y < 16; y++) {
      let oR = animFrames[currentFrame].pixelGrid[y][0].r;
      let oG = animFrames[currentFrame].pixelGrid[y][0].g;
      let oB = animFrames[currentFrame].pixelGrid[y][0].b;
      for (let x = 0; x < 15; x++) {
        let r_ = animFrames[currentFrame].pixelGrid[y][x + 1].r;
        let g_ = animFrames[currentFrame].pixelGrid[y][x + 1].g;
        let b_ = animFrames[currentFrame].pixelGrid[y][x + 1].b;
        animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
      animFrames[currentFrame].pixelGrid[y][15].updateColor(oR, oG, oB);
    }
  }
  if (dir === RIGHT_ARROW) {
    for (let y = 0; y < 16; y++) {
      let oR = animFrames[currentFrame].pixelGrid[y][15].r;
      let oG = animFrames[currentFrame].pixelGrid[y][15].g;
      let oB = animFrames[currentFrame].pixelGrid[y][15].b;
      for (let x = 15; x > 0; x--) {
        let r_ = animFrames[currentFrame].pixelGrid[y][x - 1].r;
        let g_ = animFrames[currentFrame].pixelGrid[y][x - 1].g;
        let b_ = animFrames[currentFrame].pixelGrid[y][x - 1].b;
        animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
      animFrames[currentFrame].pixelGrid[y][0].updateColor(oR, oG, oB);
    }
  }
  if (dir === UP_ARROW) {
    for (let x = 0; x < 16; x++) {
      let oR = animFrames[currentFrame].pixelGrid[0][x].r;
      let oG = animFrames[currentFrame].pixelGrid[0][x].g;
      let oB = animFrames[currentFrame].pixelGrid[0][x].b;
      for (let y = 0; y < 15; y++) {
        let r_ = animFrames[currentFrame].pixelGrid[y + 1][x].r;
        let g_ = animFrames[currentFrame].pixelGrid[y + 1][x].g;
        let b_ = animFrames[currentFrame].pixelGrid[y + 1][x].b;
        animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
      animFrames[currentFrame].pixelGrid[15][x].updateColor(oR, oG, oB);
    }
  }
  if (dir === DOWN_ARROW) {
    for (let x = 0; x < 16; x++) {
      let oR = animFrames[currentFrame].pixelGrid[15][x].r;
      let oG = animFrames[currentFrame].pixelGrid[15][x].g;
      let oB = animFrames[currentFrame].pixelGrid[15][x].b;
      for (let y = 15; y > 0; y--) {
        let r_ = animFrames[currentFrame].pixelGrid[y - 1][x].r;
        let g_ = animFrames[currentFrame].pixelGrid[y - 1][x].g;
        let b_ = animFrames[currentFrame].pixelGrid[y - 1][x].b;
        animFrames[currentFrame].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
      animFrames[currentFrame].pixelGrid[0][x].updateColor(oR, oG, oB);
    }
  }


}

function exportINO() {
  //direction of LED rows switches with even/odd, so first re-copy image data into a new 2D array:
  let exportFrames = [];
  for (let i = 0; i < NUM_FRAMES; i++) {
    exportFrames.push(new Frame);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        let r_, g_, b_;
        if (y % 2 === 0) {  //even row - copy into same places?
          r_ = animFrames[i].pixelGrid[y][x].r;
          g_ = animFrames[i].pixelGrid[y][x].g;
          b_ = animFrames[i].pixelGrid[y][x].b;
        }
        else {   //odd row, flip horizontal positions
          r_ = animFrames[i].pixelGrid[y][15 - x].r;
          g_ = animFrames[i].pixelGrid[y][15 - x].g;
          b_ = animFrames[i].pixelGrid[y][15 - x].b;
        }
        exportFrames[i].pixelGrid[y][x].updateColor(r_, g_, b_);
      }
    }

  }







  //generate an INO file to drive the animation on the Arduino LED grid 
  let saveData = [];
  saveData.push("#include <avr/pgmspace.h>\n#include \"FastLED.h\"\n#define NUM_LEDS 256\n#define DATA_PIN 3\nCRGB leds[NUM_LEDS];");

  for (let i = 0; i < NUM_FRAMES; i++) {  //change to loop over each frame after testing one
    saveData.push("const long animFrame" + authorID + i + "[] PROGMEM =\n{")
    line = "";
    for (let y = 0; y < 16; y++) {
      if (y % 2 === 0) {
        for (let x = 0; x < 16; x++) {
          line += ("0x" + hex(animFrames[i].pixelGrid[y][x].r, 2) + hex(animFrames[i].pixelGrid[y][x].g, 2) + hex(animFrames[i].pixelGrid[y][x].b, 2) + ", ");
        }
      }
      else {
        for (let x = 0; x < 16; x++) {
          line += ("0x" + hex(animFrames[i].pixelGrid[y][15 - x].r, 2) + hex(animFrames[i].pixelGrid[y][15 - x].g, 2) + hex(animFrames[i].pixelGrid[y][15 - x].b, 2) + ", ");
        }
      }

      line += "\n";
    }
    line = line.substring(0, line.length - 3); //strip out trailing comma
    line += "\n};"
    saveData.push(line);
  }
  //setup function
  saveData.push("void setup() { \nFastLED.addLeds<NEOPIXEL,DATA_PIN>(leds, NUM_LEDS);\nFastLED.setBrightness(15);\n}");
  //loop function
  saveData.push("void loop() {");
  //load and display each set of LEDs
  for (let i = 0; i < NUM_FRAMES; i++) {
    saveData.push("FastLED.clear();\nfor(int i = 0; i < NUM_LEDS; i++) {\nleds[i] = pgm_read_dword(&(animFrame" + authorID + i + "[i]));\n}\n\nFastLED.show();\ndelay(" + (animationSpeed / 60 * 1000) + ");\n");
  }
  saveData.push("}");


  saveStrings(saveData, "outputAnimation", "ino");  //automatically adds 'txt' ... work on this later
}