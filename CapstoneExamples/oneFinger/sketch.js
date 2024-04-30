// Capstone Project: One Finger Death Punch Clone
// Isaac Munro
// Due End of Semester 

let startTime;
let elapsedTime;

let animationL;
let backgroundPainting;

let enemyLeft = false;
let enemyRight = false;

let playerHP = 20;
let rightside = [];
let leftside = [];
let killcount = 0;
let maxenemy = 30;
let curenemy = 0;
let paused = false;
let enemySpeed = 2;

let diffInput;
let diffSet = false;

function preload(){
  animationL = loadImage("assets/runningR.gif");
  backgroundPainting = loadImage("assets/background.jpg");
}


function setup() {
  imageMode(CENTER);
  
  startTime = millis();
  createCanvas(1000, 1000);
  document.addEventListener("contextmenu", event => event.preventDefault()); // disable default Rclick
}

function draw() {
  background(220);
  if(diffInput === "EASY" && diffSet ===false){ // makes the game easier or harder to win by adjusting variables
    maxenemy = 35;
    playerHP  = 30;
    diffSet = true;
  }
  else if(diffInput === "NORMAL" && diffSet ===false){
    maxenemy = 60;
    playerHP = 15;
    enemySpeed = 6;
    diffSet = true;
  }
  else if(diffInput ==="HARD" && diffSet === false){
    maxenemy = 80;
    playerHP = 10;
    enemySpeed = 8;
    diffSet = true;
  }
  drawTerrain();
  displayUI();
  destroyEnemies();
  elapsedTime = millis()-startTime;
  let choice = Math.floor(random(2));
  if(elapsedTime > 2000 && curenemy < maxenemy  && paused ===false){
    if(choice ===1){
      rightside.push(new Enemy(Math.floor(random(3)), width, height/2, 1, enemySpeed));
    }
    else{
      leftside.push(new Enemy(Math.floor(random(3)), 0, height/2, 0, enemySpeed));
    }
    startTime = millis();
    curenemy+=1;
  }
  
  if(playerHP ===0 || playerHP < 0){  
    gameOver();
  }
  else{
    for(let rs of rightside){
      rs.action();
    }
    for(let ls of leftside){
      ls.action();
    }
  }

  if (enemyRight===true){
    fill(255,0,0);
    rect(width/2, height/2, 200, 20);
    fill(0,0,0);
  }
  else if(enemyRight===false){
    fill(255,255,255);
    rect(width/2, height/2, 200, 20);
    fill(0,0,0);
  }

  if(enemyLeft===true){
    fill(0,0,255);
    rect(300,height/2,200,20);
    fill(0,0,0);
  }
  else if(enemyLeft===false){
    fill(255,255,255);
    rect(300,height/2,200,20);
    fill(0,0,0);
  }
}



function displayUI(){ // generates text of tracking variables (kills, speed, hp)
  textSize(20);
  fill(255);
  stroke(0);
  strokeWeight(4);
  if(paused ===true){
    text("GAME PAUSED", width/2, height*0.35);
  }
  text("Speed:" + str(enemySpeed), width*0.8, height*0.3);
  text("HP:" + str(playerHP), width/2, height*0.3);
  text("Kills:" + str(killcount), width*0.2, height*0.3);
  text("P and u for pause/unpause, i and d for speed up/down, r to restart", width*0.4, height*0.2);
  text("Enemies Remaining: " + str(maxenemy-killcount), width/2,height*0.4);
  text("Input Difficulty; E for EASY, N for NORMAL, H for HARD", height/3,width/2);
}

function drawTerrain(){ // creates terrain for Player + npcs to exist on
  
  strokeWeight(2);
  rect(0,height/2, 1000, height*0.6);
  
  fill(255);
  rect(300, width/2, 400, 20);  // zone to kill enemies
  fill(0,0,0);
  image(backgroundPainting,0,0,width*2,height);
}

class Enemy{  // base class for enemy npcs

  constructor(type,x,y,dir,speed){
    this.type = type;
    this.x = x;
    this.y = y;
    this.dir = dir; // moving direction 
    
    this.speed = speed;
    this.alive = true;
    this.pause = false;
    this.hp;

    this.mustSwitch =false;

    this.zone = false;
    if(type ===0){
      this.hp =1;
    }
    else if (type===1){
      this.hp =2;
    }
    else if (type===2){
      this.hp =3;
    }
    
  }

  // class functions

  display(){  // shows enemies on screen
    fill(0,0,0);
    if(this.hp===1){  // basic 1hp guy
      fill(0,255,0);
      image(animationL,this.x,this.y-10, 45,30);
      fill(255,0,0);
      rect(this.x-10, this.y, 20, 20); // hp block
      fill(0,0,0);

    }
    else if(this.hp ===2){
      fill(0,255,0);
      image(animationL,this.x,this.y-10, 45,30);
      fill(255,0,0);
      rect(this.x-10, this.y, 20, 20); // hp block
      rect(this.x-10, this.y+20, 20,20);
      fill(0,0,0);
      
    }
    else if(this.hp ===3){
      fill(0,255,0);
      image(animationL,this.x,this.y-10, 45,30);
      fill(255,0,0);
      rect(this.x-10, this.y, 20, 20); // hp block
      rect(this.x-10, this.y+20, 20,20);
      fill(0,0,255);
      rect(this.x-10, this.y+40, 20, 20);
      fill(0,0,0);
    }

  }



