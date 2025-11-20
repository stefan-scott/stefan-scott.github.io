// Piano Tiles- Capstone Project
// Maheen Shahid
// May 8, 2025


//------PURPOSE OF GAME------
//This game is designed to challenge players' reflexes and rhythm
//by combining fast paced tapping with music. It is meant to be engaging and
//the ultimate goal is to complete the song without any mistakes!

//----HOW TO PLAY----
//When the game started, tiles begin to scroll from top to bottom.
//Tap only black tiles as they fall. Tapping the wrong tile, missing a tile.
// or tapping out of order ends the game!


// GLOBAL VARIABLES
let NUM_ROWS = 4
let NUM_COLS = 4
let rectWidth;
let rectHeight;
let pianoTiles = [];
let scrollY = 0;
let scrollSpeed = 5.5;
let reason;
let score = 0;
let musicCD;
let cdAngle = 0;
let winnerTimer = 0;
let winner;

//Starting game
let start;
let countdownTime = 3;
let countdownStart;
let gameState = "menu";

//Music Variables
let noteSounds = {};
let buzzSound;
let lobbySong;
let lobbyPlaying = false;
let currentNote;
let noteMelody;

function setup() {
  createCanvas(windowWidth, windowHeight);
  setUpSizes();
  randomStart();
  currentNote = 0;
}

function draw() {
  background(220);

  //Reset text styles
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  fill(0);
  noStroke();

  gameStates();
}

// ----------- Display and Functionality of Game --------------
function preload() {
  //Piano notes
  noteSounds["C4"] = loadSound("assets/C4.mp3");
  noteSounds["D4"] = loadSound("assets/D4.mp3");
  noteSounds["E4"] = loadSound("assets/E4.mp3");
  noteSounds["F4"] = loadSound("assets/F4.mp3");
  noteSounds["G4"] = loadSound("assets/G4.mp3");

  //buzzer
  buzzSound = loadSound("assets/buzzer.mp3");

  //Lobby Music
  lobbySong = loadSound("assets/lobbyMusic.mp3");

  //Start
  start = loadSound("assets/StartButton.wav");

  //Winner
  winner = loadSound("assets/Winner.wav");

  //CD Image
  musicCD = loadImage("assets/CDPlayer.png");
}

function gameStates() {
  //Handle what will be shown depending on
  //what state we are i
  if (gameState === "menu") {
    showMenu();
  }
  else if (gameState === "countdown") {
    drawPiano(true); //Show tiles but not moving
    showCountdown();
  }
  else if (gameState === "game") {
    drawPiano(false);
    updateTiles();
  }
  else if (gameState === "restartGame") {
    restartGame();
  }
  else if (gameState === "win") {
    drawPiano(false);
    showWin();
  }
}

function setUpSizes() {
  //divide any screen size into
  //4 equal column and rows.
  rectWidth = windowWidth / NUM_COLS;
  rectHeight = windowHeight / NUM_ROWS;
}

function randomRow() {
  //Choose a random tile to make black
  //the rest stay white
  let row = [];
  let blackTile = floor(random(NUM_COLS));
  for (let x = 0; x < NUM_COLS; x++) {
    if (x === blackTile) {
      row.push('black');
    }
    else {
      row.push('white');
    }
  }
  return row;
}

function randomStart() {
  //give a new arrangement of tiles
  //everytime the game is reset.
  score = 0;
  let totalRows = NUM_ROWS + 2;
  let blankRows = 3; //first 3 rows all white

  for (let i = 0; i < totalRows; i++) {
    if (i >= totalRows - blankRows) {
      //push 3 white rows for just the start of the game
      let whiteRows = [];
      for (let c = 0; c < NUM_COLS; c++) {
        whiteRows.push('white');
      }
      pianoTiles.push(whiteRows);
    }
    else {
      pianoTiles.push(randomRow()); //normal rows
    }
  }
}

function updateTiles() {
  //keep the tiles going
  //Does not let them stack
  //Check if any black tiles have gone off screen without being tapped
  if (gameState !== "game") {
    return;
  }
  if (gameState === "win") {
    for (let row = 0; row < pianoTiles.length; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (pianoTiles[row][col] === "black") {
          pianoTiles[row][col] = "white";  //no black tiles left
        }
      }
    }
  }
  if (scrollY >= rectHeight) {
    scrollY -= rectHeight;

    if (scrollSpeed < 12) { //max speed
      scrollSpeed += 0.05; //increase speed slightly overtime
    }

    //the tile off screen
    let lastRow = pianoTiles[pianoTiles.length - 1];
    for (let col = 0; col < NUM_COLS; col++) {
      if (lastRow[col] === 'black') {
        //user forgot a black tile
        lastRow[col] = 'red';
        scrollSpeed = 0; //pause game
        buzzSound.play();
        gameState = "restartGame";
        reason = "missed a tile!"
        return;
      }
    }
    pianoTiles.pop(); // remove row
    pianoTiles.unshift(randomRow()); //make a new row
  }
}

