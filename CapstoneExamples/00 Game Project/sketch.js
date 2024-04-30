// Fishing Friends
// Hannah Tremaine
// Start - November 30th, 2023

p5.Image.prototype.resizeNN = function (w, h) {
  "use strict";

  // Locally cache current image's canvas' dimension properties:
  const { width, height } = this.canvas;

  // Sanitize dimension parameters:
  w = ~~Math.abs(w), h = ~~Math.abs(h);

  // Quit prematurely if both dimensions are equal or parameters are both 0:
  if (w === width && h === height || !(w | h))  return this;

  // Scale dimension parameters:
  if (!w)  w = h*width  / height | 0; // only when parameter w is 0
  if (!h)  h = w*height / width  | 0; // only when parameter h is 0

  const img = new p5.Image(w, h), // creates temporary image
        sx = w / width, sy = h / height; // scaled coords. for current image

  this.loadPixels(), img.loadPixels(); // initializes both 8-bit RGBa pixels[]

  // Create 32-bit viewers for current & temporary 8-bit RGBa pixels[]:
  const pixInt = new Int32Array(this.pixels.buffer),
        imgInt = new Int32Array(img.pixels.buffer);

  // Transfer current to temporary pixels[] by 4 bytes (32-bit) at once:
  for (var x = 0, y = 0; y < h; x = 0) {
    const curRow = width * ~~(y/sy), tgtRow = w * y++;

    while (x < w) {
      const curIdx = curRow + ~~(x/sx), tgtIdx = tgtRow + x++;
      imgInt[tgtIdx] = pixInt[curIdx];
    }
  }

  img.updatePixels(); // updates temp 8-bit RGBa pixels[] w/ its current state

  // Resize current image to temporary image's dimensions:
  this.canvas.width = this.width = w, this.canvas.height = this.height = h;
  this.drawingContext.drawImage(img.canvas, 0, 0, w, h, 0, 0, w, h);

  return this;
};




//preload stuff
let fishImages = [];
let decorImages = [];
let plantImages = [];
let buttonImages = [];
let uiImages = [];
let backgroundImages = [];
let programStarted = false;
let totalCounter = 0;

let startMenuImg;
let startMenu = true;
//shop items animation
//fish
let tinyFishO, tinyFishPi, tinyFishPu, tinyFishR;
let smallFishB, smallFishG, smallFishO, smallFishP;
let longFishB, longFishP, longFishO, longFishR;
let jellyP, jellyB, sawshark, angler, shark, swordfish, squidR, squidP;
//decor
let bubbles, chest1, chest2, clam;
//seaweed
let seaweed1, seaweed2, seaweed3, seaweed4, seaweed5;
//mouseisclicked
let isTriggered = false;
//base menu button
let openMenuButton;
//menus
let shopMenu1, shopMenu2, shopMenu3, shopMenu4, shopMenu5;
let shopMenu6, shopMenu7, shopMenu8, shopMenu9;
let shopMenu10, shopMenu11, shopMenu12, shopMenu13;
let shopMenu14, shopMenu15, shopMenu16, shopMenu17;
let shopMenu18, shopMenu19, shopMenu20, shopMenu21, shopMenu22, shopMenu23;
let shopMenu24, shopMenu25, shopMenu26, shopMenu27, shopMenu28, shopMenu29;
//varible controlling what menu is seen
let menuOn = 0; //0 off, 1 shopMenu1, 2 shopMenu2 and so forth
//backgrounds on
let waterVisable;
let groundVisable;

//controls for previewing item
let previewMode = false;
let previewTest = [];

//Money variable
let money = 2000;

//in aquarium
let fishInAquarium = [];
let stationaryInAquarium = [];
let AniStillInAquarium = [];

function finishedLoading(){
  totalCounter++;
  print(totalCounter);
}



