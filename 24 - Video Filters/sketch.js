let video;

function setup(){
  createCanvas(640,480);
  video = createCapture(VIDEO);
  //video.hide();
}

function avgPixel(pos){ //pos - index of the R for the current pixel
  return (pixels[pos] + pixels[pos+1] + pixels[pos+2]) / 3;
}

function setPixelColor(pos, r, g, b){
  pixels[pos] = r;
  pixels[pos+1] = g;
  pixels[pos+2] = b;
}

function draw(){
  background(220);
  video.loadPixels();
  for (let i = 0; i< pixels.length; i+=4){
    if (avgPixel(i) > 200){
      setPixelColor(i, 200,255,255);
    }  
    else if(avgPixel(i) > 120){
      setPixelColor(i, 180,180,255);
    }
    else if (avgPixel(i) > 60){
      setPixelColor(i, 90,180,80);
    }
    else{
      setPixelColor(i, 40 , 0, 10);
    }
  }
  video.updatePixels();
  image(video,0,0);
}