function drawPiano(frozen = false) {
  //render the tiles on the screen
  for (let y = 0; y < pianoTiles.length; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      let tileY = y * rectHeight + scrollY;
      let tileColor = pianoTiles[y][x];
      if (tileColor === 'black') {
        stroke(60); //grey outline
      }
      else {
        stroke(0);
      }
      strokeWeight(1);
      fill(tileColor);
      rect(x * rectWidth, tileY - rectHeight, rectWidth, rectHeight);
    }
  }
  if (frozen === false) {
    scrollY += scrollSpeed; //scrolling
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
  }
}

function showMenu() {
  //draw the menu when the time is right
  //white out background
  if (gameState === "menu") {
    if (lobbyPlaying === false) {
      lobbySong.loop();
      lobbyPlaying = true;
    }
    fill(255, 255, 255);
    rect(0, 0, width, height);
    drawMenu();
  }
}

function drawMenu() {
  //Draws Main Menu...
  //Title and Start button
  noStroke();
  for (let y = 0; y < height; y += 10) {
    let blue = 230 + y * 0.1; //230 -> 255
    let red = 170 + y * 0.1;
    let green = 200 - y * 0.1;

    fill(red, green, blue);
    rect(0, y, width, 10);
  }

  //Draw the CD rotating
  let imgScale = 0.25;
  imageMode(CENTER);
  push();
  translate(width / 2, height / 3 - 100);
  rotate(radians(cdAngle));
  scale(imgScale);
  image(musicCD, 0, 0);
  pop();
  cdAngle += 0.5;


  //Draw title
  textAlign(CENTER);
  textSize(100);
  textFont('Georgia');
  strokeWeight(2);
  fill(145, 112, 197);
  text("Tone", width / 2, height / 3 + 60);
  text("TAP", width / 2, height / 3 + 170);

  //Song Buttons
  drawSongButton("Ode to Joy - Beethoven", height / 2 + 120);
  drawSongButton("He's a Pirate- POTC", height / 2 + 200);

  //Name
  textAlign(LEFT, BOTTOM);
  textSize(15);
  fill(0);
  text("Maheen Shahid", 3, height - 3);

  //Silent mode reminder
  textAlign(RIGHT, BOTTOM);
  textSize(14);
  fill(80);
  text("Silent Mode Off", width - 10, height - 5);
}

function drawSongButton(label, yPosition) {
  //guve the user two song options
  //display on main menu
  fill(255, 255, 255, 200);
  stroke(145, 112, 197);
  strokeWeight(2);
  rect(width / 2 - 150, yPosition, 300, 60, 20);
  noStroke();
  fill(145, 112, 197);
  textSize(24);
  text(label, width / 2, yPosition + 30);
}

function showCountdown() {
  //Countdown from 3 after the start button is clicked
  //gives user time to prepare
  // 3-2-1.. GO!
  let passedTime = millis() - countdownStart;
  let secondsLeft = countdownTime - floor(passedTime / 1000);
  let displayText;

  textAlign(CENTER);
  textSize(100);
  fill(0);
  if (secondsLeft > 0) {
    displayText = secondsLeft;
    fill(173, 54, 54);
    text(displayText, width / 2, height / 2);
  }
  else if (passedTime < (countdownTime + 1) * 1000) { //only show "go" for one second
    displayText = "GO!";
    fill(50, 168, 82);
    text(displayText, width / 2, height / 2);
  }
  else {
    gameState = "game"; //start the game once go disappears
  }
}

function restartGame() {
  //User did something incorrect
  //restart menu
  //say the reason why they lost
  scrollY = 0;
  textFont('Georgia');

  //GAME OVER
  textAlign(CENTER, CENTER);
  textSize(min(width, height) * 0.12); //based on size of screen
  fill(255, 0, 70);
  text("GAME OVER", width / 2, height / 3);

  //Reason and score
  textSize(min(width, height) * 0.04);
  fill(255);
  text("Uh Oh! You " + reason, width / 2, height / 2 - 20);
  text("Score: " + score, width / 2, height * 0.54 + 30);

  //Restart Button
  fill(255, 50, 100, 200);
  stroke(255);
  strokeWeight(2);
  rect(width / 2 - 125, height * 0.7, 250, 60, 20); //glowing pink

  noStroke();
  fill(0);
  textSize(30);
  text("RESTART", width / 2, height * 0.7 + 30);

}

function showWin() {
  // WINNING FUNCTION
  // User has successfully made it through the song
  textFont('Georgia');
  textAlign(CENTER, CENTER);
  fill(50, 168, 82);
  textSize(min(width, height) * 0.12);
  text("YOU WIN!", width / 2, height / 3);

  textSize(32);
  fill(0);
  text("Score: " + score, width / 2, height * 0.54 + 30);

  if (!winner.isPlaying()) {
    winner.play();
    winnerTimer = millis(); //set timer once
  }

  //reset logic
  if (millis() - winnerTimer > 3000) { //3 seconds
    winner.stop();
    pianoTiles = [];  //reset everything
    scrollSpeed = 5.5;
    scrollY = 0;
    randomStart();
    currentNote = 0;
    gameState = "menu";
  }
}