function setup() {
  createCanvas(800,400);
  startMenuImg = loadImage("assets/backgrounds/FISHING FRIENDS.png")
  for(let i =0; i<22;i++){ //fish images
    fishImages.push(loadImage("assets/shopItems/fish/fish"+(i)+".png",finishedLoading));
  }
  for(let i =0; i<36;i++){ //decor images
    decorImages.push(loadImage("assets/shopItems/decor/decor"+(i)+".png",finishedLoading));
  }
  for(let i =0; i<34;i++){ //plant images
    plantImages.push(loadImage("assets/shopItems/plants/plant"+(i)+".png",finishedLoading));
  }
  for(let i =0; i<51;i++){ //button images
    buttonImages.push(loadImage("assets/buttons/button"+(i)+".jpg",finishedLoading));
  }
  for(let i =51; i<95;i++){ //button images
    buttonImages.push(loadImage("assets/buttons/button"+(i)+".png",finishedLoading));
  }
  for(let i =0; i<12;i++){ //ui images
    uiImages.push(loadImage("assets/ui/ui buttons/b"+(i)+".png",finishedLoading));
  }
  for(let i =0; i<6;i++){ //plant images
    backgroundImages.push(loadImage("assets/backgrounds/bg"+(i)+".png",finishedLoading));
  }
  testFish = new Fish(0,200,tinyFishR);
  shopMenu1 = new ShopMenu1();
  shopMenu2 = new ShopMenu2();
  shopMenu3 = new ShopMenu3();
  shopMenu4 = new ShopMenu4();
  shopMenu5 = new ShopMenu5();
  shopMenu6 = new ShopMenu6();
  shopMenu7 = new ShopMenu7();
  shopMenu8 = new ShopMenu8();
  shopMenu9 = new ShopMenu9();
  shopMenu10 = new ShopMenu10();
  shopMenu11 = new ShopMenu11();
  shopMenu12 = new ShopMenu12();
  shopMenu13 = new ShopMenu13();
  shopMenu14 = new ShopMenu14();
  shopMenu15 = new ShopMenu15();
  shopMenu16 = new ShopMenu16();
  shopMenu17 = new ShopMenu17();
  shopMenu18 = new ShopMenu18();
  shopMenu19 = new ShopMenu19();
  shopMenu20 = new ShopMenu20();
  shopMenu21 = new ShopMenu21();
  shopMenu22 = new ShopMenu22();
  shopMenu23 = new ShopMenu23();
  shopMenu24 = new ShopMenu24();
  shopMenu25 = new ShopMenu25();
  shopMenu26 = new ShopMenu26();
  shopMenu27 = new ShopMenu27();
  shopMenu28 = new ShopMenu28();
  shopMenu29 = new ShopMenu29();
  openMenuButton = new Button(width*0.01,height*0.02,32,32,"magenta",uiImages[5]);
  waterVisable = backgroundImages[1];
  groundVisable = backgroundImages[0];
}

