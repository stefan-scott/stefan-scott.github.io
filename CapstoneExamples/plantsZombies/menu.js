function menu() {
  //Menu image
  image(menuImg,width/2,height/2,width,height);
  image(menuText,width/2,height*0.3,500,300);
  
   
  button.position(width/2-100, height*0.75);
  fill(255)
  text("Collect the falling suns to place the plants on the grid. Do NOT put the plant on the tile that already has a plant on it if you dont want to lose your plant and your suns",width*0.25,height*0.85)
  button.size(200,50);
  
  button.mousePressed(startGame);
}
  
//Start the game
function startGame() {
  gameOn = true;
  button.hide();
}