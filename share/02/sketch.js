//Video Motion Detection
//Originally was thinking about edge detection, but my solution actually is looking for motion, not edges
//it compares the pixels in the previous frame with those in the current frame. If the average value difference 
//in a pixel is significant from one frame to the next, highlight it. This will show pixels where the
//color has changed over time - ie something is moving.


let video;
let pixelsPrev=[];
const GRID_SPACING = 2;
let start = false;
let commenced = false;
function preload() {

}
function setup() {
  video = createCapture(VIDEO);
  createCanvas(640, 480);

  //Set up text properties for last part
  textSize(20);
  textAlign(CENTER);
  fill(255);
  noStroke();
}

function keyPressed() {
  if (commenced === false) {
    start = true;
    commenced = true;
  }
}
function mousePressed() {
  if (commenced === false) {
    start = true;
    commenced = true;
  }
}

function diff(pos){
  //looks at two pixels from the same spot (current frame and previous frame) and returns the difference
  //between their average values. (absolute value)
  //print(pixels.length, pixelsPrev.length);
  let avgCurrent = (pixels[pos] + pixels[pos + 1] + pixels[pos + 2]) / 3;
  let avgPrev =  (pixelsPrev[pos] + pixelsPrev[pos + 1] + pixelsPrev[pos + 2]) / 3;
  return abs(avgCurrent - avgPrev);
}

function draw() {
  image(video,0,0);
  //background(0);
  if (start === true) {
    //happens once one frame before beginning. Stores the pixels array from the previous frame
    //in another array, so we can compare the two. These arrays will always be 1 frame different.
    video.loadPixels();
    pixelsPrev = copyArray(pixels);
    commenced = true;
    start = false;
  }
  else if (commenced === true){ 
    video.loadPixels();
    for (let x = 0; x < video.width; x += GRID_SPACING) {
      for (let y = 0; y < video.height; y += GRID_SPACING) {
        let location = (x + y * video.width) * 4;
        if (diff(location) > 50){
          rect(x,y,GRID_SPACING,GRID_SPACING);
        }
      }
    }
    pixelsPrev = copyArray(pixels);

    //video.updatePixels();
 
    //main body. Have already grabbed the pixels array from one frame ago
  }
  else{
    //nothing has happened yet. Display prompt to press a key to begin
    print("a");
    //background(0);
    text("Press a Key to Begin",width/2,height/2);
  }
  


  // background(0);

  // for (let x = 0; x < video.width; x += GRID_SPACING) {
  //   for (let y = 0; y < video.height; y += GRID_SPACING) {
  //     let location = (x + y * video.width) * 4;
  //     let avg = avgPixel(location);
      // if(x<video.width/2){
      //   setPixelColor(location, 0,0,0);
      // }
      //stroke(0);
      //stroke(pixels[location],pixels[location+1],pixels[location+2]);
      //point(x,y);


      //option 1
      // fill(pixels[location],pixels[location+1],pixels[location+2]);
      // ellipse(x,y,5,5);


      //option 2 ACSII
      // drawCharacter(x, y, avg);


  //video.updatePixels();
  //image(video,0,0);
}

function copyArray(src){
  let dest = [];
  for (let i =0; i <src.length; i++){
    dest.push(src[i]);
  }
  return dest;
}


function drawCharacter(x, y, avg) {

  // if (avg > 200)text("■",x,y);
  // else if (avg > 140)text("p",x,y);
  // else if (avg > 90)text("┐",x,y);
  // else if (avg > 40)text(".",x,y);
  if (avg > 110) text("x", x, y);
}


function setPixelColor(pos, r, g, b) {
  //Helper function to set the RGB for a particular pixel, index given by pos
  pixels[pos] = r;
  pixels[pos + 1] = g;
  pixels[pos + 2] = b;
}


function avgPixel(pos) {
  return (pixels[pos] + pixels[pos + 1] + pixels[pos + 2]) / 3;
}