function createSprites(){
  for(let i =0; i<95;i++){ //button images
    buttonImages[i].resizeNN(40,40);
  }
  for(let i =0; i<5;i++){ //plant images
    plantImages[i].resizeNN(384,512);
  }
  for(let i =6; i<34;i++){ //plant images
    plantImages[i].resizeNN(64,64);
  }
  for(let i =0; i<6;i++){ //plant images
    backgroundImages[i].resizeNN(800,400);
  }
  // decorImages[34].resizeNN(96,64);
  // decorImages[35].resizeNN(96,64);
  uiImages[9].resizeNN(64,32);
  uiImages[5].resizeNN(32,32);
  //fish
  tinyFishO = loadAnimation(fishImages[0], { frameSize: [16, 16], frames: 32 });
  tinyFishPi = loadAnimation(fishImages[1], { frameSize: [16, 16], frames: 32 });
  tinyFishPu = loadAnimation(fishImages[2], { frameSize: [16, 16], frames: 32 });
  tinyFishR = loadAnimation(fishImages[3], { frameSize: [16, 16], frames: 32 });
  smallFishB = loadAnimation(fishImages[4], { frameSize: [32, 16], frames: 32 });
  smallFishG = loadAnimation(fishImages[5], { frameSize: [32, 16], frames: 32 });
  smallFishO = loadAnimation(fishImages[6], { frameSize: [32, 16], frames: 32 });
  smallFishP = loadAnimation(fishImages[7], { frameSize: [32, 16], frames: 32 });
  longFishB = loadAnimation(fishImages[8], { frameSize: [32, 16], frames: 32 });
  longFishP = loadAnimation(fishImages[9], { frameSize: [32, 16], frames: 32 });
  longFishO = loadAnimation(fishImages[10], { frameSize: [32, 16], frames: 32 });
  longFishR = loadAnimation(fishImages[11], { frameSize: [32, 16], frames: 32 });
  jellyP = loadAnimation(fishImages[18], { frameSize: [32, 16], frames: 4 });
  jellyB = loadAnimation(fishImages[19], { frameSize: [32, 16], frames: 4 });
  sawshark = loadAnimation(fishImages[13], { frameSize: [48, 32], frames: 16 });
  angler = loadAnimation(fishImages[14], { frameSize: [32, 32], frames: 16 });
  shark = loadAnimation(fishImages[15], { frameSize: [32, 32], frames: 16 });
  swordfish = loadAnimation(fishImages[16], { frameSize: [48, 32], frames: 8 });
  squidR = loadAnimation(fishImages[20], { frameSize: [32, 16], frames: 4 });
  squidP = loadAnimation(fishImages[21], { frameSize: [32, 16], frames: 4 });
  //decor
  bubbles = loadAnimation(decorImages[0], { frameSize: [8, 8], frames: 8 });
  chest1 = loadAnimation(decorImages[34], { frameSize: [16, 32], frames: 3 });
  chest2 = loadAnimation(decorImages[35], { frameSize: [16, 32], frames: 3 });
  //seaweed
  seaweed1= loadAnimation(plantImages[0], { frameSize: [32, 64], frames: 96 });
  seaweed2= loadAnimation(plantImages[1], { frameSize: [32, 64], frames: 96 });
  seaweed3= loadAnimation(plantImages[2], { frameSize: [32, 64], frames: 96 });
  seaweed4= loadAnimation(plantImages[3], { frameSize: [32, 64], frames: 96 });
  seaweed5= loadAnimation(plantImages[4], { frameSize: [32, 64], frames: 96 });
}

function draw() {
  if(!programStarted){
    if(totalCounter<202){
      fill(255,0,0);
      rect(0,0,width,height);
    }
    else{
      createSprites();
      programStarted = true;
    }  
  }
  else{
    if(startMenu){
      image(startMenuImg,0,0);
      if(isTriggered){
        startMenu = false;
      }
    }
    else{
      clear();
      image(waterVisable,0,0);
      image(groundVisable,0,0);
      openMenuButton.update();
      openMenuButton.draw();
      for(p of previewTest){
        p.preview();
      }
      for(f of fishInAquarium){
        f.draw();
        f.move();
      }
      for(i of stationaryInAquarium){
        i.draw();
      }
      for(i of AniStillInAquarium){
        i.draw();
      }
      chooseMenu();
      fill(4, 94, 219);
      strokeWeight(3);
      stroke(255);
      rectMode(CENTER);
      rect(width/2,30,80,25)
      noStroke();
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text(money,width/2,37);
      rectMode(CORNER);
    }
  }
}

function mousePressed(){
  isTriggered = true;
}

function mouseReleased(){
  isTriggered = false;
}

