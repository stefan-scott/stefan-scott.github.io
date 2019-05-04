/*  2D Array Demo
This demo leads students through creating the beginnings of a grid-based game,
where the game board is stored in a 2D array, and the display on the screen is
just an interpretation of the current data stored in that array.

User input (keyboard) can update the contents of the 2D array (which will in turn 
update what is displayed on the screen). This could be a precursor to a block-pusher
game, which would use a simliar mechanic, but update the 2D array in a different way.

The current implementation DOES NOT do any boundary checking, so trying to move off
the screen will cause an index-out-of-bounds. To keep the scope of the demo smaller, this
is left out, but should be discussed as a next step.
*/

int[][] level = {  {0, 1, 0, 1, 0},
                   {1, 1, 1, 0, 0},
                   {0, 0, 1, 1, 0},
                   {1, 0, 0, 1, 1},
                   {0, 0, 1, 2, 1},};
                   
PImage[] tiles = new PImage[3];

int columns = 5;
int rows = 5;

int playerX = 3;
int playerY = 4;


void settings(){
  size (columns * 100, rows * 100);
}

void setup(){
  loadImages();
  strokeWeight(2);
}

void draw(){
  background(255);
  renderGame();
  drawGrid();
}

void swap(int x1, int y1, int x2, int y2){
  //Simple manipulation of gameboard state - switch two adjacent items on the game board (player and one of the adjacent objects)
  
  int temp = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = temp;
}

void keyPressed(){
  //for any keyboard arrow key press, call swap() with arguments of the player's current position as well as the X,Y coordinate of the object to swap the player with.
  
  if (keyCode == UP){
    swap(playerX, playerY, playerX, playerY - 1);
    playerY --;
  }
  if (keyCode == DOWN){
    swap(playerX, playerY, playerX, playerY + 1);
    playerY ++;
  }
  if (keyCode == LEFT){
    swap(playerX, playerY, playerX - 1, playerY);
    playerX -- ;    
  }
  if (keyCode == RIGHT){
    swap(playerX, playerY, playerX + 1, playerY);
    playerX ++;
  }
}

//Loops through each item in the 2D array, and displays the corresponding image at that row and column position
void renderGame(){
  for (int y = 0; y < rows; y++){
    for(int x = 0; x < columns; x++){
      int index = level[y][x];
      image(tiles[index], x * width/columns, y * height/rows);
    }
  }
}

void drawGrid(){
//Draws grid lines over top of the images, just to make boundaries clear.

  //vertical grid lines
  for (int x = width/columns; x < width; x += width/columns){
    line(x,0,x,height);
  }
  //horizontal grid lines
  for (int y = height/rows; y < height; y += height/rows){
    line(0,y,width,y);
  }
  
}


void loadImages(){
//load each of the tile images, store in the tiles array.

  for (int i = 0; i < 3; i++){
    tiles[i] = loadImage(i + ".png");
  }
}