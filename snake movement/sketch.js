// Recap: Objects and Arrays

//Global Variables
let points = [];
let currentX, currentY;
let speed = 10;
let snakeLength = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentX = width/2;   currentY = height/2;
  strokeWeight(15);
  init();
}

function createPoint(){
  // generate a new location for next point and
  // returns a Point object located at currentX,currentY. 
  let roll = Math.floor(random(4));

//random control
  // if(roll===0) currentX += speed;  //RIGHT
  // else if(roll===1) currentX -= speed;  //LEFT
  // else if(roll===2) currentY += speed;  //DOWN
  // else if(roll===3) currentY -= speed;  //UP


//keyboard control
  if(keyCode===RIGHT_ARROW) currentX += speed;  //RIGHT
  else if(keyCode===LEFT_ARROW) currentX -= speed;  //LEFT
  else if(keyCode===DOWN_ARROW) currentY += speed;  //DOWN
  else if(keyCode===UP_ARROW) currentY -= speed;  //UP
  return new Point(currentX, currentY)
}

function init(){
  for(let i = 0; i < snakeLength; i++){
    points.push(createPoint());
  }
}

function draw() {
  background(255);
  moveAndDisplay();
}

function moveAndDisplay(){
  // loop through the array and display line connecting all points
  for (let i = 0; i < points.length-1; i++){
    let current = points[i];
    let next = points[i+1];
    //tail transparency based on array position
    let shade = map(i,0,points.length-1,0,255);
    stroke(0,shade)
    line(current.x,current.y,next.x,next.y);
  }

  // delete first item, and new item on end
  points.splice(0,1); //remove first
  points.push(createPoint());
}



class Point{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