function chooseMenu(){
  if(openMenuButton.state === true){
    menuOn=1;
  }
  if(menuOn===1){
    shopMenu1.update();
    shopMenu1.draw();
  }
  if(menuOn===2){
    shopMenu2.update();
    shopMenu2.draw();
  }
  if(menuOn===3){
    shopMenu3.update();
    shopMenu3.draw();
  }
  if(menuOn===4){
    shopMenu4.update();
    shopMenu4.draw();
  }
  if(menuOn===5){
    shopMenu5.update();
    shopMenu5.draw();
  }
  if(menuOn===6){
    shopMenu6.update();
    shopMenu6.draw();
  }
  if(menuOn===7){
    shopMenu7.update();
    shopMenu7.draw();
  }
  if(menuOn===8){
    shopMenu8.update();
    shopMenu8.draw();
  }
  if(menuOn===9){
    shopMenu9.update();
    shopMenu9.draw();
  }
  if(menuOn===10){
    shopMenu10.update();
    shopMenu10.draw();
  }
  if(menuOn===11){
    shopMenu11.update();
    shopMenu11.draw();
  }
  if(menuOn===12){
    shopMenu12.update();
    shopMenu12.draw();
  }
  if(menuOn===13){
    shopMenu13.update();
    shopMenu13.draw();
  }
  if(menuOn===14){
    shopMenu14.update();
    shopMenu14.draw();
  }
  if(menuOn===15){
    shopMenu15.update();
    shopMenu15.draw();
  }
  if(menuOn===16){
    shopMenu16.update();
    shopMenu16.draw();
  }
  if(menuOn===17){
    shopMenu17.update();
    shopMenu17.draw();
  }
  if(menuOn===18){
    shopMenu18.update();
    shopMenu18.draw();
  }
  if(menuOn===19){
    shopMenu19.update();
    shopMenu19.draw();
  }
  if(menuOn===20){
    shopMenu20.update();
    shopMenu20.draw();
  }
  if(menuOn===21){
    shopMenu21.update();
    shopMenu21.draw();
  }
  if(menuOn===22){
    shopMenu22.update();
    shopMenu22.draw();
  }
  if(menuOn===23){
    shopMenu23.update();
    shopMenu23.draw();
  }
  if(menuOn===24){
    shopMenu24.update();
    shopMenu24.draw();
  }
  if(menuOn===25){
    shopMenu25.update();
    shopMenu25.draw();
  }
  if(menuOn===26){
    shopMenu26.update();
    shopMenu26.draw();
  }
  if(menuOn===27){
    shopMenu27.update();
    shopMenu27.draw();
  }
  if(menuOn===28){
    shopMenu28.update();
    shopMenu28.draw();
  }
  if(menuOn===29){
    shopMenu29.update();
    shopMenu29.draw();
  }
}

class Fish{
  constructor(x,y,fish){
    this.x = x;
    this.y = y;
    this.fish = fish;
    this.speed = 3;
  }

  draw(){
    animation(this.fish, this.x, this.y);
  }
  move(){
    if(this.x > width || this.x<0){
      this.fish.scale.x *=-1;
      this.speed*=-1;
    }
    this.x += this.speed;
  }
}

class Stationary{
  constructor(x,y,item){
    this.x= x;
    this.y = y;
    this.item = item;
  }

  draw(){
    image(this.item,this.x,this.y);
  }
}

class AnimatedStill{
  constructor(x,y,item){
    this.x= x;
    this.y = y;
    this.item = item;
  }

  draw(){
    animation(this.item,this.x,this.y);
  }
}

class Button{
  constructor(x,y,w,h,color,image){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.image = image;

    this.state = false;
  }

  draw(){
    if(this.state===false){
      image(this.image,this.x,this.y);
    }
    else{
      fill("green");
      rect(this.x,this.y,this.w,this.h);
    }
  }

  update(){
    if(mouseX>this.x && mouseX<(this.x+this.w)&&mouseY>this.y&&mouseY<this.y+this.h&&isTriggered===true){
      this.state = true;
      isTriggered = false;
    }
    else{
      this.state = false;
    }
  }

}

class FishPreview{ //if the item is animated and a fish
  constructor(item,price){
    this.item = item;
    this.price = price
  }

  preview(){
    if(previewMode){
      menuOn=0;
      image(uiImages[9],width-32,0);
      animation(this.item,mouseX,mouseY)
      if(mousePressed&&isTriggered&&mouseX>width-32&&mouseX<width&&mouseY>0&&mouseY<64){
        previewMode = false;
        previewTest.pop();
      }
      else if(mousePressed&&isTriggered){
        if(money-this.price>=0){
          money = money-this.price;
          previewMode = false;
          previewTest.pop();
          fishInAquarium.push(new Fish(mouseX,mouseY,this.item));
        }
        else{
          previewMode = false;
          previewTest.pop();
        }
      }
    }
  }
}

class Preview{ //if the item is not animated
  constructor(item,price){
    this.item = item;
    this.price = price;
  }

