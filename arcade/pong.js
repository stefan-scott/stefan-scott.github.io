// Arcade Experience - Pong
// Lucas Boyd and Ted Song
// 1/22/2025

let paddle1X; // Defining universal variables to be used throughout program
let paddle1Y;
let paddle2X;
let paddle2Y;
let gameOver = false;
let p1Win = false;
let p2Win = false;
let p1WinCount = 0;
let p2WinCount = 0;
let paddleSpeed = 12;
let pos;
let vel;
let font;
let ballMinusButton;
let ballPlusButton;
let paddleMinusButton;
let paddlePlusButton;
let ballResetButton;
let ballX;
let ballY;

function preload(){ // Preloads assets to be used later
    bounceSound = loadSound("assets/impact-sound-effect-8-bit-retro-151796.mp3");
    scoreSound = loadSound("assets/8-bit-video-game-points-version-1-145826.mp3");
    font = loadFont("assets/ARCADE_N.TTF");
}

function setup(){
    if(localStorage.getItem("ballSpeedX") === null){ // Checks local storage for user determined ball speed
        localStorage.setItem("ballSpeedX", 6);
        ballX = 6;
    }
    else{
        ballX = Number(localStorage.getItem("ballSpeedX"));
    }

    if(localStorage.getItem("ballSpeedY") === null){
        localStorage.setItem("ballSpeedY", 4.5);
        ballY = 4.5;
    }
    else{
        ballY = Number(localStorage.getItem("ballSpeedY"));
    }
    let velSign = Math.round(random());
    if(velSign===0){
        vel = createVector(-(ballX),ballY);
    }
    else{
        vel = createVector(ballX,ballY);
    }
    createCanvas(950, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER);
    textFont(font);
    paddle1X = 100;
    paddle1Y = height/2;
    paddle2X = width-100;
    paddle2Y = height/2;
    ballMinusButton = createButton("-"); // Buttons for players to change speed
    ballResetButton = createButton("Reset Speed");
    ballPlusButton = createButton("+");
    pos = createVector(width/2, random(0,height));
}

function draw(){
    background(0);
    ballMinusButton.mousePressed(ballMinus);
    ballPlusButton.mousePressed(ballPlus);
    ballResetButton.mousePressed(ballReset);
    for(let i=0;i<windowWidth;i+=60){ // Draw middle lines
        stroke(255);
        strokeWeight(5);
        line(windowHeight/2, i,  windowHeight/2, i+30);
    }
    rect(paddle1X, paddle1Y,height/65,width/14);  // Draw Paddles
    rect(paddle2X, paddle2Y,height/65,width/14);
    if((keyIsDown(87))&&gameOver===false){ // Paddle movement
        if(paddle1Y>0){
        paddle1Y-=paddleSpeed;
        }
    }
    else if((keyIsDown(83))&&gameOver===false){
        if(paddle1Y<height){
            paddle1Y+=paddleSpeed;
        }
    }
    if((keyIsDown(UP_ARROW))&&gameOver===false){
        if(paddle2Y>0){
        paddle2Y-=paddleSpeed;
        }
    }
    else if((keyIsDown(DOWN_ARROW))&&gameOver===false){
        if(paddle2Y<height){
            paddle2Y+=paddleSpeed;
        }
    }
    textSize(height/12/2);
    strokeWeight(3);
    text(p1WinCount, width/13, height/13); // Displays respective win counts
    text(p2WinCount, width-width/13, height/13);
    if(gameOver===false){
        ball();
    }
    else{ // If game is over, displays which player won and prompts players to start over
        strokeWeight(5);
        if(p1Win===true){
            fill(0,255,0);
            textSize(60/1.5);
            text("PLAYER ONE WINS", width/2, height/2);
            fill(255);
        }
        else{
            fill(0,255,0);
            textSize(60/1.5);
            text("PLAYER TWO WINS", width/2, height/2);
            fill(255);
        }
        textSize(30);
        strokeWeight(1);
        text("PRESS SPACE  TO RESTART", width/2-15, height/2+90);
        if(keyIsDown(32)){
            location.reload();
        }
    }
}

function ballMinus(){ // If ball minus speed button is pressed, changes stored ball speed value and current ball speed
    if(vel.y>2){
        vel.y-=0.5;
        localStorage.setItem("ballSpeedY", vel.y-0.5);
        ballY = Number(localStorage.getItem("ballSpeedY"));
    }
    else if(vel.y<-2){
        vel.y+=0.5;
        localStorage.setItem("ballSpeedY", vel.y+0.5);
        ballY = Number(localStorage.getItem("ballSpeedY"));
    }
    if(vel.x>2){
        vel.x-=0.65;
        localStorage.setItem("ballSpeedX", vel.x-0.653);
        ballX = Number(localStorage.getItem("ballSpeedX"));
    }
    else if(vel.x<-2){
        vel.x+=0.65;
        localStorage.setItem("ballSpeedX", vel.x+0.65);
        ballX = Number(localStorage.getItem("ballSpeedX"));
    }
}

