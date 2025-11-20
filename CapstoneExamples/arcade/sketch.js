// Arcade Experience - Menu
// Lucas Boyd and Ted Song
// 1/22/2025

let inMenu = true; // Defines global variables
let gameId = 0;
let bgImage;
let bgMusic;
let logo;
let i = 0;

function preload(){ // Preloads assets
  bgImage = loadImage("assets/MenuGif.gif");
  bgMusic = loadSound("assets/retro-game-arcade-236133.mp3");
  logo = loadImage("assets/logo.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  menu();
  if(i===0){ // Loops music
    bgMusic.loop();
    i++;
  }
}

function menu(){
  image(bgImage, 0, 0, windowWidth, windowHeight); // Background gif
  imageMode(CENTER);
  image(logo, width/2, height/5.75, logo.width/1.4,logo.height/1.4); // Arcade Experience Logo
  imageMode(CORNER);
}