  preview(){
    if(previewMode){
      menuOn=0;
      image(uiImages[9],width-32,0);
      image(this.item,mouseX,mouseY);
      if(mousePressed&&isTriggered&&mouseX>width-32&&mouseX<width&&mouseY>0&&mouseY<64){
        previewMode = false;
        previewTest.pop();
      }
      else if(mousePressed&&isTriggered){
        if(money-this.price>=0){
          money = money-this.price;
          previewMode = false;
          previewTest.pop();
          stationaryInAquarium.push(new Stationary(mouseX,mouseY,this.item));
        }
        else{
          previewMode = false;
          previewTest.pop();
        }
      }
    }
  }
}

class AniPreview{ //if the item is animated but standing still
  constructor(item,price){
    this.item = item;
    this.price = price;
  }

  preview(){
    if(previewMode){
      menuOn=0;
      image(uiImages[9],width-32,0);
      animation(this.item,mouseX,mouseY)
      if(mousePressed&&isTriggered&&mouseX>width-32&&mouseX<width&&mouseY>0&&mouseY<64){
        previewMode = false;
        previewTest.pop();
      }
      else if(mousePressed&&isTriggered){
        if(money-this.price>=0){
          money = money-this.price;
          previewMode = false;
          previewTest.pop();
          AniStillInAquarium.push(new AnimatedStill(mouseX,mouseY,this.item));
        }
        else{
          previewMode = false;
          previewTest.pop();
        }
      }
    }
  }
}

class Menu{
  constructor(){
    this.buttons = [];
  }

  draw(){
    strokeWeight(3);
    stroke(255);
    fill(200);
    rect(0,height*0.8,width,height*0.2);
    for(let i = 0;i<this.buttons.length;i++){
      this.buttons[i].update();
      this.buttons[i].draw();
    }
  }

}

class ShopMenu1 extends Menu{ //Main shop menu,, pick which TYPE of item
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]))
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"red",buttonImages[43]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"blue",buttonImages[12]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"purple",buttonImages[67]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"yellow",buttonImages[51]));
  }

  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 2;
    }
    if(this.buttons[2].state===true){
      menuOn = 3;
    }
    if(this.buttons[3].state===true){
      menuOn = 4;
    }
    if(this.buttons[4].state===true){
      menuOn = 5;
    }

  }

}

class ShopMenu2 extends Menu{ //FISH MAIN MENU
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3])); //exit
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1])); //back
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"orange",buttonImages[44])); //fish
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"green",buttonImages[33])); //shark
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"purple",buttonImages[35])); //other
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 1;
    }
    if(this.buttons[2].state===true){
      menuOn = 6;
    }
    if(this.buttons[3].state===true){
      menuOn = 26;
    }
    if(this.buttons[4].state===true){
      menuOn = 27;
    }
  }
}


class ShopMenu3 extends Menu{ //DECOR MAIN MENU
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"teal",buttonImages[59]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"purple",buttonImages[57]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"blue",buttonImages[22]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 1;
    }
    if(this.buttons[2].state===true){
      menuOn = 10;
    }
    if(this.buttons[3].state===true){
      menuOn = 11;
    }
    if(this.buttons[4].state===true){
      menuOn = 12;
    }
  }
}

class ShopMenu4 extends Menu{ //PLANTS MAIN MENU
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"pink",buttonImages[67]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"coral",buttonImages[63]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 1;
    }
    if(this.buttons[2].state===true){
      menuOn = 18;
    }
    if(this.buttons[3].state===true){
      menuOn = 19;
    }
  }
  
}

class ShopMenu5 extends Menu{ //BACKGROUND MAIN MENU
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"teal",buttonImages[53]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"blue",buttonImages[51]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 1;
    }
    if(this.buttons[2].state===true){
      menuOn = 24;
    }
    if(this.buttons[3].state===true){
      menuOn = 25;
    }
  }
}

class ShopMenu6 extends Menu{ //types of fish
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3])); //exit
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1])); //back
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"black",buttonImages[42])); //tiny
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"white",buttonImages[46])); //normal
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"gray",buttonImages[50])); //long
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 2;
    }
    if(this.buttons[2].state===true){
      menuOn = 7;
    }
    if(this.buttons[3].state===true){
      menuOn = 8;
    }
    if(this.buttons[4].state===true){
      menuOn = 9;
    }
  }
}

class ShopMenu7 extends Menu{ //tiny fish colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"orange",buttonImages[39]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"orange",buttonImages[40]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"orange",buttonImages[41]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"orange",buttonImages[42]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 6;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(tinyFishO,30));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(tinyFishR,30));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(tinyFishPi,30));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(tinyFishPu,30));
    }
  }
}