function ballPlus(){ // If ball plus speed button is pressed, changes stored ball speed value and current ball speed
    if(vel.y>0){
        vel.y+=0.5;
        localStorage.setItem("ballSpeedY", vel.y+0.5);
        ballY = Number(localStorage.getItem("ballSpeedY"));
    }
    else{
        vel.y-=0.5;
        localStorage.setItem("ballSpeedY", vel.y-0.5);
        ballY = Number(localStorage.getItem("ballSpeedY"));
    }
    if(vel.x>0){
        vel.x+=0.65;
        localStorage.setItem("ballSpeedX", vel.x+0.65);
        ballX = Number(localStorage.getItem("ballSpeedX"));
    }
    else{
        vel.x-=0.65;
        localStorage.setItem("ballSpeedX", vel.x-0.65)
        ballX = Number(localStorage.getItem("ballSpeedX"));
    }
}

function ballReset(){ // Resets ball speed on click
    localStorage.setItem("ballSpeedX", 6);
    if(vel.x>0){
        vel.x = 6;
    }
    else{
        vel.x = -6;
    }
    localStorage.setItem("ballSpeedY", 4.5);
    if(vel.y>0){
        vel.y = 4.5;
    }
    else{
        vel.y = -4.5;
    }
}

function ball(){
    let left = pos.x-width/120; // Defines boundaries of paddles and ball
    let right = pos.x+width/120;
    let top = pos.y-width/120;
    let bottom = pos.y+width/120;
    let p1Left = paddle1X-height/65/2;
    let p1Right = paddle1X+height/65/2;
    let p1Top = paddle1Y-width/14/2;
    let p1Bottom = paddle1Y+width/14/2;
    let p2Left = paddle2X-height/65/2;
    let p2Right = paddle2X+height/65/2;
    let p2Top = paddle2Y-width/14/2;
    let p2Bottom = paddle2Y+width/14/2;
    strokeWeight(0);
    fill(255);
    pos.add(vel);
    if(right>p1Left&&left<p1Right&&bottom>p1Top&&top<p1Bottom){ // Checks for ball-paddle collision for paddles
        if(vel.x<0){
            vel.x *= -1;
            if(keyIsDown(87)){
                vel.y = abs(vel.y)*(-1);
            }
            else if(keyIsDown(83)){
                vel.y = abs(vel.y);
            }
            pos.x = p1Right+height/120+5;
            bounceSound.play();
        }
    }
    if(left<p2Right&&right>p2Left&&bottom>p2Top&&top<p2Bottom){ 
        if (vel.x>0){
            vel.x *= -1;
            if(keyIsDown(UP_ARROW)){
                vel.y = abs(vel.y)*(-1);
            }
            else if(keyIsDown(DOWN_ARROW)){
                vel.y = abs(vel.y);
            }
            pos.x = p2Left-height/120+5;
            bounceSound.play();
        }
    }
    if(pos.x<=0){ // Checks if ball goes off either side, restarting the round
        if(p2WinCount<3&&p1WinCount<3){
            p2WinCount++;
            scoreSound.play();
            if(p2WinCount<3&&p1WinCount<3){
                pos.x = width/2;
                pos.y = height/2;
                let velSign = Math.round(random());
                if(velSign===0){
                    vel = createVector(-vel.x,vel.y);
                }
                else{
                    vel = createVector(vel.x,vel.y);
                }
            }
            paddle1Y = height/2;
            paddle2Y = height/2;
        }
        else{
            gameOver = true;
            p2Win = true;
        }
    }
    if(pos.x>=width){
        if(p1WinCount<3&&p2WinCount<3){
            p1WinCount++;
            scoreSound.play();
            if(p2WinCount<3&&p1WinCount<3){
                pos.x = width/2;
                pos.y = height/2;
                let velSign = Math.round(random());
                if(velSign===0){
                    vel = createVector(-vel.x,vel.y);
                }
                else{
                    vel = createVector(vel.x,vel.y);
                }
            }
            paddle1Y = height/2;
            paddle2Y = height/2;
        }
        else{
            gameOver = true;
            p1Win = true;
        }
    }
    if(pos.y<0){ // Checks for boundary collision
        vel.y *= -1;
        bounceSound.play();
    }
    if(pos.y>height){
      vel.y *= -1;
      bounceSound.play();
    }
    rect(pos.x, pos.y, height/60); // Displays ball
}