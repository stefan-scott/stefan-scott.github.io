//  Farm Game
const COLUMNS = 5;
const ROWS = 5;
const TILE_SIZE = 100;
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
  createCanvas(COLUMNS * TILE_SIZE, ROWS * TILE_SIZE);
}

function renderGame(){
  for (let y = 0; y < ROWS; y++){
    for (let x = 0; x < COLUMNS; x++){
      let index = level[y][x];
      image(tiles[index], x*TILE_SIZE, y*TILE_SIZE);
    }
  }
}

function draw() {
  background(220);
  renderGame();
}
