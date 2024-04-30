// Major Capstone Project -- The Fruit Game
// Vlad Atamanchuk
// Dec 6, 2023 
//
// Create a replica of the suika watermelon game, goal is to reach the watermelon. You may use the A and D to make game easier by
// selecting which fruit to drop. Once you reach watermelon you win! 

//Global Variables
let score; 
let balls; //Variable to create a p5.play group for balls. 
let button; //Variable to create restart button. 
let ballManager; //Variable to assing a class to. 
let borders; //Varible to store sprite borders.
let pictures = []; //Array to store all the images 
let mergeSound, loseSound; //Sounds
let currentScore = 0; 
let currentIndex = 0; 
let currentImageIndex = 0;
let gameOver = false; 


function preload(){
  //Preloads all the images and pushes them all into the array with image, and size values. 
  pictures.push({images:  loadImage("assets/00_cherry.png"), size: 35});
  pictures.push({images:  loadImage("assets/01_strawberry.png"), size: 48})
  pictures.push({images:  loadImage("assets/02_grape.png"), size: 61});
  pictures.push({images:  loadImage("assets/03_gyool.png"), size: 76});
  pictures.push({images:  loadImage("assets/04_orange.png"), size: 95});
  pictures.push({images:  loadImage("assets/05_apple.png"), size: 117});
  pictures.push({images:  loadImage("assets/06_pear.png"), size: 137});
  pictures.push({images:  loadImage("assets/07_peach.png"), size: 156});
  pictures.push({images:  loadImage("assets/08_pineapple.png"), size: 190});
  pictures.push({images:  loadImage("assets/09_melon.png"), size: 220});
  pictures.push({images:  loadImage("assets/10_watermelon.png"), size: 260});
  // Preload sounds. 
  mergeSound = loadSound("sounds/splatter.mp3");
  loseSound = loadSound("sounds/lose.mp3");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  score = createGraphics(width,height); //Seperate canvas for score. 
  stroke("white"); 
  ballManager = new Balls;  //Assings class to ballmanager so its functions can be accessed. 
  ballManager.setUpBorders(); //Sets up all the borders.
  world.gravity.y = 2; //Sets the world gravity of y axis to 2, so balls will fall. 
  balls = new Group(); //Creates a p5.play group for the balls. Similar to an array. 
  
  //RESTART - sprite button.
  button = createSprite(50,50, 50, 20); 
  button.text = "Restart"; //Puts text into the sprite.
  button.static = true; //Sets the button to immovable. 
} 

function draw() {
  background(100);
  ballManager.losingLine(); 
  if(!gameOver){ //Checks to see if gameover has been set to true if not true continue playing. 
    for(let i = 0; i < balls.length; i++){ //Calls merge function for every ball in balls group. 
      ballManager.merge();
    }
  }
  ballManager.overlay();
  ballManager.score();
  restart(); //Restart the game
  debugging(); // Makes collider visible 
  
}

function mousePressed(){ 
  if(!gameOver){
    if(!borders[1].mouse.hovering() && !borders[2].mouse.hovering()){ //See if mouse is in the playing area, and create ball.
      ballManager.create(); 
    }
  }
}

class Balls {
  constructor(){
    this.velocity = 5; //Sets intial velociy for the balls.
    this.rotation = 2; //Sets rotation to be active, so balls can rotate 
    borders = new Group(); //Group for borders. 
    this.imageIndex = 2;
  }
  
  setUpBorders(){
    //Using sprites creates the borders for the game. 
    push();
    strokeWeight(0);
    borders.add = new borders.Sprite(width / 2, height-20, width, 50); //Floor
    borders.add = new borders.Sprite(0, 0, width*0.45, height*2); //Left Wall 
    borders.add = new borders.Sprite(width, 0, width*0.45, height*2); //Right Wall
    borders.static = true;
    borders.color = "brown";
    pop();
  }

