// Point and Click Horror Game!
// Miki Hoang
// June 11, 2026
// A surreal point and click game where players must solve a series of puzzles to escape an eerie, claustrophobic bathroom.


// ----------------------- GLOBAL VARIABLES --------------------------
let pixelFont;
let handCursor;
let keyCursor;

let menu;
let bathroom; // Master scene with all the puzzles
let scene = "menu"; // Determines the current scene

// MIRROR SCENE VARIABLES
let mirror = [];
let mirrorIndex = 0;
let mirrorText = [];
let faceLayer;
let hasFace = false;

// ROACH PUZZLE VARIABLES
let painting;
let painting2;
let paintingState = 0; // 0: Mr. Scott Portrait    1: Hole with roaches
let roach;
let roach2;
let spawnRoaches = [];


// WINDOW PUZZLE VARIABLES
let windowClosed;
let windowState = 0; // 0: Closed curtains    1: Opened curtains with monster and puzzle
let windowAni = [];
let windowIndex = 0;
let grid = [
  [255, 0, 0, 0, 0, 255],
  [255, 255, 255, 255, 0, 255],
  [255, 255, 255, 0, 255, 255],
  [255, 255, 0, 255, 255, 255],
  [255, 0, 255, 255, 255, 255]
];
let overlayGrid = [
  [255, 255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255, 255],
  [255, 255, 255, 255, 255, 255]
];
let rows = overlayGrid.length;
let cols = overlayGrid[0].length;
let tileSize = 50;

// RADIO PUZZLE VARIABLES
let radioImages = [];
let radioCode = [];
let radioState = 0; // 0: Radio front view    1: Radio back view    2: Radio back view with open compartment and key    3: Radio back view with empty open compartment
let hasKey = false;

// DOOR SCENE VARIABLES
let door;
let doorState = 0; // 0: Closed door    1: Opened doo win screen
let win;

// BUTTON VARIABLES
let doneButton;
let doorButton;
let backButton;
// -------------------------------------------------------------------
async function setup() {
  createCanvas(1000, 1000);
  noCursor();
  pixelFont = await loadFont("Assets/Fonts/pixel2.ttf"); // Load new font
  handCursor = await loadImage("Assets/cursor.PNG");
  keyCursor = await loadImage("Assets/key.PNG");


  menu = await loadImage("Assets/menu.PNG")
  bathroom = await loadImage("Assets/bathroom.PNG");

  // MIRROR SCENE GRAPHIC
  faceLayer = createGraphics(width, height);

  // ROACH PUZZLE IMAGES
  painting = await loadImage("Assets/Roach_Puzzle/painting.PNG");
  painting2 = await loadImage("Assets/Roach_Puzzle/painting2.PNG");
  roach = await loadImage("Assets/Roach_Puzzle/roach.PNG");
  roach2 = await loadImage("Assets/Roach_Puzzle/roach2.PNG");

  // DOOR SCENE IMAGES
  door = await loadImage("Assets/Door_Scene/door.PNG");
  win = await loadImage("Assets/gameWin.PNG")

  // BUTTON IMAGES
  backButton = await loadImage("Assets/backButton.PNG");
  doneButton = await loadImage("Assets/doneButton.PNG")
  doorButton = await loadImage("Assets/doorButton.PNG");

  // ANIMATION IMAGES
  for (let i = 1; i < 5; i++) {
    mirror.push(await loadImage("Assets/Mirror_Scene/Mirror" + i + ".PNG"));
  }
  for (let i = 0; i < 5; i++) {
    mirrorText.push(new FloatText());
  }
  for (let i = 1; i < 5; i++) {
    radioImages.push(await loadImage("Assets/Radio_Puzzle/radio" + i + ".PNG"));
  }
  windowClosed = await loadImage("Assets/Window_Puzzle/window.PNG");
  for (let i = 2; i < 5; i++) {
    windowAni.push(await loadImage("Assets/Window_Puzzle/window" + i + ".PNG"));
  }
}

function menuScreen() {
  if (scene === "menu") {
    image(menu, 0, 0);
    fill("#cca1b8");
    textFont(pixelFont);
    textSize(100);
    text("BATHROOM BREAK", 90, 150);
  }

}

function rememberText() {
  fill(255);
  textFont(pixelFont);
  textSize(60);
  text("Why... can't I remember anymore?", 70, 500);
}

function mirrorScene() {
  image(mirror[mirrorIndex], 0, 0); // Heavy breathing animation
  if (frameCount % 12 === 0) {
    mirrorIndex += 1;
    if (mirrorIndex > 3) {
      mirrorIndex = 0;
    }
  }

  for (let t of mirrorText) {
    t.display();
    t.move();
  }
  if (mouseIsPressed && mouseX > 330 && mouseX < 670 && mouseY > 60 && mouseY < 530) {
    hasFace = true; // Sets the hasFace variable as true when user drawing is detected
    faceLayer.stroke(255);
    faceLayer.strokeWeight(10);
    faceLayer.line(mouseX, mouseY, pmouseX, pmouseY);
  }
  if (hasFace === true) { // Checks to see of the user has drawn anything on the face. If they have, the "Done" button is toggled
    image(doneButton, 880, 880, 100, 100);
  }
  image(faceLayer, 0, 0);
  strokeWeight(1);
}

