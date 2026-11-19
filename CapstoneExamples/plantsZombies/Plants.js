class Plants{
  constructor(x,y,idle,attack,bullet){
    this.x= x,
    this.y= y,
    this.state= "idle",
    this.animation= {
      idle:idle,
      attack:attack,
      chew:chomperChew,
      glow:sunflowerGlow
    },
    this.hp= 100,
    this.frame= 0,
    this.speed= 5,
    this.type=currentPlant;
    this.currentAnimation;
    this.bulletImg = bullet;
    this.bullets = [];
    this.sunStart = millis();
    this.sunCurrent = 0;
    this.sunElapsed = 0;
  }

  idle(){
    if (this.state === "idle") {
      this.currentAnimation = this.animation.idle;
    }
  }

  shoot(){
    //Shooting animation of the bullet
    for(let b of this.bullets){
      image(b.img, b.x, b.y, 30,30);
      b.x+=5;

      for(let z of zombies){ //Damage of the bullets
        if (b.x > z.x && abs(b.y - z.y) < 20 ) {//Check if the bullet is touching the zombie
          this.bullets.splice(this.bullets.indexOf(b),1);
          if (this.type ==="Pea") {//Peashooter
            z.hp -= 10;
          }else{ //Kernelpult
            z.hp -= 5
          }
          
        }
      }
    }
  }

  display(){
    if (this.type === "Sunflower") {

      this.sunCurrent = millis();
      this.sunElapsed = this.sunCurrent - this.sunStart;
    
      // start glow
      if (this.sunElapsed >= 6000 && this.state !== "glow") {
        this.state = "glow";
        this.frame = 0; // reset animation
      }
    
      // spawn sun
      if (this.sunElapsed >= 7000) {
    
        suns.push({
          x: this.x,
          y: this.y
        });
    
        this.state = "idle";     // 🔥 RESET STATE HERE
        this.sunStart = millis(); // restart timer
        this.frame = 0;          // reset animation
      }
    }
    
    
    if (this.type === "Wallnut" && this.hp <= 40) {
      this.state = "Cracked2";
      
    }
    if (this.state === "Cracked2") {
      this.currentAnimation = wallnutCracked2;
    }
    if (this.state === "idle") {
      this.currentAnimation = this.animation.idle;
    }
    else if (this.state === "attack") {
      this.currentAnimation = this.animation.attack;
    }
    else if (this.state === "glow") {
      this.currentAnimation = this.animation.glow;
    }
    
    if(frameCount % this.speed === 0){
      this.frame++;
    }
          
          
    if (this.frame >= this.currentAnimation.length) {
      this.frame = 0; //Reset the animation
      
      //Seperate attack for Chomper since it doesnt shoot a bullet
      if (this.type === "Chomper") {
        for(let z of zombies){ //Damage of the bullets
          if (abs(this.y - z.y) < 70 && abs(z.x - this.x) < 60 ) {
           z.hp -= (100/5);
           console.log(1);
          this.currentAnimation = this.animation.chew
          }
        }
      }
      //Generate a new bullet for Pea Shooter
      if (this.type === "Pea" && this.state === "attack") {
        this.bullets.push({img:loadImage("./assets/Pea Shooter/Projectile/pea-projectile.png"), x:this.x, y:this.y});
      }

      if (this.type === "Kernel" && this.state === "attack") {
        this.bullets.push({img:loadImage("./assets/Kernelpult/Projectile/kernel-projectile.png"), x:this.x, y:this.y});
      }
    }

    image(this.currentAnimation[this.frame], this.x, this.y,min(width / 10, (height - 150) / 7) * 0.9,min(width / 10, (height - 150) / 7) * 0.9);

   
    
    //MOve to the next frame
    
  }
}