  selectFruit(){
    //Allows user to select the fruit they want to drop using keys "A" and "D";
    //Assings images to the balls using the imageIndex. 
    currentIndex = this.imageIndex; 
    if(key === "a"){
      this.imageIndex -= 1;
      if(this.imageIndex <= 0) this.imageIndex = 0; //Sets minimum index.
    }
      if(key === "d"){
      this.imageIndex ++;
      if(this.imageIndex > pictures.length-5 || this.imageIndex < 0) this.imageIndex = pictures.length-6; //Sets maximum index. 
    }
  }

  create() {
    //Creates the fruits and images/  
    let ball = createSprite(mouseX, 200, this.diameter); //Creates fruit at the mouse position. 
    ball.bounciness = -0.6; //Makes the fruits less bouncy. 
    let currentImage = pictures[this.imageIndex].images; //Sets current image. 
    ball.img = currentImage;
    this.diameter = pictures[this.imageIndex].size; //Sets proportionate size to that image. 
    ball.d = this.diameter;// Set the diameter for the ball
    ball.scale = 1.05; //Scales the image to the collider slighty. 
    ball.velocity.y = this.velocity; //Sets velocity. 
    ball.rotation = this.rotation; // Initial color
    balls.add(ball); //Adds ball to the group.
  }

  merge() {
    //Nested loop to see if any of the fruits are colliding with eachother.
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        if (balls[i].colliding(balls[j])) { //p5.play method to check for collisions. 
          if (balls[j].img === balls[i].img) { //Chekcs to see if fruits are the same by using images. 
            mergeSound.play(); //Plays squish sound when merged. 
            currentIndex += 1; //Goes to the next level of fruit. 
            if(currentIndex > pictures.length){ //Once reached watermelon user wins. 
              winner();
            }

            currentScore += floor(this.diameter *0.2); //Adds score
            balls[j].position.x = balls[i].position.x; //Sets the new merged ball to the position of the previous ball. 
            balls[j].position.y = balls[i].position.y;
            balls[j].img = pictures[currentIndex].images; //Sets the new image and size for the merged ball.
            balls[j].d = pictures[currentIndex].size;    
            balls[i].remove();// Remove the lower level ball
          }
        }
      }
    }
  }

  overlay(){
    //Overlay of the fruit where it will be dropped.
    let overlayImage = pictures[this.imageIndex].images;
    imageMode(CENTER);
    image(overlayImage, mouseX, 200); 
    line(mouseX, 200, mouseX, height);
  
  }

  losingLine() {
    //Loosing line if user goes over the line they lose. 
    line(0, 170, width, 170);
    for (let i = 0; i < balls.length; i++) { //Checks to see if any balls have went over the line. 
      if (balls[i].position.y < 170) {
        loseSound.play(); //Plays loosing sound. 
        textAlign(CENTER);
        gameOver = true; //Sets game over to true to stop the functions from running. 
        balls.remove(); //Removes all fruit sprites. 
        text('YOU LOSE', width / 2, height / 2);
      }
    }
  }

  score(){
    //Displays the score. 
    textAlign(CENTER);
    textSize(40);
    text(currentScore, width/2, 150);
  }  
}

function debugging(){
  //  p5.play method to debug collider and see it. 
  if (kb.pressing(' ')){
    balls.debug = true; 
  }
  else balls.debug = false; 
}

function restart(){
  //Restart button for the game. 
  if(button.mouse.hovering()){ //Check to see if mouse is over button and color red.
    button.color = "red";
    if(mouse.pressing()){ //If mouse presses button game restarts and button becomes green for a second.
      gameOver = false; 
      print("Restart");
      button.color = "green";
      balls.remove();
      currentScore =0 ;
    }
  }
  else{
    button.color = "white";
  }
}

function keyPressed(){
  //Calls select fruit to allow user to select the fruit.
  ballManager.selectFruit();
}

function winner(){
  //Win if watermelon is reached. 
  text("YOU WIN", width/2, height/2);
}