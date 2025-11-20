// this file is about bullet, apply in shoot condition
// the meaning of code are as same as the name is short for ASAN;


class Bullet {
    constructor(x, y, damage, direction, Who) {
        // ASAN
        this.damage = damage;
        this.direction = direction;
        this.Who = Who;// who is who shoot it
        this.d = 16;
        this.force = 1;
        this.Is_used = false;

        // set up for bullet by character direction
        if (this.direction === 'right') {
            this.x = x + 16;
            this.y = y;
            this.position = createVector(this.x, this.y);
            this.vel = createVector(5.5, 0);
        }
        else if (this.direction === 'left') {
            this.x = x - 16;
            this.y = y;
            this.position = createVector(this.x, this.y);
            this.vel = createVector(-5.5, 0);
        }
        else if (this.direction === 'up') {
            this.x = x;
            this.y = y - 16;
            this.position = createVector(this.x, this.y);
            this.vel = createVector(0, -5.5);
        }
        else if (this.direction === 'down') {
            this.x = x;
            this.y = y + 16;
            this.position = createVector(this.x, this.y);
            this.vel = createVector(0, 5.5);
        }
        // need a collider to record collision
        this.collider = new Collider(this.x, this.y, 15, 15, 'rect', null, null, null, true);
    }

    display() {
        // diff color for who shoot,
        fill(109, 81, 96);
        if (this.Who === 'hero') {
            fill(194, 143, 164);
            circle(this.x, this.y, 16);
            this.position.add(this.vel);
            this.x = this.position.x;
            this.y = this.position.y;
            this.collider.x = this.x;
            this.collider.y = this.y;
        }
        else{
            // monster made it, so it will move toward hero 
            if(Math.abs(this.x - hero.x) > 14){
                if (this.x < hero.x - 7) {
                    this.direction = 'right';
                    this.x += 7;
    
                }
    
                else if (this.x > hero.x + 7) {
                    this.direction = 'left';
                    this.x -= 7;
    
                }
            }
            
            if(Math.abs(this.y - hero.y) > 10){
                if (this.y > hero.y - 5) {
                    this.direction = 'up';
                    this.y -= 5;
                }
    
                else if (this.y < hero.y + 5) {
                    this.direction = 'down';
                    this.y += 5;
                }
            }
            circle(this.x,this.y,16);
            this.collider.x = this.x;
            this.collider.y = this.y;
        }



    }
    out_of_range() {
        // ASAN
        if (this.x > EDGE.xend) this.Is_used = true;
        else if (this.x < EDGE.xstart) this.Is_used = true;
        else if (this.y > EDGE.yend) this.Is_used = true;
        else if (this.y < EDGE.ystart) this.Is_used = true;

    }

    Check() {
        // ASAN
        // check for colllision and apply force and damage to diff character
        if (this.Who === 'hero') {
            for (let j = 0; j < monsterList.length; ++j) {
                if (this.collider.CheckCollision(monsterList[j].selfcollider)) {
                    if(monsterList[j].immuneFreeze === 0){
                        this.applyForce('monster', j);
                        monsterList[j].hp -= this.damage;
                        monsterList[j].immuneFreeze += 20;
                    }
                   
                }

            }
        }
        else if (this.Who === 'monster') {
            if (this.collider.CheckCollision(hero.selfcollider)) {
                
                this.Is_used = true;
                if(hero.immuneFreeze === 0){
                    hero.hp -= this.damage;
                    this.applyForce('hero');
                    hero.CheckEdge();
                }
            }
            // check for shield counter
            if (this.collider.CheckCollision(hero.Skillcollider) && hero.skilldemand === 'def') {
                this.Is_used = true;
                shield_counter.play();
                hero.immuneFreeze += 50;
            }
        }

    }

    applyForce(to_Who, i) {
        //ASAN
        if (to_Who === 'monster') {
            monsterList[i].x = monsterList[i].x + (monsterList[i].x - this.x) * monsterList[i].defForce;
            monsterList[i].y = monsterList[i].y + (monsterList[i].y - this.y) * monsterList[i].defForce;
        }
        else {
            hero.x = hero.x + (hero.x - this.x) * this.force;
            hero.y = hero.y + (hero.y - this.y) * this.force;
        }
    }



}