function thisIsMeText() {
  if (scene === "isMe") {
    image(faceLayer, 0, 0); // Takes the user's drawing from the previous scene and draws it here
    fill(255);
    textFont(pixelFont);
    textSize(60);
    text("Oh... that's right. This is me, isn't it?", 40, 700);
    text("How could I forget?", 40, 800);
  }
}

function getOutText() {
  if (scene === "getOut") {
    image(bathroom, 0, 0);
    fill(0);
    textFont(pixelFont);
    textSize(40);
    text("It smells horrible in here... what was I even doing? I", 60, 920);
    text("need to get out of this place.", 60, 970);
  }
}

function roachPuzzle() {
  if (paintingState === 0) {
    image(painting, 0, 0);
  }
  if (mouseIsPressed && paintingState === 0 && mouseX >= 150 && mouseX <= 850 && mouseY >= 75 && mouseY <= 900) {
    paintingState = 1;
    for (let i = 0; i < 9; i++) { // Adds 9 roach objects into the roach array
      spawnRoaches.push(new Roaches());
    }
  }
  if (paintingState === 1) {
    image(painting2, 0, 0);
  }

  for (let r of spawnRoaches) {
    r.display();
    r.move();
  }
  back();
}

function windowScene() {
  if (windowState === 0) {
    image(windowClosed, 0, 0);
  }
  if (mouseIsPressed && mouseX > 80 && mouseX < 920 && mouseY > 80 && mouseY < 800) {
    windowState = 1;
  }
  if (windowState === 1) { // Starts the animation for the window monster once the curtains are opened
    image(windowAni[windowIndex], 0, 0);
    if (frameCount % 25 === 0) {
      windowIndex += 1;
      if (windowIndex > 2) {
        windowIndex = 0;
      }
    }
    windowPuzzle();
  }
  back();
}

function inWindow() { // Ensures that the mouse is within the boundaries of the 2D array grid
  if (mouseX > 517 && mouseX < 816 && mouseY > 185 && mouseY < 426) {
    return true;
  }
  else {
    return false;
  }
}

function windowPuzzle() {
  let x = getCurrentX();
  let y = getCurrentY();
  // RENDER GRID
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let fillColor = overlayGrid[y][x];
      fill(fillColor);
      square(530 + (x * tileSize), 185 + (y * tileSize), tileSize);
    }
  }
  // FLIP TILES
  if (mouseIsPressed && inWindow() && windowState === 1) {
    if (grid[y][x] === 0) {
      overlayGrid[y][x] = 0;
    }
    else if (grid[y][x] === 255) {
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          overlayGrid[y][x] = 255;
        }
      }
    }
  }
}

function getCurrentX() { // Determines the current column position of the mouse
  let constrainedX = constrain(mouseX - 530, 0, width - 1);
  return floor(constrainedX / tileSize);
}

function getCurrentY() { // Determines the current row position of the mouse
  let constrainedY = constrain(mouseY - 185, 0, height - 1);
  return floor(constrainedY / tileSize);
}

function radioPuzzle() {
  if (radioState === 0) {
    image(radioImages[0], 0, 0);
  }
  if (radioCode[0] === 9 && radioCode[1] === 7 && radioState === 0) { // Checks to see if the exact code order within the code array is 97
    radioState = 1;
  }
  if (radioState === 1) { // The radio has successfully been unlocked and the key can now be retrieved
    image(radioImages[1], 0, 0);
    if (mouseIsPressed && mouseX > 455 && mouseX < 540 && mouseY > 405 && mouseY < 460) {
      radioState = 2;
    }
  }

  if (radioState === 2) {
    image(radioImages[2], 0, 0);
    if (mouseIsPressed && mouseX > 405 && mouseX < 590 && mouseY > 535 && mouseY < 630) {
      radioState = 3;
      hasKey = true;
    }
  }
  if (radioState === 3) {
    image(radioImages[3], 0, 0);
  }
  back();
}

function doorScene() {
  if (doorState === 0) {
    image(door, 0, 0);
    back();
  }
  if (mouseIsPressed && mouseX > 240 && mouseX < 750 && mouseY > 50 && mouseY < 760 && hasKey === true) { // Ensures the user has the key before opening the door
    doorState = 1;
  }
  if (doorState === 1) {
    image(win, 0, 0);
     fill("#cca1b8");
    textFont(pixelFont);
    textSize(100);
    text("YOU ESCAPED!", 170, 150);
    textSize(50);
    text("Thank you for playing!", 280, 780);
    text("All art and code by Miki Hoang", 190, 850);
  }
}

function back() {
  image(backButton, 880, 880, 100, 100); // Draws a small arrow icon while in door scene and puzzles. This corresponds with its code in mouseReleased()
}

function doorClickable() { // Draws a small door icon in the bottom-right corner of the screen while in the master bathroom scene. This corresponds with its code in mouseReleased()
  image(doorButton, 880, 880, 100, 100);
}

