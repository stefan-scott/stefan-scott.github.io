// main class, about character
// the meaning of code are as same as the name is short for ASAN;

class SpecialCharacter {
  constructor(x, y, atk, hp, ani) {
    // ASAN
    this.x = x;
    this.y = y;
    this.atk = atk;
    this.hp = hp;
    this.hpMax = hp;
    this.ani = shallowClone(ani);


    this.debug = false;


    this.skillActive = false;
    this.deathActive = false;
    this.skilldemand = 'null';


    // freeze is what i used, 
    // use Frame timer and frametime is other way to use 
    this.atkFreeze = 0;
    this.atkFreezeMax = 18;
    this.defFreeze = 0;
    this.defFreezeMax = 36;
    this.magicFreeze = 0;
    this.magicFreezeMax = 320;
    this.shootFreeze = 0;
    this.shootFreezeMax = 150;
    this.immuneFreeze = 0;
    this.immuneFreezeMax = 120;
    this.dashFreeze = 0;
    this.dashFreezeMax = 120;


    // ASAN
    this.direction = "down";
    this.condition = "run";

    //ASAN
    this.atkwidth = 20;
    this.atkheight = 24;
    this.defwidth = 32;
    this.defheight = 16;
    this.width = 32;
    this.height = 32;

    //ASAN
    this.Skillcollider = new Collider(0, 0, 0, 0, 'rect', 0, 'null', 'null', false);
    this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);
    this.type = 'hero';
    this.framelimit = {
      run: 5,
      atk: 3,
      def: 5,
      shoot: 3,
      magic: 12,
      die: 20,
    }

  }


  all_in_one() {
    // ASAN
    // there is bug that coordinate might be float
    // so i just used int to solve it
    this.x = int(this.x);
    this.y = int(this.y);
    this.display();
    this.ColliderShow();
  }

  display() {
    // ASAN, but have more to explain

    // setup selfcollider
    this.selfcollider.x = this.x;
    this.selfcollider.y = this.y;


    // for hp_bar display, hp better not be negative
    if (this.hp < 0) this.hp = 0;

    // skillcollider active always be false unless skilldemand is not null
    this.Skillcollider.active = false;

    // test for die condtion
    if (this.hp === 0 && this.condition !== 'null') {
      this.selfcollider.active = false;
      this.condition = 'die';
      this.immuneFreeze = 0;
    }

    // update Freeze or frameTimer
    if (this.atkFreeze > 0) this.atkFreeze--;
    if (this.defFreeze > 0) this.defFreeze--;
    if (this.magicFreeze > 0) this.magicFreeze--;
    if (this.shootFreeze > 0) this.shootFreeze--;
    if(this.immuneFreeze > 0){
      // display the immuneFreeze
      fill(196,180,154);
      text((this.immuneFreeze /60).toFixed(2) + 's',this.x+ 4 ,this.y-this.height-4);
      this.immuneFreeze --;
      fill(192, 192, 192);
      circle(this.x,this.y,64);
    } 
    if(this.dashFreeze > 0) this.dashFreeze --;

    // to initiate all the freeze, once player move to other room
    if (freezetime > 0) {
      this.atkFreeze = 0;
      this.defFreeze = 0;
      this.magicFreeze = 0;
      this.shootFreeze = 0;
      this.skilldemand = 'null';
      this.skillActive = false;
      this.dashFreeze = 0;
    }
    
    // the check for skill demand
    // this are ASAN
    if (this.skilldemand === 'atk' && freezetime === 0 && this.hp > 0) {
      this.condition = 'atk';
      this.Skillcollider.active = true;
      if (this.ani.frame % this.framelimit.atk === 0) {
        this.ani.index++;
      }

      this.ani.frame++;
      if (this.ani.index === this.ani.aniarr[this.condition][this.direction].length) {
         // reset 
        this.skilldemand = 'null';
        this.atkFreeze = this.atkFreezeMax;
        this.skillActive = false;
        // print(this.skillActive,this.skilldemand)
      }
    }
    else if (this.skilldemand === 'def' && freezetime === 0 && this.hp > 0) {
      this.condition = 'def';
      this.Skillcollider.active = true;
      if (this.ani.frame % this.framelimit.def === 0) {
        this.ani.index++;
      }

      this.ani.frame++;
      if (this.ani.index === this.ani.aniarr[this.condition][this.direction].length) {
         // reset 
        this.skilldemand = 'null';
        this.defFreeze = this.defFreezeMax;
        this.skillActive = false;
      }
    }
    else if (this.skilldemand === 'magic' && freezetime === 0 && this.hp > 0) {
      this.condition = 'magic'
      if (this.ani.frame % this.framelimit.magic === 0) {
        this.ani.index++;
      }

      this.ani.frame++;
      if (this.ani.index === this.ani.aniarr[this.condition][this.direction].length) {
         // reset 
        this.skilldemand = 'null';
        this.Magic_tp();
        this.magicFreeze = this.magicFreezeMax;
        this.skillActive = false;
      }
    }
    else if (this.skilldemand === 'shoot' && freezetime === 0 && this.hp > 0) {
      this.condition = 'shoot'
      if (this.ani.frame % this.framelimit.shoot === 0) {
        this.ani.index++;
      }

      this.ani.frame++;
      if (this.ani.index === this.ani.aniarr[this.condition][this.direction].length) {
         // reset 
        this.skilldemand = 'null';
        this.shootFreeze = this.shootFreezeMax;
        this.skillActive = false;
        arrowSFX.play();
        BulletList.push(new Bullet(this.x,this.y,shootTimes > 100 ? this.atk * 1.4 : this.atk * 0.9,this.direction,'hero'));
      }
    }

    // check for die
    if (this.condition === 'die') {
      if (!this.deathActive) {
        this.ani.index = 0;
        this.ani.frame = 0;
      }

      this.deathActive = true;
      this.ani.frame++;
      // for the index that is length - 3, speed is normal
      // after that, slow down
      if (this.ani.index <= this.ani.aniarr[this.condition].length - 3) {
        if (this.ani.frame % this.framelimit.die === 0) {
          this.ani.index++;
        }
      }
      else if (this.ani.index >= this.ani.aniarr[this.condition].length - 2 && this.ani.index <= this.ani.aniarr[this.condition].length - 1) {
        if (this.ani.frame % (this.framelimit.die * 6) === 0) {
          this.ani.index++;
        }
      }
     
      // animatinon has reach to the end, generate taunt
      if (this.ani.index === this.ani.aniarr[this.condition].length) {
         // reset 
        this.condition = 'null';
        tauntSentence = int(random(taunts.length))
      }
    }

    // check for condition is run
    if (this.condition === 'run') {
      if (freezetime === 0 && frameCount % this.framelimit.run === 0) this.ani.index++;
      else if (freezetime > 0 && frameCount % 7 === 0) this.ani.index++;
    }

    let animation;

    // neither die nor null were the normal condition
    // else it is dying, should be no direction
    if (this.condition !== 'die' && this.condition !== 'null') animation = this.ani.aniarr[this.condition][this.direction];
    else if (this.condition === 'die') animation = this.ani.aniarr[this.condition];




    // to display, only consider the condition is idle or not null;
    // for idle, display the same direction as run but the first image;
    // for not null, just display
    if (this.condition === 'idle') image(this.ani.aniarr['run'][this.direction][0], this.x, this.y)
    else if (this.condition !== 'null') image(animation[this.ani.index % animation.length], this.x, this.y);


    // print('current atkfrezze is', this.atkFreeze);
    // print('index is at', this.ani.index);

    // show the collider
    this.debugShow();

  }

  ColliderShow() {
    // ASAN

    // show the collider if debug were true
    // and setup collider if condition is atk or def
    // i have test the location of the rect
    // the damage of atk or def will be depend on atkTimes and defTimes
    // coefficient will be diff 
    if (this.condition === 'atk') {
      rectMode(CENTER);
      fill(255);

      if (this.direction === 'up') {
        this.SetCollider(this.x, this.y + 3 - this.height / 2 - this.atkheight / 2,
          this.atkwidth, this.atkheight, atkTimes > 100 ? this.atk * 1.7 : this.atk * 1.2, this.direction);
        if (this.debug) this.Skillcollider.display();
      }
      else if (this.direction === 'left') {
        this.SetCollider(this.x - this.width / 2 - this.atkheight / 2, this.y + 10,
          this.atkheight, this.atkwidth,  atkTimes > 100 ? this.atk * 1.7 : this.atk * 1.2, this.direction);
        if (this.debug) this.Skillcollider.display();
      }
      if (this.direction === 'down') {
        this.SetCollider(this.x, this.y + 3 + this.height / 2 + this.atkheight / 2,
          this.atkwidth, this.atkheight,  atkTimes > 100 ? this.atk * 1.7 : this.atk * 1.2, this.direction);
        if (this.debug) this.Skillcollider.display();

      }
      else if (this.direction === 'right') {
        this.SetCollider(this.x + this.width / 2 + this.atkheight / 2, this.y + 10
          , this.atkheight, this.atkwidth,  atkTimes > 100 ? this.atk * 1.7 : this.atk * 1.2, this.direction);
        if (this.debug) this.Skillcollider.display();
      }
    }
    else if (this.condition === 'def') {
      rectMode(CENTER);
      fill(255);
      if (this.direction === 'up') {
        this.SetCollider(this.x, this.y + 3 - this.height / 2 - this.defheight / 2,
          this.defwidth, this.defheight, defTimes > 100 ? this.atk * 0.8 : this.atk * 0.3, this.direction);
        if (this.debug) this.Skillcollider.display();
      }
      else if (this.direction === 'left') {
        this.SetCollider(this.x - this.width / 2 - this.defheight / 2, this.y + 10,
          this.defheight, this.defwidth, defTimes > 100 ? this.atk * 0.8 : this.atk * 0.3, this.direction);
        if (this.debug) this.Skillcollider.display();

      }
      if (this.direction === 'down') {
        this.SetCollider(this.x, this.y + 3 + this.height / 2 + this.defheight / 2,
          this.defwidth, this.defheight, defTimes > 100 ? this.atk * 0.8 : this.atk * 0.3, this.direction);

        if (this.debug) this.Skillcollider.display();

      }
      else if (this.direction === 'right') {
        this.SetCollider(this.x + this.width / 2 + this.defheight / 2, this.y + 10,
          this.defheight, this.defwidth, defTimes > 100 ? this.atk * 0.8 : this.atk * 0.3, this.direction);

        if (this.debug) this.Skillcollider.display();

      }
    }

  }


  action() {
    // for Player's movement
    // once the location is ready for move to other cell
    // setup paning
    if (keyIsDown(87) && freezetime === 0) {
      if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[0] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
        if (this.y >= EDGE.ystart - 3 && this.y <= EDGE.ystart + 3 && this.x < 330 && this.x > 308) {
          paning = 1;
          freezetime = 64;
        }
      }

      if (this.y > 12) this.y -= 4;
      this.direction = 'up';
      this.condition = 'run';
    }

    else if (keyIsDown(65) && freezetime === 0) {
      if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[1] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
        if (this.x >= EDGE.xstart - 3 && this.x <= EDGE.xstart + 3 && this.y < 154 && this.y > 138) {
          paning = 2;
          freezetime = 64;
        }
      }

      if (this.x > 28) this.x -= 4;
      this.direction = 'left';
      this.condition = 'run';
    }

    else if (keyIsDown(83) && freezetime === 0) {
      if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[2] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
        if (this.y <= EDGE.yend + 3 && this.y >= EDGE.yend - 3 && this.x < 330 && this.x > 308) {
          paning = 3;
          freezetime = 64;
        }
      }
      if (this.y < 276) this.y += 4;

      this.direction = 'down';
      this.condition = 'run';
    }
    else if (keyIsDown(68) && freezetime === 0) {

      if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[3] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
        if (this.x <= EDGE.xend + 3 && this.x >= EDGE.xend - 3 && this.y < 154 && this.y > 138) {
          paning = 4;
          freezetime = 64;
        }
      }

      if (this.x < 612) this.x += 4;

      this.direction = 'right';
      this.condition = 'run';
    }
    else if (this.hp <= 0) this.condition = 'die';
    else this.condition = 'idle';
  }

  skillAction() {
    // ASAN
    // check for skilldeman and skillActive once pressed key,
    // only allow if freeze is not in cooldown and room is not transform
    
    //def
    if (this.skillActive === false && keyIsDown(75) && freezetime === 0 && this.defFreeze === 0) {
      this.skillActive = true;
      this.skilldemand = 'def';
      this.ani.index = 0;
      this.ani.frame = 0;
      defTimes ++;
      localStorage.setItem("defTimes",defTimes);
    }
    else if (this.skillActive === false && keyIsDown(74) && freezetime === 0 && this.atkFreeze === 0) {
      //attack
      this.skillActive = true;
      this.skilldemand = 'atk';
      this.ani.index = 0;
      this.ani.frame = 0;
      atkTimes ++;
      localStorage.setItem("atkTimes",atkTimes);
    }
    else if (this.skillActive === false && keyIsDown(85) && freezetime === 0 && this.magicFreeze === 0) {
      //magic
      this.skillActive = true;
      this.skilldemand = 'magic';
      this.ani.index = 0;
      this.ani.frame = 0;
      magicTimes++;
      localStorage.setItem("magicTimes",magicTimes);
    }
    else if (this.skillActive === false && keyIsDown(76) && freezetime === 0 && this.shootFreeze === 0) {
      //shoot
      this.skillActive = true;
      this.skilldemand = 'shoot';
      this.ani.index = 0;
      this.ani.frame = 0;
      shootTimes ++;
      localStorage.setItem("shootTimes",shootTimes);
    }
    // dash 
    if( keyIsDown(16) && freezetime === 0 && this.dashFreeze === 0){
      // dash could still move to other room
      if(this.direction === 'right') this.x += 128;
      else if(this.direction === 'left') this.x -=128;
      else if(this.direction === 'up')this.y -=128;
      else this.y +=128;
      this.dashFreeze = this.dashFreezeMax;
      dashTimes ++;
      localStorage.setItem("dashTimes",dashTimes);
      
      if(this.direction === 'up'){
        if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[0] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
          if ((this.y >= EDGE.ystart - 3 && this.y <= EDGE.ystart + 3) || this.y < EDGE.ystart && this.x < 330 && this.x > 308) {
            paning = 1;
            freezetime = 64;
          }
        }
      }
      else if(this.direction === 'left'){
        if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[1] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
          if ((this.x >= EDGE.xstart - 3 && this.x <= EDGE.xstart + 3) || this.x < EDGE.xstart && this.y < 154 && this.y > 138) {
            paning = 2;
            freezetime = 64;
          }
        }
      }
      else if(this.direction === 'down'){
        if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[2] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
          if ((this.y <= EDGE.yend + 3 && this.y >= EDGE.yend - 3) || this.y > EDGE.yend && this.x < 330 && this.x > 308) {
            paning = 3;
            freezetime = 64;
          }
        }
      }
      else if(this.direction === 'right'){ 
        if (dungeon.map[dungeon.index[0]][dungeon.index[1]].noWall[3] && dungeon.map[dungeon.index[0]][dungeon.index[1]].played) {
          if ((this.x <= EDGE.xend + 3 && this.x >= EDGE.xend - 3) || this.x > EDGE.xend && this.y < 154 && this.y > 138) {
            paning = 4;
            freezetime = 64;
          }
        }
      }
      
      if(dashTimes > 100){
        this.immuneFreeze += 30;
      }

      this.CheckEdge();
    }

  }

  debugShow() {
    // show collider
    if (this.debug) {
      // -22,  rect with length 22,10

      // door detect
      // rect(this.x, this.y + 22, 22, 10);

      // monster detecr
      if(this.Skillcollider.active)this.Skillcollider.display();
      this.selfcollider.display();
    }
  }

  SetCollider(x, y, width, height, damage, damageDirection) {
    // ASAN
    this.Skillcollider.x = x;
    this.Skillcollider.y = y;
    this.Skillcollider.width = width;
    this.Skillcollider.height = height;
    this.Skillcollider.damage = damage;
    this.Skillcollider.damageDirection = damageDirection;
  }

  CheckEdge() {
    // ASAN
    if (this.x > EDGE.xend) this.x = EDGE.xend;
    if (this.x < EDGE.xstart) this.x = EDGE.xstart;
    if (this.y < EDGE.ystart) this.y = EDGE.ystart;
    if (this.y > EDGE.yend) this.y = EDGE.yend;
  }




  hp_bar() {
    // ASAN
    rectMode(CORNER);
    fill(255, 0, 0);
    rect(0, 0, 200, 12);
    fill(0, 255, 0);
    rect(0, 0, map(this.hp, 0, this.hpMax, 0, 200), 12);

    textAlign(LEFT,BOTTOM);
    textSize(15);
    fill(0);
    text(`${this.hp.toFixed(2)}  / ${this.hpMax.toFixed(2)}`,20,16);
  }

  Magic_tp(){
    // ASAN
    this.x = int(-1* this.x + (EDGE.xstart + EDGE.xend));
    this.y = int(-1* this.y + (EDGE.ystart + EDGE.yend));
    this.immuneFreeze += 45;

    if(magicTimes > 100){
      for(let i = 0 ; i < monsterList.length; ++i){
        monsterList[i].hp -= (this.atk * 1.2)
      }
    }
  }



}






