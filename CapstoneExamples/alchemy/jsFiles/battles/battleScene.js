// Manages the battle scenes
// displays the image, stops user from going back, calls the monster, handles turn to attack, 
// handles XP decline, displays the weapons in the right-corner
// ---there are some items hiding behind the monster

let heartFull, heartHalf, heartLost;
let battleBgImgs = [];
let monsterImgs = [];
let battleState = false;

let battleSets = [
    'Sets for battle'
]
// Parameters:
//  [ 'Name', Set#, subSet#, Visited, [EnterX, EnterY], [RestrictedX, RestrictedY], [ReturnX, returnY]; Monster#, img ]


let monsterList = [];
// Parameters:
//  [ 'Name', XP, job, x, y, dmgChance, dmg, img ];


function batPreLoad() {
    // preload()
    heartFull = loadImage('/assets/images/battle/heartFull.png');
    heartHalf = loadImage('/assets/images/battle/heartHalf.png');
    heartLost = loadImage('/assets/images/battle/heartLost.png');

    if (!gameSaved) {
        monsterImgs.push(loadImage('/assets/images/battle/monsters/blobMonster1.png'));
        monsterImgs.push(loadImage('/assets/images/battle/monsters/flyMonster2.png'));
        monsterImgs.push(loadImage('/assets/images/battle/monsters/bookwormMonster3.png'));

        battleBgImgs.push(loadImage('/assets/images/battle/battleBgSet1.png'));
        battleBgImgs.push(loadImage('/assets/images/battle/battleBgSet2.png'));
        battleBgImgs.push(loadImage('/assets/images/battle/battleBgSet3.png'));
    }
}


function batSetup() {
    // setup()
    if (gameSaved) {
        battleState = saved.get(battleState);
        battleSets = saved.get(battleSets);
        monsterList = saved.get(monsterList);
    }
    else {
        battleSets.push(new FightScene('MonsterName', 1, 1, [width - width / 6, height - height / 6], [width / 2, height - height / 5], battleBgImgs[0]));
        battleSets.push(new FightScene('MonsterName', 2, 1, [width - width / 6, height - height / 6], [width - width / 9, height - height / 6], battleBgImgs[1]));
        battleSets.push(new FightScene('MonsterName', 3, 1, [width / 6, height - height / 6], [width / 2, height], battleBgImgs[2]));
        battleBgImgs = []; //freeing up memory

        monsterList.push(new Monster('Name Monster Set1', 100, nothing(), width / 2, height - height / 3, 3, 5, monsterImgs[0]));
        monsterList.push(new Monster('Name Monster Set2', 200, nothing(), width / 2, height / 2, 3, 10, monsterImgs[1]));
        monsterList.push(new Monster('Name Monster Set3', 500, nothing(), width / 2, height / 2, 2, 20, monsterImgs[2]));
        monsterImgs = []; //freeing up memory
    }

}


function battleCon() {
    // draw()
    battleSets[currentSet].manage();
    monsterList[currentSet - 1].checkDefeat();
}

function batPressed() {
    // mousePressed()
    battleSets[currentSet].charSwordClick();
}


class FightScene {
    constructor(name, setNum, subsetNum, eCor, rCor, img) {
        this.name = name;
        this.setNum = setNum;
        this.subsetNum = subsetNum;
        this.eX = eCor[0];
        this.eY = eCor[1];
        this.charInitX = rCor[0] + 100;
        this.charInitY = rCor[1] + 100;
        this.rX = rCor[0];
        this.rY = rCor[1];
        this.img = img;

        this.turn = 0; //0-pause 1-monster   2-user
        this.turnTimer = 50;
        this.sword = [];
        this.shieldValue = 0;
        this.hasSword = false;
        this.hasShield = false;
        this.fullMonsXP = 0;
        this.fightInitiated = false;
    }

    display() {
        //shows the bg and calls the monster
        imageMode(CENTER);
        image(this.img, width / 2, height / 2, width, height);
        if (!monsterList[currentSet - 1].defeated) {
            monsterList[currentSet - 1].display();
        }
    }

    incWeapons() {
        // includes the sword on the bottom-right
        if (this.hasSword && !monsterList[currentSet - 1].defeated) {
            let x = (width - width / 12);
            let y = (height - height / 6);;
            let size = 60;
            if (this.turn === 1) tint('grey');
            circle(x, y, size);
            image(this.sword.img, x, y, 40, 40);
            noTint();
        }

    }

