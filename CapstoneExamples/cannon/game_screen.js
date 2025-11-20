//        GAME SETUP        \\

//formatting is weird because I did it on a different computer

function gameBackground() {
    background(backgroundRed, backgroundGreen, backgroundBlue); //setting the background.
    let startTimer = 0;
    // adding the countdown
    if (countdown === true) {
        startTimer = millis() - timer;
        if (startTimer < 7000) {
            text('5', windowWidth / 2, windowHeight / 2);
        }
        else if (startTimer < 8000) {
            text('4', windowWidth / 2, windowHeight / 2);
        }
        else if (startTimer < 9000) {
            text('3', windowWidth / 2, windowHeight / 2);
        }
        else if (startTimer < 10000) {
            text('2', windowWidth / 2, windowHeight / 2);
        }
        else if (startTimer < 11000) {
            text('1', windowWidth / 2, windowHeight / 2);
        }
        else if (startTimer < 12000) {
            text('GO', windowWidth / 2, windowHeight / 2);
        }
        if (startTimer > 12500) {
            countdown = false
        }
    }
    else if (countdown === false) {
        for (missles of player1Projectile) {
            missles.action();
        }

        for (missles of player2Projectile) {
            missles.action();
        }

        player1.display();
        player2.display();

        // deleting missles if they go out of range
        for (let missles of player1Projectile) {
            if (missles.pos.x < 0) { // left side
                player1Projectile.splice(missles, 1);
            }
            if (missles.pos.x > windowWidth) {  // right side
                player1Projectile.splice(missles, 1);
            }
            if (missles.pos.y > windowHeight) { //bottom of page
                player1Projectile.splice(missles, 1);
            }
            //missles cannot go out of bounds going upwards.

            //missle Contact
            //player1 missles
            if (missles.ProjectileRight >= player2.cannonLeftSide && missles.ProjectileRight <= player2.cannonRightSide && missles.ProjectileBottom >= player2.cannonTop && missles.ProjectileBottom <= player2.cannonBase) {
                player1Projectile.splice(missles, 1);
                player2.healthAmount -= 1;
                explosions.push(new Explosion(missles.pos.x, missles.pos.y)) //creates an explosion
            }
        }

        for (let missles of player2Projectile) {
            if (missles.pos.x < 0) { // left side
                player2Projectile.splice(missles, 1);
            }
            if (missles.pos.x > windowWidth) { // right side
                player2Projectile.splice(missles, 1);
            }
            if (missles.pos.y > windowHeight) { //bottom of page
                player2Projectile.splice(missles, 1);
            }
            //missles cannot go out of bounds going upwards.
            //missle contact
            //player2 missles
            if (missles.ProjectileLeft <= player1.cannonRightSide && missles.ProjectileLeft >= player1.cannonLeftSide && missles.ProjectileBottom >= player1.cannonTop && missles.ProjectileBottom <= player1.cannonBase) {
                player2Projectile.splice(missles, 1);
                player1.healthAmount -= 1;
                explosions.push(new Explosion(missles.pos.x, missles.pos.y)) //creates an explosion
            }
        }

        //adding the explosion rendering
        for (let i of explosions) {
            i.display();
            if (i.opacity < 0) {
                explosions.splice(i, 1);
            }
        }


        //game OVER
        if (player1.healthAmount === 0 || player2.healthAmount === 0) {
            gameOver = true;
            gameStart = false;
        }
    }
}

function gameOverScreen() {
    background(backgroundRed, backgroundGreen, backgroundBlue);
    fill(0);
    textAlign(CENTER);
    textFont(titlefont); //new font
    textSize(200);
    if (player2.healthAmount === 0) {
        text("PLAYER 1 WINS", windowWidth / 2, windowHeight / 2);
    }
    else {
        text("PLAYER 2 WINS", windowWidth / 2, windowHeight / 2);
    }

}