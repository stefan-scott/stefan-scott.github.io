//  Farm Game

let tiles = []; //0 - blank
                //1 - chicken
                //2 - cow

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