    checkState() {
        // check if a battle is due

        // If monster not defeated and set #s match
        if (this.setNum === currentSet && this.subsetNum === currentSubSet && !monsterList[currentSet - 1].defeated) {
            if (char.x < this.eX + charBod && char.x > this.eX - charBod) {
                if (char.y < this.eY + charBod && char.y > this.eY - charBod) {
                    currentSubSet = 0;      //subset 0 means battle scene
                    battleState = true;

                    //check for swords
                    for (let i of invItems) {
                        if (i instanceof Weapon && i.name.substring(0, 5) === 'Sword') {
                            this.hasSword = true;
                            this.sword = i;
                            break;
                        }
                    }

                    //check for shields
                    for (let i of invItems) {
                        if (i instanceof Weapon && i.name === 'Shield') {
                            this.hasShield = true;
                            this.shieldValue = i.value;
                            break;
                        }
                    }

                    this.fullMonsXP = monsterList[currentSet - 1].XP;   //for drawing the monster XP bar
                }
            }
        }

        //If monster defeated, batlle ends
        if (monsterList[currentSet - 1].defeated) {
            if (char.x < this.rX + charBod && char.x > this.rX - charBod) {
                if (char.y < this.rY + charBod && char.y > this.rY - charBod) {
                    battleState = false;
                    currentSubSet = this.subsetNum;
                    this.fightInitiated = false;
                }
            }
        }

        //If character defeated, battle ends
        if (char.health <= 0) {
            battleState = false;
            currentSubSet = this.subsetNum;
            endingInProgress = true;
            this.fightInitiated = false;
        }
    }

    displayXpBars() {
        // display hearts for char and bar for monster
        let maxXPwid = 300;
        let monsXPLeft = (monsterList[currentSet - 1].XP / this.fullMonsXP) * maxXPwid;

        //monster
        rectMode(CORNER);
        fill('darkgray');
        rect(width / 4, 40, monsXPLeft, 10);


        //character
        for (let i = char.perHeart; i < char.fullHealth + 20; i += char.perHeart) {
            // If no health, no hearts
            if (char.health === 0) {
                image(heartLost, 40, (height / 6) + i * 2, 45, 40);
            }

            // if health less than counter
            else if (i > char.health) {
                let diff = i - char.health;
                if (diff < char.perHeart) {         //display a half heart if the difference between char's health and a full heart is not 0
                    image(heartHalf, 40, (height / 6) + i * 2, 40, 40);
                }
                else {
                    image(heartLost, 40, (height / 6) + i * 2, 45, 40);
                }
            }

            else {
                image(heartFull, 40, (height / 6) + i * 2, 40, 40);
            }
        }
    }

    manXPBars() {
        //manages turn based on a timer
        if (this.turnTimer === 0) {
            if (this.hasSword === false) {
                //ending 4
                char.health = 0;
            }

            if (monsterList[currentSet - 1].defeated === false && this.fightInitiated === false) {      //to initially start the fight
                this.turn = 1;
                this.fightInitiated = true;
            }
            else if (monsterList[currentSet - 1].defeated === true) {   //if monster is defeated
                this.turn = 0;
            }

            // change turns
            else if (this.turn === 1) {
                this.monsHit();
                this.turn = 2;
            }
            else if (this.turn === 2) {
                //charHit() called from Pressed function
                this.turn = 1;
            }
            this.turnTimer = 50;
        }

        else {
            this.turnTimer--;
        }
    }

    monsHit() {
        //monster hits. Success depending on chance
        let damageIntended = monsterList[currentSet - 1].damage;
        let chanceOfHit = monsterList[currentSet - 1].chancePercent;

        let chance = round(random(0, chanceOfHit));
        if (chance === chanceOfHit) {
            if (this.hasShield) {
                char.health -= damageIntended - ((this.shieldValue * damageIntended) / 100);  //deflect a percentage of the damage with shield
            }
            else {
                char.health -= damageIntended;
            }
        }
    }

    charHit() {
        //reduce health by % if sword clicked
        monsterList[currentSet - 1].XP -= this.sword.value;
    }

    charSwordClick() {
        // called in mousePressed. If it's char's turn. Hit the monster. :')
        let x = (width - width / 12);
        let y = (height - height / 6);;
        let size = 60 / 2;
        if (mouseX > x - size && mouseX < x + size) {
            if (mouseY > y - size && mouseY < y + size) {
                if (this.turn === 2) {
                    this.charHit();
                }
            }
        }
    }

    manage() {
        // manager function
        this.checkState();
        if (currentSet === this.setNum && currentSubSet === 0 && battleState) {
            this.display();
            this.incWeapons();
            this.displayXpBars();
            this.manXPBars();
        }
    }
}



class Monster {
    constructor(name, XP, job, x, y, chancePercent, damage, img) {
        this.name = name;
        this.XP = XP;
        this.defeated = false;
        this.job = job;
        this.x = x;
        this.y = y;
        this.img = img;
        this.chancePercent = chancePercent;
        this.damage = damage;
    }

    display() {
        imageMode(CENTER);
        // display the monster
        if (currentSet === 1) image(this.img, this.x, this.y, 500, 300);
        if (currentSet === 2) image(this.img, this.x, this.y, 100, 100);
        if (currentSet === 3) image(this.img, this.x, this.y + height / 6, 500, 300);
    }

    attack() {
        //monster attacks if turn = 1
        if (turnToAttack === 1) {
            this.job();
        }
    }

    checkDefeat() {
        // if XP=0, announce defeat
        if (this.XP <= 0) {
            this.XP = 0;
            this.defeated = true;
        }
    }
}


