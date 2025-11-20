// manages effects and animations
// connected to the trinkets folder
let effectTimer = 0;
let infoHolder;
let functionInPlay = nothing;


function animationsCon() {
    // draw() for visual aids
    textSize(20);
    textAlign(CENTER, CENTER);
    fill(255);
    functionInPlay(infoHolder);
}



function nothing() {
    //does nothing
}




//++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Visual Aids - show if something is done
//++++++++++++++++++++++++++++++++++++++++++++++++++++++

function eat(t) {
    // when ate something
    functionInPlay = eat;
    infoHolder = t;
    if (effectTimer !== 0) {
        text(('Ate ' + t + ' 20 Health. Now at ' + char.health), width / 2, height / 6);
        effectTimer -= 1;
    } else {
        char.health += 20;
        if (char.health > 100) char.health = 100;
        functionInPlay = nothing;
    }
}


function throwInPotTEXTONLY(t) {
    // when used a potion ingredient
    functionInPlay = throwInPotTEXTONLY;
    infoHolder = t;
    if (effectTimer !== 0) {
        text(('Used ' + t), width / 2, height / 6);
        effectTimer -= 1;
    } else {
        functionInPlay = nothing;
    }
}




//++++++++++++++++++++++++++++++++++
//  Self explanatory potion effects
//++++++++++++++++++++++++++++++++++

function healthFifteen() {
    char.health += 50;
}

function shieldTen() {
    for (let w of invItems) {
        if (w instanceof Weapon && i.name.substring(0, 5) === 'Shield') {
            w.value += 30;
        }
    }
}

function swordTen() {
    if (w instanceof Weapon && i.name.substring(0, 5) === 'Sword') {
        w.value += 30;
    }
}

function speedUp() {
    char.speed = 6;
}

function strike() {
    //was supposed to add a swoosh sound and animation
}

function remembered() {
    drankMemorySpell = true;
    endingInProgress = true;
}

function die() {
    char.health = 0;
}