function startGame() {
  if (lobbySong.isPlaying()) {
    lobbySong.stop();
    lobbyPlaying = false;
  }

  pianoTiles = [];
  randomStart();
  scrollSpeed = 4;
  scrollY = 0;
  currentNote = 0;
  score = 0;

  start.play();
  gameState = "countdown";
  countdownStart = millis();

  if (!noteSounds["C4"] || !noteSounds["D4"] || !noteSounds["E4"] || !noteSounds["F4"] || !noteSounds["G4"]) {
    //means certain notes are not quite done loading yet
    //prevents game from crashing for this reason
    console.warn("Sounds still loading...");
    return;
  }
}

// -------------- Touch Functions --------------

function touchStarted() {
  userStartAudio(); //ensures the sound plays

  if (gameState === "win") {
    return false; //no further input
  }

  //Are we clicking the start button?
  if (gameState === "menu") {
    if (mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&
      mouseY > height / 2 - 120 &&
      mouseY < height / 2 + 180) {
      //ODE TO JOY - BEETHOVEN
      noteMelody = ["E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "E4", "D4", "D4", null,

        "E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "D4", "C4", "C4", null,

        "D4", "D4", "E4", "C4", "D4", "E4", "F4", "E4", "C4", "D4",
        "E4", "F4", "E4", "D4", "C4", null,

        "E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "D4", "C4", "C4"
        , "E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "E4", "D4", "D4", null,

        "E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "D4", "C4", "C4", null,

        "D4", "D4", "E4", "C4", "D4", "E4", "F4", "E4", "C4", "D4",
        "E4", "F4", "E4", "D4", "C4", null,

        "E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4",
        "C4", "C4", "D4", "E4", "D4", "C4", "C4"];
      startGame();
      return false;
    }
    if (
      mouseX > width / 2 - 150 &&
      mouseX < width / 2 + 150 &&
      mouseY > height / 2 + 200 &&
      mouseY < height / 2 + 260
    ) {
      //He's a Pirate- POTC
      noteMelody = ["E4", "F4", "G4", "G4", "F4", "E4", "D4", null,
        "E4", "F4", "G4", "G4", "F4", "E4", "D4", null,
        "E4", "F4", "G4", "E4", "F4", "G4", null,
        "G4", "F4", "E4", "D4", "C4", null,

        "C4", "D4", "E4", "F4", "E4", "D4", "C4", null,
        "D4", "E4", "F4", "G4", "F4", "E4", "D4", null,
        "E4", "F4", "G4", "E4", "F4", "G4", null,
        "G4", "F4", "E4", "D4", "C4"];
      startGame();
      return false;
    }
  }

  //Are we clicking the restart button?
  if (gameState === "restartGame") {
    if (
      mouseX > width / 2 - 125 &&
      mouseX < width / 2 + 125 &&
      mouseY > height * 0.7 &&
      mouseY < height * 0.7 + 60) {
      pianoTiles = [];
      randomStart();
      scrollSpeed = 4;
      scrollY = 0;
      gameState = "menu";
      currentNote = 0;
    }
  }

  //Game tap logic
  //Detect what tile was clicked
  //Handle the result based on color and order
  if (gameState === "game") {
    let nextTileRow = -1;  //is it the next one that needs to be clicked?
    let nextTileCol = -1;

    for (let row = pianoTiles.length - 1; row >= 0; row--) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (pianoTiles[row][col] === 'black') {
          nextTileRow = row;
          nextTileCol = col;
          break;
        }
      }

      if (nextTileRow !== -1) { //next black tile found?
        break;
      }

    }

    if (nextTileCol !== -1 && nextTileRow !== -1) {
      // did user click the next specific tile
      let tileX = nextTileCol * rectWidth;
      let tileY = nextTileRow * rectHeight + scrollY - rectHeight;

      if (
        mouseX > tileX &&
        mouseX < tileX + rectWidth &&
        mouseY > tileY &&
        mouseY < tileY + rectHeight
      ) {
        // Clicked correct tile!
        pianoTiles[nextTileRow][nextTileCol] = 'white';
        score++;

        // Play next note
        if (currentNote < noteMelody.length) {
          let note = noteMelody[currentNote];
          if (note && noteSounds[note]) {
            noteSounds[note].play();
          }
          currentNote++;

          // Did the user finish the song?
          if (currentNote >= noteMelody.length) {
            gameState = "win";
            winnerTimer = millis();
            scrollSpeed = 3;
          }
        }
      } else {
        // Tapped a white tile or wrong tile
        pianoTiles[nextTileRow][nextTileCol] = 'red'; // WRONG TILE CLICKED
        scrollSpeed = 0;
        buzzSound.play();
        gameState = "restartGame";
        reason = "tapped the wrong tile!";
      }
    }

    return false; // to avoid any zoom ins or pop ups when on mobile
  }
}
