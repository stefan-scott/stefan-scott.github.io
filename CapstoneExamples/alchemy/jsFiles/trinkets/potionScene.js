
let potionInitiated = false;
let itemSequence = [];
let potionsList = []
// Parameters:
//  [ 'PotionName', tooltip, [items], use(), [image] ]

let potionBgImg;
let craftIconOpen = [];
let cIconOpenIndex = 0;
let craftIconClose;
let craftScreen;

let drankMemorySpell = false;


function potionPreLoad() {
    // preload()
    potionBgImg = loadImage('/assets/images/potions/bg.png');
    craftIconClose = loadImage('/assets/images/potions/craftIconClose.png');
    for (let i = 0; i <= 5; i++) {
        craftIconOpen.push(loadImage("/assets/images/potions/craftIconOpen" + i + ".png"));
    }
}

function potionSetup() {
    // setup()
    craftScreen = new CraftScene(width / 2, height / 2, potionBgImg);
    if (!gameSaved) {
        // the potions
        potionsList.push(new Potions('SpellHealth', loadImage('/assets/images/potions/healthSpell.png'), 'Increase health by 50', ['Rice', 'Mushroom', 'Clover', 'Gold', 'Hibiscus'], healthFifteen)),
            potionsList.push(new Potions('SpellShield', loadImage('/assets/images/potions/shieldSpell.png'), 'Increase shield protection by 30', ['Wood', 'Mushroom', 'Clover', 'Gold', 'Hibiscus'], shieldTen)),
            potionsList.push(new Potions('SpellSword', loadImage('/assets/images/potions/swordSpell.png'), 'Increase attack by 30', ['Shard', 'Iron', 'Wood', 'Bone', 'Echinacea'], swordTen)),
            potionsList.push(new Potions('SpellMemory', loadImage('/assets/images/potions/memorySpell.png'), 'You Must Remember', ['Clover', 'Mushroom', 'Iron', 'Honey', 'Bat', 'Dust'], remembered)),
            potionsList.push(new Potions('SpellSpeed', loadImage('/assets/images/potions/speedSpell.png'), 'Walk faster', ['Sand', 'Eyeball', 'Gold', 'chemical', 'Blood', 'Clover'], speedUp)),
            potionsList.push(new Potions('SpellConfusion', loadImage('/assets/images/potions/confusionSpell.png'), 'Mystery potion', ['Wood', 'Mushroom', 'Clover', 'Salamander', 'Bat'], die))
    }
    else {
        potionInitiated = saved.get(potionInitiated);
        itemSequence = saved.get(itemSequence);
        potionsList = saved.get(potionsList);
    }

}

function potionCon() {
    // draw()
    if (battleState) return;
    if (potionInitiated) {
        craftScreen.manage();
    }
    craftScreenButton();
}

function potionPressed() {
    // mousePressed())
    if (battleState) return;

    // The Mortar and Pestal Clicking
    if (mouseX > width - 80 && (mouseY > 120 && mouseY < 165)) {
        potionInitiated = !potionInitiated;
    }
}

function craftScreenButton() {
    // The Mortal and Pestel button on the top-right-third
    imageMode(CENTER);

    // spin the pestel if potionstate
    if (potionInitiated) {
        image(craftIconOpen[cIconOpenIndex], width - 40, 140, 40, 40);
        if (frameCount % 10 === 0) {
            cIconOpenIndex++;
            if (cIconOpenIndex > 5) cIconOpenIndex = 0;
        }
    } else {
        image(craftIconClose, width - 40, 140, 40, 40);
    }
}


class Potions {
    // Makes the potions that go to inv
    constructor(name, img, tooltip, items, effect) {
        this.name = name;
        this.img = img;
        this.items = items;
        this.tooltip = tooltip;
        this.effect = effect;
    }

    used() {
        this.effect();
        console.log('A potion has been used:', this.tooltip);
    }
}



class CraftScene {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.bgImg = img;
        this.possibleMatch = [];
    }

    display() {
        // draws the bg
        imageMode(CENTER);
        image(this.bgImg, width / 2, height / 2, width, height);
    }


    matchPotion() {
        // checks to see if itemSequence is matching any of the spells
        if (this.possibleMatch.length === 0) {
            for (let i = 0; i < potionsList.length; i++) {
                if (itemSequence[0] === potionsList[i].items[0]) {
                    this.possibleMatch = potionsList[i];
                    break;
                } else {
                    this.possibleMatch = potionsList[potionsList.length - 1];
                }
            }
        }

        //checking continuity
        else {
            for (let i = 0; i < itemSequence.length; i++) {
                // continuing
                if (itemSequence[i] === this.possibleMatch.items[i]) {
                    if (itemSequence.length === this.possibleMatch.items.length) {
                        this.created();
                        this.endPotionScene();
                    }
                }

                // didn't continue
                else {
                    this.possibleMatch = potionsList[potionsList.length - 1];   //the generic potion
                    if (itemSequence.length === 4) {
                        this.created();    //generic spell with a 40% chance of dying
                        this.endPotionScene();
                        break;
                    }
                }
            }
        }
    }

    endPotionScene() {
        // when button clicked to go back to normal game
        potionInitiated = false;
        itemSequence = [];
        this.possibleMatch = '';
    }

    updateList(item) {
        // Update list when somethinf added
        itemSequence.push(item)
        this.matchPotion();
    }


    created() {
        // sends the matched/generic potion to inv
        inv.add(this.possibleMatch);
        let indexToRemove = potionsList.indexOf(this.possibleMatch);
        if (indexToRemove !== potionsList.length - 1) {  // remove from potions --- if not the generic one
            potionsList.splice(indexToRemove, 1);
        }

    }


    manage() {
        this.display();
    }

}