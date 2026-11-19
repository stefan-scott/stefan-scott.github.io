// Plants vs Zombies Capstone Project
//By Arman and Abdullah
// May 12 / 2026



//
//
//
//
//Feed back
// really cool! - Adela
//A cool PvZ clone with potnetial - Iskander
// Raly good, well made and is fun, would love to see instructions added 
// and the stars get stuck at the boutome so have end time for them Muhammad ismail, 

//Global Variables

//Menu
let menuImg;
let menuText;
let gameOn = false;
let button;

//Character bar
let sunImg;
let sunScore = 0;
let textX = 70;

let currentPlant;

//Timers
let sunStart; let sunCurrent;
let sunElapsed;

let zombieStart; let zombieCurrent;
let zombieElapsed;



let suns = []; //Keep the suns in an array

//
let sunX; let sunY;

//Grid
let grid = [];

//
let selectedPlant; let plantAttack;
let plants = [];

//---------------------------Pea Shooter-----------------------------------------
let peaIdle = []; peaShoot = [];

//---------------------------Chomper-------------------------------
let chomperIdle = []; chomperAttack = [];
let chomperChew = [];

//--------------------------Kernelpult-------------------------
let kernelIdle = []; let kernelAttack = []

//---------------------------Wallnut=--------------------------
let wallnutIdle = []; let wallnutCracked1 = [];
let wallnutCracked2 = [];

//-------------------------Sunflower---------------------------
let sunflowerIdle = []; let sunflowerGlow = [];


//Zombies
let zombies = [];
let zombieCount=0;
let currentState = "walking"
let zombiesWalk = [];
let zombieEats = [];

let zombiesWalkOneArm = [];



async function loadAssets(){
  //Fill pea Idle
  for (let i = 1; i < 15; i++) {
    peaShoot.push(loadImage("./assets/Pea Shooter/Shooting/pea-shooting"+i+".png"));
  }

  for (let i = 1; i < 14; i++) {
    peaIdle.push(loadImage("./assets/Pea Shooter/Idle/pea-idle" + i + ".png"));
  }

  for (let i = 1; i < 13; i++) {
    zombiesWalk.push(loadImage("./assets/Zombies/Walk/Zombie idle " + i + ".png"));
  }

  for (let i = 1; i < 7; i++) {
    zombiesWalkOneArm.push(loadImage("./assets/Zombies/Walk/One arm/Zombie dying "+ i+".png"));
  }

  for (let i = 1; i < 8; i++) {
    zombieEats.push(loadImage("./assets/Zombies/Eat/No Damage/zombie-eating" + i + ".png"));
  }
  
  for (let i = 1; i < 5; i++) {
    chomperIdle.push(loadImage("./assets/Chomper/Idle/Chomper-idle"+ i+ ".png"));
  }

  for (let i = 1; i < 7; i++) {
    chomperAttack.push(loadImage("./assets/Chomper/Attack/chomper-attack"+i+".png"));
  }

  for (let i = 1; i < 10; i++) {
    chomperChew.push(loadImage("./assets/Chomper/Swallow/chomper-swallow"+i+".png"));
  }

  for (let i = 1; i < 8; i++) {
    kernelIdle.push(loadImage("./assets/Kernelpult/Idle/kernelpult-idle"+i+".png"));
  }

  for (let i = 1; i < 7; i++) {
    kernelAttack.push(loadImage("./assets/Kernelpult/Attack/kernepult-attack"+i+".png"))
  }

  
  wallnutIdle.push(loadImage("./assets/Wallnut/No damage/The  Big Nut 1.png"))
  wallnutIdle.push(loadImage("./assets/Wallnut/No damage/The Big Nut 2.png"))
  wallnutIdle.push(loadImage("./assets/Wallnut/No damage//The Big Nut 3.png"))
  

  wallnutCracked2.push(loadImage("./assets/Wallnut/Cracked 2/CN 4.png"))
  wallnutCracked2.push(loadImage("./assets/Wallnut/Cracked 2/CN 5.png"))
  wallnutCracked2.push(loadImage("./assets/Wallnut/Cracked 2/CN 6.png"))
  
  menuImg = loadImage("./assets/Menu/menu.png");
  menuText = loadImage("./assets/Menu/menu-text.webp");

  sunImg = loadImage("./assets/Character Bar/Sun_PvZ2.png");

  for (let i = 1; i < 7; i++) {
    sunflowerIdle.push(loadImage("./assets/Sunflower/Idle/sunflower-idle"+i+".png"))
  }

  for (let i = 1; i < 4; i++) {
    sunflowerGlow.push(loadImage("./assets/Sunflower/Glow/glow"+i+".png"))
  }
}



