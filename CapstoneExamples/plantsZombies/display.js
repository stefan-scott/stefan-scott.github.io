function displayPlants(){
  for(let plant of plants){
      plant.display()

      if (plant.hp <= 0) {
        
        for(let z of zombies){ //Zombie goes back to walking after eating the plant
          if (z.x - plant.x < 60 && abs(z.y - plant.y) <10) {
            z.state = currentState;
            z.moveSpeed = 0.5;
          }
        }
        
        plants.splice(plants.indexOf(plant),1)   //Stop displaying the plant    
      }
  }
}

function displayZombies(){
  for(let z of zombies){
    z.move();
    z.display();
    z.gameOver();
    
    if (z.state === "walking"){
      if (z.hp <= 0) { //Remove the zombie from the array and stop displaying him
        zombies.splice(zombies.indexOf(z),1);
        zombieCount ++
      }
    
      //Move to the next image in the animation
      if(frameCount % z.speed === 0){
        z.frame++;
      }
    
      //Reset the animation
      if (z.frame >= z.animation.walking.length) {
        z.frame = 0;
      }


    }
    else if(z.state === "eating, no damage"){
      
      if (z.hp <= 0) { //Remove the zombie from the array and stop displaying him
        zombies.splice(zombies.indexOf(z),1);
        
      }
    
      if(frameCount % z.speed === 0){
        z.frame++;
      }
    
    
      if (z.frame >= z.animation.eatingNoDamage.length) {
        z.frame = 0;
        for(let plant of plants){
          if (z.x - plant.x < 60 && abs(z.y - plant.y) <10) {
            plant.hp -= 20;
          }
        }
      }
    }


    
  }
}

function display() {
  displayPlants()
  displayZombies()
}