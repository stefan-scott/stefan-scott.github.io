//                MENU                 \\
function menu() {
  background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
  //the title
  fill(0);
  textAlign(CENTER);
  textFont(titlefont); //new font
  textSize(200);
  text("Cannon Game", windowWidth / 2, windowHeight / 2 - 100);
  //adding a play button as a separate function to clean this up
  playButton();
  controls();
  versions();
}

let playcolour = (69, 140, 81); //play text colour
let buttonColour = (40, 65, 158); //play button colour
//play button
function playButton() {
  fill(buttonColour);
  rectMode(CENTER);
  rect(windowWidth / 2, windowHeight / 2 + 200, 800, 300);
  fill(playcolour);
  textSize(100);
  text("PLAY", windowWidth / 2, windowHeight / 2 + 225); // play button
  if (mouseY < windowHeight / 2 + 350 && mouseY > windowHeight / 2 + 50 && mouseX > windowWidth / 2 - 400 && mouseX < windowWidth / 2 + 400) { //mouse hover function - changes colour
    buttonColour = color(28, 53, 97); //second colours
    playcolour = color(36, 74, 43);
  }
  else {
    buttonColour = color(40, 65, 158); // base colours
    playcolour = color(69, 140, 81);
  }
}

//adding a function to include player controls 
function controls() {
  fill(0);
  textSize(20);
  //player 1
  text("Player 1:", windowWidth * 0.125, windowHeight / 2 + 100);
  text("W + S to move cannon", windowWidth * 0.125, windowHeight / 2 + 160);
  text("F to shoot", windowWidth * 0.125, windowHeight / 2 + 220);

  //player 2
  text("Player 2:", windowWidth * 0.875, windowHeight / 2 + 100);
  text("UP + DOWN ARROW to move cannon", windowWidth * 0.875, windowHeight / 2 + 160);
  text("L to shoot", windowWidth * 0.875, windowHeight / 2 + 220);
}

//adding a tab to select projectile types

function versions() {
  rectMode(CENTER);
  fill(buttonColour);
  rect(windowWidth / 2, windowHeight * 0.1 - 10, 200, 40); //positioned near the top middle of the screen
  textAlign(CENTER);
  fill(playcolour);
  textSize(30);
  //switching text to display missle type
  if (missleType === 1) {
    text("VERSION 1", windowWidth / 2, windowHeight * 0.1);
  }
  else if (missleType === 2) {
    text("VERSION 2", windowWidth / 2, windowHeight * 0.1);
  }
  else if (missleType === 3) {
    text("VERSION 3", windowWidth / 2, windowHeight * 0.1);
  }
  // hover changes colour
  // if (menuScreen === true && mouseY > windowHeight * 0.1 - 30 && mouseY < windowHeight * 0.1 + 20 && mouseX > windowWidth/2 - 100 && mouseX < windowWidth/2 + 100) {
  // //   buttonColour = color(0); //second colours
  // //   playcolour = color(36, 74, 43);
  // }
  // else {
  // //   buttonColour = color(40, 65, 158); // base colours
  // //   playcolour = color(69, 140, 81);
  // }
}