function eat(){
  for(plant of plants){
    for(let z of zombies){
      if (z.x - plant.x < 60 && z.x - plant.x > 0 && abs(z.y - plant.y) <10) {
        
        if(z.state==="walking"){
          z.moveSpeed = 0;
          z.state = "eating, no damage";
          z.frame = 0;
        }
        
      }
    }
  }
}

function shoot(){
  for (let plant of plants) {

    let zombieInRange = false;
  
    for (let z of zombies) {
      if (plant.type === "Pea" && z.x - plant.x < 900 && z.x - plant.x > 0 && abs(z.y - plant.y) < 10) {
        zombieInRange = true;
        break;
      }

      if (plant.type === "Chomper" && abs(z.x - plant.x) < 70 && z.x - plant.x > 0 && abs(z.y - plant.y) < 10) {
        zombieInRange = true;
        break;
      }

      if (plant.type === "Kernel" && z.x - plant.x < 900  && z.x - plant.x > 0 && abs(z.y - plant.y) < 10) {
        zombieInRange = true;
        break;
      }
    }
  
    if (zombieInRange) {
      plant.state = "attack";
      plant.shoot();
    }
    else if(!zombieInRange && plant.type !== "Sunflower"){
      plant.state = "idle";
    }
  }
}