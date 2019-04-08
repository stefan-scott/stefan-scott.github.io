// Diagonal Line Generator
const spacing = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function diagonalAscending(x, y, s){
  line(x-s/2, y+s/2, x+s/2, y-s/2);
}

function diagonalDescending(x,y,s){
  line(x-s/2, y-s/2, x+s/2, y+s/2);
}

function draw() {
  background(220);
  for (let x = spacing/2; x < width - spacing/2; x+= spacing){
    for (let y = spacing/2; y < height - spacing/2; y+=spacing){
      diagonalDescending(x,y, spacing );
    }
  }
}