class ShopMenu8 extends Menu{ //normal fish colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"purple",buttonImages[43]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"purple",buttonImages[44]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"purple",buttonImages[45]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"purple",buttonImages[46]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 6;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(longFishO,50));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(longFishR,50));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(longFishB,50));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(longFishP,50));
    }
  }
}

class ShopMenu9 extends Menu{ //long fish colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"pink",buttonImages[47]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"pink",buttonImages[48]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"pink",buttonImages[49]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"pink",buttonImages[50]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 6;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(smallFishO,40));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(smallFishG,40));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(smallFishP,40));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(smallFishB,40));
    }
  }
}

class ShopMenu10 extends Menu{ //bubble and clam
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"pink",buttonImages[60]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"pink",buttonImages[59]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 3;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[2],30));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(bubbles,15));
    }
  }
}

class ShopMenu11 extends Menu{ //chest options
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"yellow",buttonImages[57]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"yellow",buttonImages[58]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 3;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(chest1,300));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(chest2,300));
    }
  }
}

class ShopMenu12 extends Menu{ //shell shapes
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"blue",buttonImages[4]));
    this.buttons.push(new Button(width*0.35,height*0.85,40,40,"cyan",buttonImages[10]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"blue",buttonImages[16]));
    this.buttons.push(new Button(width*0.65,height*0.85,40,40,"cyan",buttonImages[22]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"blue",buttonImages[28]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 3;
    }
    if(this.buttons[2].state===true){
      menuOn = 13;
    }
    if(this.buttons[3].state===true){
      menuOn = 14;
    }
    if(this.buttons[4].state===true){
      menuOn = 15;
    }
    if(this.buttons[5].state===true){
      menuOn = 16;
    }
    if(this.buttons[6].state===true){
      menuOn = 17;
    }
  }
}

class ShopMenu13 extends Menu{ //shell colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.12,height*0.85,40,40,"blue",buttonImages[1]));
    this.buttons.push(new Button(width*0.28,height*0.85,40,40,"blue",buttonImages[2]));
    this.buttons.push(new Button(width*0.44,height*0.85,40,40,"blue",buttonImages[3]));
    this.buttons.push(new Button(width*0.60,height*0.85,40,40,"blue",buttonImages[4]));
    this.buttons.push(new Button(width*0.76,height*0.85,40,40,"blue",buttonImages[5]));
    this.buttons.push(new Button(width*0.92,height*0.85,40,40,"blue",buttonImages[6]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 12;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[4],25));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[5],25));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[6],25));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[7],25));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[8],25));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[9],25));
    }
  }
}

class ShopMenu14 extends Menu{ //shell colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.12,height*0.85,40,40,"pink",buttonImages[7]));
    this.buttons.push(new Button(width*0.28,height*0.85,40,40,"pink",buttonImages[8]));
    this.buttons.push(new Button(width*0.44,height*0.85,40,40,"pink",buttonImages[9]));
    this.buttons.push(new Button(width*0.60,height*0.85,40,40,"pink",buttonImages[10]));
    this.buttons.push(new Button(width*0.76,height*0.85,40,40,"pink",buttonImages[11]));
    this.buttons.push(new Button(width*0.92,height*0.85,40,40,"pink",buttonImages[12]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 12;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[10],25));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[11],25));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[12],25));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[13],25));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[14],25));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[15],25));
    }
  }
}

class ShopMenu15 extends Menu{ //shell colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.12,height*0.85,40,40,"purple",buttonImages[13]));
    this.buttons.push(new Button(width*0.28,height*0.85,40,40,"purple",buttonImages[14]));
    this.buttons.push(new Button(width*0.44,height*0.85,40,40,"purple",buttonImages[15]));
    this.buttons.push(new Button(width*0.60,height*0.85,40,40,"purple",buttonImages[16]));
    this.buttons.push(new Button(width*0.76,height*0.85,40,40,"purple",buttonImages[17]));
    this.buttons.push(new Button(width*0.92,height*0.85,40,40,"purple",buttonImages[18]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 12;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[16],25));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[17],25));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[18],25));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[19],25));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[20],25));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[21],25));
    }
  }
}

