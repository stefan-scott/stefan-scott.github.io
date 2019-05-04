//Video Demonstration and Exercise.
//First, show how to use createCapture to load a video stream from a webcam
//and that this is by default part of the DOM, and not included on the Canvas.

//Second, store the video stream in a variable, so that it can also be displayed on the Canvas.
//Show that this is just like any image, except that its contents are updated every frame. Have it moved to where the mouse cursor is?

//Third, after briefly discussing how data is stored in the pixels array (each 4 positions store the rgba values for a single pixel),
//Build a simple threshold filter using a single loop. Update the pixels array, and expand to a 3-level threshold.

//Fourth, discuss that iterating through the 1D array (stepping by 4) works well if the same operation is going to be used for each pixel, as we don't really 
//have an easy way to determine "where" the current pixel is visually in 2D space. We can use 2 loops to think of the video as if it 
//were stored in a 2D array, but we'll need to find a relationship between the x,y location of a pixel, at its actual position in the
//pixels array.     (x + y*video.width)*4

//Using this information, we can look at using the video stream as a database to drive other types of graphics. First, ellipses. Loop
//through the X and Y values stepping by 5 or 10 (use a constant), and at each x and y position, draw and ellipse with the fill color of
//the pixel that would be at that position. This will make a grid of circles that the video information is still visible in.

//Lastly, extend the nested loop approach to create an ASCII threshold effect. Set the background to black, and fill to white. Stepping
//by the constant amount (5 or 10), use a function to determine the avg value of the pixel at that location. Then, write a single character
//of text at that location, determined by if it is above some threshold or not. Use a character with relative high density (such as "@")
//which will create the light areas of the image. No text will leave black for dark areas.

//Once you've created a basic ASCII video filter as a class, have students expand their filter to have at least 5 levels:
// above 210        - brightest
// above 170        - 2nd brightest
// above 130        - middle value
// above 80         - 2nd darkest
// below (no text)  - darkest
//
// Students should reference an ASCII table (Basic and Extended) and choose which characters they think would work well for the different 
// brightnesses needed for each level


let video;
const GRID_SPACING = 5;

function preload() {

}
function setup() {
  video = createCapture(VIDEO);
  createCanvas(640, 480);

  //Set up text properties for last part
  textSize(GRID_SPACING);
  fill(255);
  noStroke();
}

function draw() {


  video.loadPixels();
  background(0);

  for (let x = 0; x < video.width; x += GRID_SPACING) {
    for (let y = 0; y < video.height; y += GRID_SPACING) {
      let location = (x + y * video.width) * 4;
      let avg = avgPixel(location);
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
      drawCharacter(x, y, avg);

    }
  }
  //video.updatePixels();
  //image(video,0,0);
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