function changeScene() { // Calls the function for the current scene
  if (scene === "remember") {
    rememberText();
  }
  else if (scene === "mirror") {
    mirrorScene();
  }
  else if (scene === "isMe") {
    thisIsMeText();
  }
  else if (scene === "getOut") {
    getOutText();
  }
  else if (scene === "bathroom") {
    image(bathroom, 0, 0)
    doorClickable();
  }

  else if (scene === "window") {
    windowScene();
  }
  else if (scene === "painting") {
    roachPuzzle();
  }
  else if (scene === "radio") {
    radioPuzzle();
  }
  else if (scene === "door") {
    doorScene();
  }
}

function mousePressed() {
  if (scene === "radio") {
    if (mouseX > 560 && mouseX < 610 && mouseY > 625 && mouseY < 675) {
      if (radioCode.length > 1) { // Clears the code array if it detects more than 2 numbers
        radioCode.length = 0;
      }
      else {
        radioCode.push(7); // Adds a 7 to the code array when the seventh radio button is pressed
      }
    }
    if (mouseX > 740 && mouseX < 795 && mouseY > 625 && mouseY < 675) {
      if (radioCode.length > 1) {
        radioCode.length = 0;
      }
      else {
        radioCode.push(9); // Adds a 9 to the code array when the ninth radio button is pressed
      }
    }
  }
}

function mouseReleased() { // Used so that mouse presses from the previous scene don't interfere with the current scene after a scene switch
  if (scene === "menu") {
    if (mouseX > 250 && mouseX < 740 && mouseY > 790 && mouseY < 930) {
      scene = "remember";
    }
  }
  else if (scene === "remember") {
    scene = "mirror";
  }
  else if (scene === "mirror" && hasFace === true) {
    if (mouseX > 870 && mouseX < 970 && mouseY > 870 && mouseY < 970) {
      scene = "isMe";
    }
  }
  else if (scene === "isMe") {
    scene = "getOut";
  }
  else if (scene === "getOut") {
    scene = "bathroom";
  }
  else if (scene === "bathroom") {
    if (mouseX > 30 && mouseX < 333 && mouseY > 50 && mouseY < 400) {
      scene = "window";
    }
    else if (mouseX > 750 && mouseX < 970 && mouseY > 50 && mouseY < 300) {
      scene = "painting";
    }
    else if (mouseX > 120 && mouseX < 250 && mouseY > 520 && mouseY < 620) {
      scene = "radio";
    }
    //DOOR BUTTON CODE
    else if (mouseX > 870 && mouseX < 970 && mouseY > 870 && mouseY < 970) {
      scene = "door";
    }
  }
  // BACK BUTTON CODE
  else if (scene === "window" || scene === "painting" || scene === "radio" || scene === "door") { // Controls the "Back" button in the door scene and all the puzzles. Returns the user back to the master bathroom scene.
    if (mouseX > 870 && mouseX < 970 && mouseY > 870 && mouseY < 970) {
      scene = "bathroom";
    }
  }
}

class FloatText { // Creates random text for the mirror scene
  constructor() {
    this.x = random(1000);
    this.y = random(1000);
    this.size = random(25, 100);
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
  }

  display() {
    fill(255);
    textFont(pixelFont);
    textSize(this.size);
    text("Who am I?", this.x, this.y);
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width) { // If the text has reached the edge of the screen, it wraps around to the opposite side
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = height;
    }
  }
}

class Roaches {
  constructor() {
    this.x = 500;
    this.y = 500;
    this.sizeW = 100;
    this.sizeH = 100;
    this.speedX = random(-7, 7);
    this.speedY = random(-7, 7);
    this.state = 0;
  }
  display() {
    if (paintingState === 1) {
      if (this.state === 0) {
        image(roach, this.x, this.y, this.sizeW, this.sizeH);
      }
      if (mouseIsPressed && mouseX >= this.x && mouseX <= this.x + this.sizeW + 3 && mouseY >= this.y && mouseY <= this.y + this.sizeH + 3) { // Changes the roach sprites to the squashed roach sprites and stops all roach movement
        this.switchState();
        this.stop();
      }
      if (this.state === 1) {
        image(roach2, this.x, this.y, this.sizeW, this.sizeH);
      }
    }
  }
  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > width + 100) {
      this.x = 0;
    }
    if (this.x < 0 - 100) {
      this.x = width;
    }
    if (this.y > height + 100) {
      this.y = 0;
    }
    if (this.y < 0 - 100) {
      this.y = height;
    }
  }
  switchState() {
    this.state = 1;
  }
  stop() {
    this.speedX = 0;
    this.speedY = 0;
  }
}

function draw() {
  background(0);
  menuScreen();
  changeScene();

  if (hasKey === false) { // Changes the cursor depending on whether or not the user has successfully obtained the key
    image(handCursor, mouseX - 10, mouseY - 10, 100, 100);
  }
  else {
    image(keyCursor, mouseX, mouseY - 50, 100, 100);
  }
}