class ShopMenu16 extends Menu{ //shell colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.12,height*0.85,40,40,"orange",buttonImages[19]));
    this.buttons.push(new Button(width*0.28,height*0.85,40,40,"orange",buttonImages[20]));
    this.buttons.push(new Button(width*0.44,height*0.85,40,40,"orange",buttonImages[21]));
    this.buttons.push(new Button(width*0.60,height*0.85,40,40,"orange",buttonImages[22]));
    this.buttons.push(new Button(width*0.76,height*0.85,40,40,"orange",buttonImages[23]));
    this.buttons.push(new Button(width*0.92,height*0.85,40,40,"orange",buttonImages[24]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 12;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[22],25));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[23],25));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[24],25));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[25],25));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[26],25));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[27],25));
    }
  }
}

class ShopMenu17 extends Menu{ //shell colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.12,height*0.85,40,40,"red",buttonImages[25]));
    this.buttons.push(new Button(width*0.28,height*0.85,40,40,"red",buttonImages[26]));
    this.buttons.push(new Button(width*0.44,height*0.85,40,40,"red",buttonImages[27]));
    this.buttons.push(new Button(width*0.60,height*0.85,40,40,"red",buttonImages[28]));
    this.buttons.push(new Button(width*0.76,height*0.85,40,40,"red",buttonImages[29]));
    this.buttons.push(new Button(width*0.92,height*0.85,40,40,"red",buttonImages[30]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 12;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[28],25));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[29],25));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[30],25));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[31],25));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[32],25));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(decorImages[33],25));
    }
  }
}

class ShopMenu18 extends Menu{ //coral options
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"orange",buttonImages[75]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"yellow",buttonImages[76]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"purple",buttonImages[77]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"green",buttonImages[78]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 4;
    }
    if(this.buttons[2].state===true){
      menuOn = 20;
    }
    if(this.buttons[3].state===true){
      menuOn = 21;
    }
    if(this.buttons[4].state===true){
      menuOn = 22;
    }
    if(this.buttons[5].state===true){
      menuOn = 23;
    }
  }
}

class ShopMenu19 extends Menu{ //seaweed
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"red",buttonImages[61]));
    this.buttons.push(new Button(width*0.35,height*0.85,40,40,"red",buttonImages[62]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"red",buttonImages[63]));
    this.buttons.push(new Button(width*0.65,height*0.85,40,40,"red",buttonImages[64]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"red",buttonImages[65]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 4;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(seaweed1,50));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(seaweed2,50));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(seaweed3,50));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(seaweed4,50));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new AniPreview(seaweed5,50));
    }
  }
}

class ShopMenu20 extends Menu{ //coral 1
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"orange",buttonImages[67]));
    this.buttons.push(new Button(width*0.3,height*0.85,40,40,"orange",buttonImages[71]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"orange",buttonImages[75]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"orange",buttonImages[79]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"orange",buttonImages[83]));
    this.buttons.push(new Button(width*0.7,height*0.85,40,40,"orange",buttonImages[87]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"orange",buttonImages[91]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 18;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[6],75));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[10],75));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[14],75));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[18],75));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[22],75));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[26],75));
    }
    if(this.buttons[8].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[30],75));
    }
  }
}

class ShopMenu21 extends Menu{ //coral 2
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"green",buttonImages[68]));
    this.buttons.push(new Button(width*0.3,height*0.85,40,40,"green",buttonImages[72]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"green",buttonImages[76]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"green",buttonImages[80]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"green",buttonImages[84]));
    this.buttons.push(new Button(width*0.7,height*0.85,40,40,"green",buttonImages[88]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"green",buttonImages[92]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 18;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[7],75));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[11],75));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[15],75));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[19],75));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[23],75));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[27],75));
    }
    if(this.buttons[8].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[31],75));
    }
  }
}

