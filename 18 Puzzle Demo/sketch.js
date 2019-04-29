// Grid Demo
const NUM_ROWS = 4;
const NUM_COLS = 5;
let rectWidth, rectHeight;
let currentRow, currentCol;

let gridData = [[0,0,0,255,0],
                [255,0,255,0,255],
                [0,255,0,0,0],
                [0,0,255,0,255]];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth = width / NUM_COLS;
  rectHeight = height / NUM_ROWS;
}

function drawGrid(){
  // Render a Grid of Squares - fill color set 
  // According to data stored in 2D array.
  for (let y = 0; y < NUM_ROWS; y++){
    for (let x = 0; x < NUM_COLS; x++){
      fill(gridData[y][x]);
      rect(x*rectWidth,y*rectHeight,rectWidth,rectHeight);
    }
  }
}

function determineActiveSquare(){
  //An expression to run each frame and to determine
  //where the mouse is!
  currentRow = int(mouseY / rectHeight);
  currentCol = int(mouseX / rectWidth);
  print(currentCol, currentRow);
}

function draw() {
  background(220);
  determineActiveSquare();
  drawGrid();
}