async function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  await loadAssets();
  button  = createButton("Play !");
  sunStart = millis();
  zombieStart = millis();
  sunX = random(width);
  sunY = 0;



  grid = [
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0],
    [0,1,0,1,0,1,0,1,0,1]
  ];
}

function drawGrid(grid) {

  let cellW = width / 10;
  let cellH = (height - 150) / 7; //Without the character bar 

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

      if (grid[y][x] === 1) {
        fill(0, 169, 44);
      } else {
        fill(0, 205, 61);
      }

      rect(
        x * cellW,
        150 + y * cellH,
        cellW,
        cellH
      );
    }
  }
}

function charactersBar() {

  //The bar
  strokeWeight(10);
  stroke(153, 95, 47);
  fill(98, 43, 20);
  for (let i = 0; i < 900; i+= 150) {
    square(i,0,150);
  }

  //Sun box
  fill(255);
  noStroke();
  image(sunImg,75,60,100,100);
  textSize(20);
  textAlign(CENTER, CENTER);
  text(sunScore,75,130);

  //Pea Shooter
  image(peaIdle[0],225,60,100,100);
  text("150",225,130);

  //Chomper
  image(chomperIdle[0],385,60,100,100);
  text("300",375,130);

  //Kernel
  image(kernelIdle[0],525,60,100,100);
  text("250",525,130);

  //Wallnut
  image(wallnutIdle[0],675,60,100,100);
  text("100",675,130);

  //Sunflower
  image(sunflowerIdle[0],815,60,100,100);
  text("50",825,130);
}

function draw() {
  //Timer for suns
  sunCurrent = millis();
  sunElapsed =sunCurrent - sunStart;

  //Timer for Zombie spawn
  zombieCurrent = millis();
  zombieElapsed = zombieCurrent - zombieStart;

  
  background(220);
  

  
   if (!gameOn) {
    menu()
  }
   else{
  drawGrid(grid);
  charactersBar();
  display()
  pickCharacter();
  eat();
  shoot();
      
  if (sunElapsed > 3000) { //Generate new sun every 5 seconds
    sunStart = millis();
    suns.push({x:round(random(width)), y:0});
  }

  if (zombieElapsed > 6000) { //Generate new sun every 5 seconds
    zombieStart = millis();
    generateZombie();
  }
      
      
  fallSun();
    
  //}
}
}

function mousePressed() { 
  collectSun();

  // Clicking Pea Shooter in character bar
  if (
    mouseX >= 150 &&
    mouseX <= 300 &&
    mouseY >= 0 &&
    mouseY <= 150  &&
    sunScore >= 150
  ) {
    selectedPlant = peaIdle;
    plantAttack = peaShoot;
    sunScore -= 150;
    currentPlant = "Pea";
    return;
  }

  if (
    mouseX >= 300 &&
    mouseX <= 450 &&
    mouseY >= 0 &&
    mouseY <= 150  &&
    sunScore >= 250
  ) {
    selectedPlant = chomperIdle;
    plantAttack = chomperAttack;
    sunScore -= 150;
    currentPlant = "Chomper";
    return;
  }

  if (
    mouseX >= 450 &&
    mouseX <= 600 &&
    mouseY >= 0 &&
    mouseY <= 150  &&
    sunScore >= 250
  ) {
    selectedPlant = kernelIdle;
    plantAttack = kernelAttack;
    sunScore -= 250;
    currentPlant = "Kernel";
    return;
  }

  if (
    mouseX >= 600 &&
    mouseX <= 750 &&
    mouseY >= 0 &&
    mouseY <= 150  &&
    sunScore >= 100
  ) {
    selectedPlant = wallnutIdle;
    sunScore -= 100;
    currentPlant = "Wallnut";
    return;
  }

  if (
    mouseX >= 750 &&
    mouseX <= 900 &&
    mouseY >= 0 &&
    mouseY <= 150  &&
    sunScore >= 50
  ) {
    selectedPlant = sunflowerIdle;
    sunScore -= 50;
    currentPlant = "Sunflower";
    return;
  }


  placeCharacter();
 


}