class ShopMenu22 extends Menu{ //coral 3
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"pink",buttonImages[69]));
    this.buttons.push(new Button(width*0.3,height*0.85,40,40,"pink",buttonImages[73]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"pink",buttonImages[77]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"pink",buttonImages[81]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"pink",buttonImages[85]));
    this.buttons.push(new Button(width*0.7,height*0.85,40,40,"pink",buttonImages[89]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"pink",buttonImages[93]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 18;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[8],50));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[12],50));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[16],50));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[20],50));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[24],50));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[28],50));
    }
    if(this.buttons[8].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[32],50));
    }
  }
}

class ShopMenu23 extends Menu{ //coral 3
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"pink",buttonImages[70]));
    this.buttons.push(new Button(width*0.3,height*0.85,40,40,"pink",buttonImages[74]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"pink",buttonImages[78]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"pink",buttonImages[82]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"pink",buttonImages[86]));
    this.buttons.push(new Button(width*0.7,height*0.85,40,40,"pink",buttonImages[90]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"pink",buttonImages[94]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 18;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[9],50));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[13],50));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[17],50));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[21],50));
    }
    if(this.buttons[6].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[25],50));
    }
    if(this.buttons[7].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[29],50));
    }
    if(this.buttons[8].state===true){
      previewMode = true;
      previewTest.push(new Preview(plantImages[33],50));
    }
  }
}

class ShopMenu24 extends Menu{ //water colors
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"red",buttonImages[52]));
    this.buttons.push(new Button(width*0.35,height*0.85,40,40,"red",buttonImages[53]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"red",buttonImages[54]));
    this.buttons.push(new Button(width*0.65,height*0.85,40,40,"red",buttonImages[55]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"red",buttonImages[56]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 5;
    }
    if(this.buttons[2].state===true){
      if(money-0>=0){
        waterVisable = backgroundImages[1];
      }
    }
    if(this.buttons[3].state===true){
      if(money-100>=0){
        money = money-100;
        waterVisable = backgroundImages[2];
      }
    }
    if(this.buttons[4].state===true){
      if(money-100>=0){
        money = money-100;
        waterVisable = backgroundImages[3];
      }
    }
    if(this.buttons[5].state===true){
      if(money-100>=0){
        money = money-100;
        waterVisable = backgroundImages[4];
      }
    }
    if(this.buttons[6].state===true){
      if(money-100>=0){
        money = money-100;
        waterVisable = backgroundImages[5];
      }
    }
  }
}

class ShopMenu25 extends Menu{ //ground types
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.5,height*0.85,40,40,"red",buttonImages[51]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 5;
    }
  }
}

class ShopMenu26 extends Menu{ //sharks
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.2,height*0.85,40,40,"teal",buttonImages[31]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"blue",buttonImages[32]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"blue",buttonImages[33]));
    this.buttons.push(new Button(width*0.8,height*0.85,40,40,"blue",buttonImages[34]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 2;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(angler,200));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(swordfish,120));
    }
    if(this.buttons[4].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(shark,150));
    }
    if(this.buttons[5].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(sawshark,150));
    }
  }
}

class ShopMenu27 extends Menu{ //other
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"purple",buttonImages[35]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"purple",buttonImages[38]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 2;
    }
    if(this.buttons[2].state===true){
      menuOn = 28;
    }
    if(this.buttons[3].state===true){
      menuOn = 29;
    }
  }
}

class ShopMenu28 extends Menu{ //other
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"blue",buttonImages[35]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"blue",buttonImages[36]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 27;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(jellyP,70));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(jellyB,70));
    }
  }
}

class ShopMenu29 extends Menu{ //other
  constructor(){
    super();
    this.buttons.push(new Button(width*0.01,height*0.81,10,10,"red",uiImages[3]));
    this.buttons.push(new Button(width*0.03,height*0.81,10,10,"yellow",uiImages[1]));
    this.buttons.push(new Button(width*0.4,height*0.85,40,40,"yellow",buttonImages[37]));
    this.buttons.push(new Button(width*0.6,height*0.85,40,40,"yellow",buttonImages[38]));
  }
  update(){
    if(this.buttons[0].state === true){
      menuOn = 0;
    }
    if(this.buttons[1].state===true){
      menuOn = 27;
    }
    if(this.buttons[2].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(squidR,70));
    }
    if(this.buttons[3].state===true){
      previewMode = true;
      previewTest.push(new FishPreview(squidP,70));
    }
  }
}