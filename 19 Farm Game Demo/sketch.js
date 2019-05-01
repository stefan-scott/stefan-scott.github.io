//  Farm Game
const COLUMNS = 5;
const ROWS = 5;
let playerX = 3;
let playerY = 4;

let tiles = []; //0 - blank
                //1 - chicken
                //2 - cow

let level = [ [0, 1, 0, 1, 0],
              [1, 1, 1 ,0, 0],
              [0, 0, 1, 1, 0],
              [1, 0, 0, 1, 1],
              [0, 0, 1, 2, 1] ];

function preload(){
  for (let i = 0; i < 3; i++){
    tiles.push(loadImage("assets/"+i+".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
  background(220);
}
