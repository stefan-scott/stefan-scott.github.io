// class about collider, really important
// the meaning of code are as same as the name is short for ASAN;
class Collider{
    constructor(x,y,width,height,Shapemode,damage,damageType,damageDirection,active){
        //ASAN
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.Shapemode = Shapemode;
        this.damage = damage;
        this.damageType = damageType;
        this.damageDirection = damageDirection;
        this.active = active;
    }


    CheckCollision(Othercollider){
        // ASAN
        if(this.Shapemode === 'rect' && Othercollider.Shapemode === 'rect' && this.active && Othercollider.active){
            if( this.x - this.width / 2 <  Othercollider.x + Othercollider.width / 2 
                && this.x + this.width / 2 >  Othercollider.x - Othercollider.width / 2
                && this.y  + this.height / 2 > Othercollider.y - Othercollider.height / 2
                && this.y - this.height/2 < Othercollider.y + Othercollider.height / 2
                
             )
                return true;
             
        }
        return false;

    }

    display(){
        // ASAN
        if(this.Shapemode === 'rect'){
            rectMode(CENTER);
            rect(this.x,this.y,this.width,this.height);
        }
    }
    

    
}

// the shapemode was a terrible var, i don't need it
// initially, i thought to have point and rect collision and rect & rect collision
// but i have to much to do so i just leave the thing like that

// this.x - this.width / 2;
// this.x + this.width / 2;
// this.y + this.height /2;
// this.y - this.height/2;

// Othercollider.x - Othercollider.width /2;
// Othercollider.x + Othercollider.width /2;
// Othercollider.y - Othercollider.height /2;
// Othercollider.y + Othercollider.height / 2;
