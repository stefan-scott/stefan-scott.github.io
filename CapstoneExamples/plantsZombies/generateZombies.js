function generateZombie() {
    let row = floor(random(grid.length));

    let gridY =
      (row + 1) * (height / 8) +
      (height / 16);

    zombies.push(new Zombie(gridY-20));
}

class Zombie{
  constructor(y){
    this.x = width-100;
    this.y = y;
    this.speed = 5;
    this.state = "walking";
    this.frame = 0; //Current image
    this.moveSpeed = 0.5;
    this.animation = {
      walking: zombiesWalk,
      walkingOneArm:zombiesWalkOneArm,
      eatingNoDamage:zombieEats
    };
    this.frameTimer = 0;
    this.hp = 100;
  }

  move(){
    this.x -= this.moveSpeed;
  }



  display(){
    this.levelUp()
    let currentAnimation;
    if (this.state === "walking") {
      currentAnimation = this.animation.walking;
    }
    else if(this.state === "eating, no damage"){
      currentAnimation = this.animation.eatingNoDamage;
    }
    
    image(
      currentAnimation[this.frame],
      this.x,
      this.y,
      min(width / 10, (height - 150) / 7) * 1.1, //Depending on the size of the cell of the grid, adjust the size of the zombie
      min(width / 10, (height - 150) / 7) * 1.1
    );
  }

  levelUp(){
    if (zombieCount > 10) {

      this.hp = 150
      this.moveSpeed = 1
    }
  }


  gameOver(){
    if (this.x <0) {
      noLoop();
      text("Game Over", width/2, height/2);
    }
  }
}