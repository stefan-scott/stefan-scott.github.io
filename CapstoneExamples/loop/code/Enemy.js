// the meaning of code are as same as the name is short for ASAN;
// the class of Enemy


function shallowClone(obj) {
    // make clone of object,
    // use = to assign will make problem because it is pass by reference
    let clonedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = obj[key];
        }
    }
    return clonedObj;
}


class Enemy extends SpecialCharacter {
    constructor(x, y, atk, hp, ani, type) {
        // ASAN

        // i need to setup different date for diff type of skeleton
        super(x, y, atk, hp, ani);

        this.type = type;
        if (this.type === 'shielder') {
            this.atk = 4 * (1 + (LoopTime - 1) * 0.15);
            this.hp = 100 * (1 + (LoopTime - 1) * 0.15); 
            this.hpMax = this.hp;
            this.speed = 1;
            this.framelimit.atk = 6;
            this.framelimit.run = 8;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);

            
            this.currmethod = 0;

            this.liveFreeze = 0;

            this.force = 1;
            this.defForce = 1;
            this.atkFreezeMax = 12;

            this.changeMethod = int(random(70, 150));
            this.ani = shallowClone(skeleton_shielder_ani);
        }
        else if(this.type === 'knife'){
            this.atk = 9  * (1 + (LoopTime - 1) * 0.15);
            this.hp = 38  * (1 + (LoopTime - 1) * 0.15);
            this.hpMax = this.hp;
            this.speed = 2;
            this.framelimit.atk = 3;
            this.framelimit.run = 6;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);
            this.Skillcollider = new Collider(0, 0, 0, 0, 'rect', 0, 'null', 'null', false);
            
            this.currmethod = 0;

            this.liveFreeze = 0;

            this.force = 1;
            this.defForce = 2;
            this.atkFreezeMax = 30;

