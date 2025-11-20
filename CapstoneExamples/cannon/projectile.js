
//projectile function and stuff

class Projectile {
    constructor(x, y, direction, speed, type) {
        this.pos = createVector(x, y); //creating a position vector 
        this.type = type;
        //making the speed and weight differ between projectile types
        if (this.type === 1) { //rocket speed
            this.speed = (speed / 100) + 2;
            this.gravity = createVector(0, 0.1); //creating a gravity vector that only moves the rocket downwards over time.
        }
        else if (this.type === 2) {
            this.speed = (speed / 100) + 2;
            this.gravity = createVector(0, 0.5); //creating a gravity vector that only moves the rocket downwards over time.
        }
        else if (this.type === 3) {
            this.speed = (speed / 150) + 2;
            this.gravity = createVector(0, 0.05);
        }

        this.velocity = createVector(this.speed * cos(direction + 90), this.speed * sin(direction + 90)); //creating a velocity vector which horizantally moves the rocket by the adjacent direction to the angle of the cannon, 
        //and then again using sine to find the vertical angle relative to the cannon angle

        //hitbox
        this.ProjectileRight = 0;
        this.ProjectileLeft = 0;
        this.ProjectileTop = 0;
        this.ProjectileBottom = 0;
    }

    display() {
        if (this.type === 1) { //rocket type 1

            //creating a new grid to turn the rocket on
            push();
            translate(this.pos.x, this.pos.y);

            //turning the rocket image
            rotate(this.velocity.heading() + 90);

            //rocket body
            fill(156, 156, 156); //gray
            rect(0, 0, 10, 20);

            //rocket head
            fill(173, 0, 0); //red
            triangle(-10, 0 - 10, 0, -30, 10, -10);
            pop();


            //hitbox
            this.ProjectileRight = this.pos.x + 20;
            this.ProjectileLeft = this.pos.x - 20;
            this.ProjectileTop = this.pos.y - 20;
            this.ProjectileBottom = this.pos.y + 20;
        }
        //   rocket type 2 (WIP)
        if (this.type === 2) { //fireball
            // creating a new grid to turn the rocket on
            push();
            translate(this.pos.x, this.pos.y);

            // turning the rocket image
            rotate(this.velocity.heading() + 90);

            // fireball
            fill(252, 143, 0); //orange-yellow
            circle(0, 0, 20);
            pop();

            //hitbox
            this.ProjectileRight = this.pos.x + 10;
            this.ProjectileLeft = this.pos.x - 10;
            this.ProjectileTop = this.pos.y - 10;
            this.ProjectileBottom = this.pos.y + 10;
        }
        if (this.type === 3) { //cannonball
            // creating a new grid to turn the rocket on
            push();
            translate(this.pos.x, this.pos.y);

            // turning the rocket image
            rotate(this.velocity.heading() + 90);

            // cannonball
            imageMode(CENTER);
            image(cannonBall, 0, 0, 40, 40);
            pop();

            //hitbox
            this.ProjectileRight = this.pos.x + 20;
            this.ProjectileLeft = this.pos.x - 20;
            this.ProjectileTop = this.pos.y - 20;
            this.ProjectileBottom = this.pos.y + 20;
        }
    }
    move() {
        //physics to move the rocket
        this.pos.add(this.velocity); //change the position of the rocket (x,y)
        this.velocity.add(this.gravity); //adding gravity to the velocity of the rocket
    }
    action() { //displaying all individual parts
        this.display();
        this.move();
    }
}