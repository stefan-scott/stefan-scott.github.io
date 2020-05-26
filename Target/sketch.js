// Target Game Practice


let backImage, backImageDark, baseImage, barrelImage, ballImage, targetImage;
let shotsRemainingImages = [];
let targetsHitImages = [];
let explosionImages = [];

let loading = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  loadAllImages();
  print("start");
}

function loadAllImages(){
  //set up all image load statements, with callbacks to track loading progress
  backImage = loadImage("assets/background.png", loadSuccess, loadFail);
  backImageDark = loadImage("assets/backgroundReport.png", loadSuccess, loadFail);
  baseImage = loadImage("assets/base.png", loadSuccess, loadFail);
  barrelImage = loadImage("assets/barrel.png", loadSuccess, loadFail);
  ballImage = loadImage("assets/cannonball.png", loadSuccess, loadFail);
  targetImage = loadImage("assets/target.png", loadSuccess, loadFail);
  
  for(let i = 0; i < 21; i++){
    shotsRemainingImages[i] = loadImage("assets/shots"+i+".png", loadSuccess, loadFail);
  }
  
  for(let i = 0; i < 21; i++){
    targetsHitImages[i] = loadImage("assets/target"+i+".png", loadSuccess, loadFail);
  }

  for(let i = 0; i < 6; i++){
    explosionImages[i] = loadImage("assets/ex"+i+".png", loadSuccess, loadFail);
  }
}

function loadSuccess(img){
  print("yes");
}

function loadFail(){
  print("nope");
}

function draw() {
  background(0);
}