            this.changeMethod = int(random(60, 150));
            this.ani = shallowClone(skeleton_knife_ani);
        }
        else if(this.type === 'spearman'){
            this.atk = 7  * (1 + (LoopTime - 1) * 0.15);
            this.hp = 56  * (1 + (LoopTime - 1) * 0.15);
            this.hpMax = this.hp;
            this.speed = 1;
            this.framelimit.atk = 8;
            this.framelimit.run = 7;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);
            
            
            this.currmethod = 0;

            this.atkwidth = this.atkwidth / 1.5 ;
            this.atkheight = this.atkheight * 2.5;
            this.force = 2;
            this.defForce = 1;
            this.atkFreezeMax = 70;

            this.changeMethod = int(random(70, 150));
            this.ani = shallowClone(skeleton_spearman_ani);
        }
        else if(this.type === 'archer'){
            this.atk = 22  * (1 + (LoopTime - 1) * 0.15);
            this.hp = 30  * (1 + (LoopTime - 1) * 0.15);
            this.hpMax = this.hp;
            this.speed = 1;
            this.framelimit.atk = 5;
            this.framelimit.run = 7;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);
            
            
            this.currmethod = 0;

            this.force = 1;
            this.defForce = 2;
            this.atkFreezeMax = 200;

            this.changeMethod = int(random(70, 150));
            this.ani = shallowClone(skeleton_archer_ani);
        }
        
        if(this.type === 'boss0'){
            this.atk = 12  * (1 + (LoopTime - 1) * 0.15);
            this.hp = 800  * (1 + (LoopTime - 1) * 0.15);
            this.hpMax = this.hp;
            this.speed = 1;
            this.framelimit.atk = 6;
            this.framelimit.run = 8;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);

            
            this.currmethod = 0;

            this.liveFreeze = 0;

            this.force = 1;
            this.defForce = 1;
            this.atkFreezeMax = 12;

            this.changeMethod = int(random(70, 150));
            this.ani = shallowClone(skeleton_boss0_ani);
        }
        if(this.type === 'boss1'){
            this.atk = 28  * (1 + (LoopTime - 1) * 0.15);
            this.hp = 600  * (1 + (LoopTime - 1) * 0.15);
            this.hpMax = this.hp;
            this.liveFreeze = 0;
            this.speed = 1;
            this.framelimit.atk = 8;
            this.framelimit.run = 7;
            this.framelimit.die = 11;
            this.height = 46;
            this.selfcollider = new Collider(this.x, this.y, this.width, this.height, 'rect', 0, 'null', 'null', true);
            
            
            this.currmethod = 0;

            this.atkwidth = this.atkwidth / 1.5 ;
            this.atkheight = this.atkheight * 2.5;
            this.force = 2;
            this.defForce = 1;
            this.atkFreezeMax = 70;

            this.changeMethod = int(random(70, 150));
            this.ani = shallowClone(skeleton_boss1_ani);
        }

        this.debug = false;

        

    }
    Enemy_action() {
        // ASAN, the whole action for enemy
        
        this.update();
        this.CheckEdge();        
        super.display();
      

        // no skillcollider for archer
        if(this.type === 'archer'){
            this.Skillcollider.active = false; 
        }
        
        if(this.Skillcollider.active && this.debug){
            this.Skillcollider.display();
        }
        this.hp_bar();
        this.atkAction();




    }

    update() {
        // ASAN, update for enemy

        // knife , boss1 will change atk and hp if they live longer
        if((this.type === 'knife' || this.type === 'boss1')  && this.hp !== 0){
            this.liveFreeze ++;
            if(this.liveFreeze % 120 === 0 ) {
                if(this.type === 'boss1') {
                    this.atk += 1
                    this.hp += hero.atk / 5;
                }this.atk++;
                if(this.hp < this.hpMax)this.hp +=3 ;
                if(this.hp > this.hpMax)this.hp = this.hpMax;

            }
        }
        // shielder and boss 0 will increase atk if they live longer
        if(this.type === 'shielder' || this.type === 'boss0'){
            this.liveFreeze ++;
            if(this.liveFreeze % 240 === 0){
                this.atk++;
                if(this.type === 'boss0') this.atk+= hero.hpMax / 30;
            }
        }


        // if hero not die , make the move else be idle
        if (!(hero.condition === 'die' || hero.condition === 'null') && hero.hp > 0 && this.hp > 0 ) {
            this.Change_method();
            this.Enemy_walk_method();
        }
        else this.condition = 'idle';

        
        // make the skilldemand into condition
        if(this.skilldemand === 'atk')this.condition = 'atk';


        // only shielder's skillcollider are as same as his selfcollider
        if (this.type === 'shielder') {
            super.SetCollider(this.x, this.y, this.width, this.height,null,null);
        }
        else{
            this.ColliderShow();
           
        }
    }

    atkAction() {
        // ASAN, archer were the special case
        if (this.type !== 'archer') {
            if (this.atk_range() && hero.immuneFreeze === 0) {
                if (this.skillActive === false && this.atkFreeze === 0 && hero.hp > 0 && this.hp > 0 && hero.immuneFreeze === 0) {
                    this.skillActive = true;
                    this.skilldemand = 'atk';
                    this.ani.index = 0;
                    this.ani.frame = 0;
                }
            }
        }

        // monster attack hero
        if (this.Skillcollider.CheckCollision(hero.selfcollider) && hero.immuneFreeze === 0) {
            this.applyForce('hero');
            if(this.type === 'shielder' || this.type === 'boss0'){
                shield_atk.play();
            }
            else atkSFX.play();
            hero.hp -= this.atk;
            hero.immuneFreeze = 80;
            hero.CheckEdge();
        }
        else if (hero.Skillcollider.CheckCollision(this.selfcollider) && this.immuneFreeze === 0) {
            // hero attack monster
            this.applyForce('self');
            if(this.type === 'shielder' || this.type === 'boss0' || this.type === 'boss1')this.Shield_reduce_damage(hero.Skillcollider.damageDirection);
            else this.hp -= hero.Skillcollider.damage;
            this.immuneFreeze = 30;
            atkSFX.play();
            this.CheckEdge();

        }

        // shield counter
        if(hero.Skillcollider.CheckCollision(this.Skillcollider) && hero.skilldemand === 'def'){
            if((hero.direction === 'right' && this.direction === 'left')
                || (hero.direction === 'left' && this.direction === 'right')
                || (hero.direction === 'up' && this.direction === 'down')
                ||(hero.direction === 'down' && this.direction === 'up')
                ){
                    shield_counter.play();   
                    defTimes > 100 ? hero.immuneFreeze += 60 : hero.immuneFreeze += 30;
                }
            
        }
        // print(this.x,this.y)
    

    }

    applyForce(to_Who) {
        // ASAN
        if (to_Who === 'self') {
            this.x = this.x + (this.x - hero.x) * this.defForce;
            this.y = this.y + (this.y - hero.y) * this.defForce;
        }
        else {
            hero.x = hero.x + (hero.x - this.x) * this.force;
            hero.y = hero.y + (hero.y - this.y) * this.force;
        }
    }
    CheckEdge() {
        // ASAN
        if (this.x > EDGE.xend) this.x = EDGE.xend;
        if (this.x < EDGE.xstart) this.x = EDGE.xstart;
        if (this.y < EDGE.ystart) this.y = EDGE.ystart;
        if (this.y > EDGE.yend) this.y = EDGE.yend;
    }


    Enemy_walk_method() {
        // ASAN, archer were the special case,
        // all run toward to player except archer
        this.condition = 'run';

        if (this.currmethod === 0 && this.type !== 'archer') {
            
            if(Math.abs(this.x - hero.x) > this.speed * 2){
                if (this.x < hero.x - this.speed) {
                    this.direction = 'right';
                    this.x += this.speed;
    
                }
    
                else if (this.x > hero.x + this.speed ) {
                    this.direction = 'left';
                    this.x -= this.speed;
    
                }
            }
            
            else if(Math.abs(this.y - hero.y) > this.speed * 2){
                if (this.y > hero.y - this.speed ) {
                    this.direction = 'up';
                    this.y -= this.speed;
                }
    
                else if (this.y < hero.y + this.speed) {
                    this.direction = 'down';
                    this.y += this.speed;
                }
            }
            
        }
        else if (this.currmethod === 1 && this.type !== 'archer') {
            if(Math.abs(this.y - hero.y) > this.speed * 2){
                if (this.y > hero.y - this.speed ) {
                    this.direction = 'up';
                    this.y -= this.speed;
                }
    
                else if (this.y < hero.y + this.speed) {
                    this.direction = 'down';
                    this.y += this.speed;
                }
            }

            else if(Math.abs(this.x - hero.x) > this.speed * 2){
                if (this.x < hero.x - this.speed) {
                    this.direction = 'right';
                    this.x += this.speed;
                }
    
                else if (this.x > hero.x + this.speed ) {
                    this.direction = 'left';
                    this.x -= this.speed;
    
                }
            }
        }


        if(this.type === 'archer'){
           if(this.currmethod === 0){
            if(this.x > EDGE.xstart) {
                this.x--;
                this.direction = 'left'
            }
            else if(this.y > EDGE.ystart){
                this.y--;
                this.direction = 'up';
            } 
           }
           else if(this.currmethod === 1){
            if(this.x < EDGE.xend){
                this.x++;
                this.direction = 'right';
            }
            else if(this.y < EDGE.yend){
                this.y++;
                this.direction = 'down';
            }
           }

           if (this.skillActive === false && this.atkFreeze === 0 && hero.hp > 0 && this.hp > 0 && hero.immuneFreeze === 0) {
            this.skillActive = true;
            this.skilldemand = 'atk';
            this.ani.index = 0;
            this.ani.frame = 0;
            BulletList.push(new Bullet(this.x,this.y,this.atk * 0.9,this.direction,'monster'));
            arrowSFX.play();
        }
        }
    }

    Change_method() {
        // change the way of walk
        // walk horizontal first or walk vertically first?
        if (frameCount % this.changeMethod === 0) {
                if (this.currmethod === 1) {
                    this.currmethod = 0;
                }
                else if (this.currmethod === 0) {
                    this.currmethod = 1;
                }
        }
    }




    hp_bar() {
        // ASAN
        if (this.hp !== this.hpMax) {
            rectMode(CORNER);
            fill(255, 0, 0);
            rect(this.x - this.width / 2, this.y - this.height / 2 - 12, this.width, 12);
            fill(0, 255, 0);
            rect(this.x - this.width / 2, this.y - this.height / 2 - 12, map(this.hp, 0, this.hpMax, 0, this.width), 12);
        }

    }



    Shield_reduce_damage(direction , coefficient){
        // ASAN, boss 0 and 1 and shielder have this, does not apply to magic and shoot
        if(this.type === 'shielder') coefficient = 0.75
        else if(this.type === 'boss0')coefficient = 0.85
        else coefficient = 0.4;

        if(this.direction === direction){
            this.hp = this.hp - (hero.Skillcollider.damage * (1 + coefficient))
            print('increditble')
        }
        else if((direction === 'right' && this.direction === 'left')
        || (direction === 'left' && this.direction === 'right')
        || (direction === 'up' && this.direction === 'down')
        ||(direction === 'down' && this.direction === 'up')
        ){
            this.hp = this.hp - (hero.Skillcollider.damage * (1-coefficient))
        }
        else {
            this.hp-= hero.Skillcollider.damage;
            print('nice')
        }
    }


    atk_range(){
        // ASAN, the range are change once change horizontal and vertical
        if(this.direction === 'right' || this.direction === 'left'){
            return (Math.abs(this.x - hero.x) < this.width + this.atkheight + 17 &&
            Math.abs(this.y - hero.y) < this.height + this.atkwidth + 17)
        }
        else return (Math.abs(this.x - hero.x) < this.width + this.atkwidth + 16 &&
        Math.abs(this.y - hero.y) < this.height + this.atkheight + 16)
    }

}







// shielder, spearman, knife, archer

//skeleton_shielder_ani = new SpecialAni();
// let skeleton_archer_ani = new SpecialAni();
// let skeleton_knife_ani = new SpecialAni();
// let skeleton_spearman_ani