  move(){
    if(this.dir ===0){  // direction moving right
      this.x+= this.speed;
      if(this.x> 300 && this.x<width/2){
        
        this.zone = true;
        if(this.x>490) { // checks if enemy is within 10px of Player, does damage and destroys if yes
          playerHP -=this.hp;
          killcount+=1;
          this.alive = false;
          
          
        }
      }
      
      

    }
    else if (this.dir===1){
      this.x -= this.speed;
      if(this.x < 700 && this.x > width/2) {
        
        this.zone = true;
        if(this.x < 510){
          playerHP -=this.hp;
          killcount+=1;
          this.alive = false;
          
        }
      }
      
    }
  }

  switch(){
    if(this.dir ===0){
      enemyLeft =false;
      this.x +=500;
      this.dir =1;
      
    }
    else if(this.dir===1){
      enemyRight = false;
      this.x -= 500;
      this.dir =0;
      
    }
  }

  action(){
    if(this.pause === false){
      this.move();
    }
    if(this.type ===2 && this.hp ===2 && this.mustSwitch ===true){
      this.mustSwitch = false;
      
      this.switch();
    }

    this.display(); 

  }

}

function destroyEnemies(){// iterates through arrays splicing dead enemies or activates zoning
  enemyRight = false;
  enemyLeft = false;
  for(let i = 0; i <rightside.length; i++){
    if(rightside[i].alive === false){
      rightside.splice(i,1);
    }
    else if(rightside[i].zone ===true && rightside[i].alive ===true){
      enemyRight =true;
    }
    
  }
  for(let i = 0; i <leftside.length; i++){
    if(leftside[i].alive === false){
      leftside.splice(i,1);
    }
    else if(leftside[i].zone ===true && leftside[i].alive ===true){
      enemyLeft =true;
    }
    
  }
}

function restart(){ //resets game
  rightside = [];
  leftside = [];
  curenemy = 0;
  playerHP = 20;
  killcount = 0;
  enemySpeed = 2;
}

function gameOver(){  // kills all enemies, display game over text
  rightside =[];
  leftside = [];
  textSize(20);
  text("GAME OVER", width/2, height/2);
}

function mousePressed(){  // kills enemy on click if within kill area
  if(mouseButton ===LEFT  && paused === false){
    for(let i = 0; i <leftside.length; i++){
      if(leftside[i].x > 300 && leftside[i].hp ===1){ 
        leftside.splice(i,1);
        killcount+=1;
        enemyLeft = false;
        break;
        
      }
      else if(leftside[i].x > 300 && leftside[i].hp > 1){
        leftside[i].hp-=1;
        if(leftside[i].type ===2 && leftside[i].hp ===2){ // code for an enemy to switch locations
          // leftside[i].mustSwitch = true;
          // leftside[i].zone =false;
          // rightside.push(leftside[i]);
          leftside.splice(i,1);
          rightside.push(new Enemy(1, 900, height/2, 1, enemySpeed));
          //rightside[rightside.length-1].zone = false;
        }
        
        break;
      }
      else{
        playerHP-=1;
        break;
      }
    }
  }

  else if(mouseButton === RIGHT && paused ===false){
    for(let i = 0; i <rightside.length; i++){
      if(rightside[i].x < 700 && rightside[i].hp ===1){
        rightside.splice(i,1);
        killcount+=1;
        enemyRight = false;
        break;
      }
      else if(rightside[i].x < 700 && rightside[i].hp > 1){
        rightside[i].hp-=1;
        if(rightside[i].type===2  && rightside[i].hp ===2){
          // rightside[i].mustSwitch = true;
          // rightside[i].zone=false;
          // leftside.push(rightside[i]);
          rightside.splice(i,1);
          leftside.push(new Enemy(1, 100, height/2, 0, enemySpeed));
          // leftside[leftside.length-1].zone=false;
        }
        
        
        break;
      }
      
      else{
        playerHP-=1;
        break;
      } 
      
    }
    
  }
}

function pause(){ // pauses game, halting enemy movement
  for(let i = 0; i < rightside.length; i++){
    rightside[i].pause = true;
  }
  for(let i =0; i < leftside.length; i++){
    leftside[i].pause = true;
  }
  paused = true;
}

function unpause(){ //unpauses game
  for(let i = 0; i < rightside.length; i++){
    rightside[i].pause = false;
  }
  for(let i =0; i < leftside.length; i++){
    leftside[i].pause = false;
  }
  paused = false;
}

function keyPressed(){
  if(keyCode === 80){ // p
    pause();
  }
  else if(keyCode === 85){  // u
    unpause();
  }
  else if (keyCode === 73 && enemySpeed < 10){ // i
    enemySpeed+=1;
  }
  else if(keyCode ===68 && enemySpeed > 1){ //d
    enemySpeed-=1;
  }
  else if (keyCode ===82){  //r
    restart();
  }
  
  else if(keyCode===69){  //e
    diffInput = "EASY";
  }
  else if(keyCode ===78){ //n
    diffInput = "NORMAL";
  }
  else if(keyCode===72){  //h
    diffInput = "HARD";
  }
}
