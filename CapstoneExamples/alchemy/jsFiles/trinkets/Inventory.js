// Manages the Inventory

let inv;
let invItems = [];
let invVisible = false;

let invArrow;
let invBox;
let invIconOpen;
let invIconClose;


function invPreLoad() {
    // preload()
    invArrow = loadImage('/assets/images/inv/arrow.png');
    invBox = loadImage('/assets/images/inv/box.png');
    invIconClose = loadImage('/assets/images/inv/invClose.png');
    invIconOpen = loadImage('/assets/images/inv/invOpen.png');
}

function invSetup() {
    // setup()
    if (gameSaved) { //retireve info if game saved
        invItems = saved.get(invItems);
    }
    inv = new Inventory();
}

function inventoryCon() {
    // draw()
    if (battleState) return;
    invButton();
    inv.display();
}


function invPressed() {
    // mousePressed()
    if (battleState) return;

    // deals with visibility state
    if (mouseX > width - 90 && mouseY < 60) {
        invVisible = !invVisible;
    }

    // deals with object clicking and arrows
    if (invVisible) {
        inv.slide();
        inv.click();
    }
}



function invButton() {
    // the button on the top-right-first
    // changes bases on visiblity state
    fill(90, 30, 70);
    imageMode(CENTER);
    if (invVisible) {
        image(invIconOpen, width - 40, 40, 50, 50);
    } else {
        image(invIconClose, width - 40, 40, 50, 50);
    }
    fill(255);
}



class Inventory {
    constructor() {
        this.invHeight = 100;
        this.invWidth = 500;
        this.invBoxSize = 105;
        this.gap = this.invWidth / 2 - this.invBoxSize / 2;
        this.x = width / 2;
        this.y = height - this.invHeight;
        this.invStart = 0;
    }

    display() {
        // display the inv and its items
        if (invVisible) {
            rectMode(CENTER);
            imageMode(CENTER);

            // Arrows
            image(invArrow, this.x + 250, this.y, 100, 100);
            push();
            translate(this.x - 250, this.y);
            rotate(PI);
            image(invArrow, 0, 0, 100, 100);
            pop();


            // Individual boxes
            strokeWeight(4);
            for (let i = 0; i < 50; i += 10) {
                tint('pink');
                image(invBox, this.x - (this.gap - i * 10), this.y + 5, this.invBoxSize, this.invBoxSize);
                noTint();
            }
            strokeWeight(1);



            //display the items

            // If less than or equal to five items
            if (invItems.length <= 5) {
                for (let i = 0; i < invItems.length; i++) {
                    image(invItems[this.invStart + i].img, this.x - (this.gap - i * 100), this.y, 60, 60);

                    // the tooltip
                    if (mouseX < (this.x - (this.gap - i * this.invBoxSize)) + 30 && mouseX > (this.x - (this.gap - i * this.invBoxSize)) - 30) {
                        if (mouseY < this.y + 30 && mouseY > this.y - 30) {
                            fill(0);
                            rect((this.x - (this.gap - i * 100)), this.y + (this.invBoxSize / 2) + 20, 100, 20)
                            fill(255);
                            textAlign(CENTER, CENTER);
                            textSize(10);
                            text(invItems[i].tooltip, (this.x - (this.gap - i * 100)), this.y + (this.invBoxSize / 2) + 20);
                        }
                    }


                }
            }


            // If more than five items
            else {
                for (let i = 0; i < 5; i++) {
                    image(invItems[this.invStart + i].img, this.x - (this.gap - i * 100), this.y, 60, 60);

                    // the tooltip
                    if (mouseX < (this.x - (this.gap - i * this.invBoxSize)) + 30 && mouseX > (this.x - (this.gap - i * this.invBoxSize)) - 30) {
                        if (mouseY < this.y + 30 && mouseY > this.y - 30) {
                            fill(0);
                            rect((this.x - (this.gap - i * 100)), this.y + (100 / 2) + 20, 100, 20)
                            fill(255);
                            textAlign(CENTER, CENTER);
                            textSize(10);
                            text(invItems[this.invStart + i].tooltip, (this.x - (this.gap - i * 100)), this.y + (this.invBoxSize / 2) + 20);
                        }
                    }
                }
            }

        }
    }

    click() {
        // clicking an invItem to use it

        // If less than or equal to 5
        if (invItems.length <= 5) {
            for (let i = 0; i < invItems.length; i++) {
                if (mouseX < (this.x - (this.gap - i * this.invBoxSize)) + 30 && mouseX > (this.x - (this.gap - i * this.invBoxSize)) - 30) {
                    if (mouseY < this.y + 30 && mouseY > this.y - 30) {
                        // Don't use if weapon
                        if (!(invItems[i] instanceof Weapon)) {
                            invItems[i].used();
                            this.remove(this.invStart + i);
                        }
                    }
                }
            }
        }

        // If more than 5
        else {
            for (let i = 0; i < 5; i++) {
                if (mouseX < (this.x - (this.gap - i * this.invBoxSize)) + 30 && mouseX > (this.x - (this.gap - i * this.invBoxSize)) - 30) {
                    if (mouseY < this.y + 30 && mouseY > this.y - 30) {
                        // Don't use if weapon
                        if (!(invItems[i] instanceof Weapon)) {
                            invItems[i].used();
                            this.remove(this.invStart + i);
                        }
                    }
                }
            }
        }
    }

    add(thing) {
        // add to inv
        invItems.push(thing);
    }

    remove(indexOfThing) {
        // remove from inv upon use
        invItems.splice(indexOfThing, 1);
        if (invItems.length > 5 && this.invStart !== 0) {
            this.invStart--;
        }
    }

    slide() {
        // move through items

        // left arrow
        if (mouseX > this.x - 280 && mouseX < this.x - 260) {
            if (mouseY > this.y - 10 && mouseY < this.y + 10) {
                if (this.invStart !== 0) {
                    this.invStart--;
                    this.invEnd--;
                }
            }
        }

        // right arrow
        if (mouseX > this.x + 260 && mouseX < this.x + 280) {
            if (mouseY > this.y - 10 && mouseY < this.y + 10) {
                if (this.invEnd !== invItems.length) {
                    this.invStart++;
                    this.invEnd++;
                }
            }
        }
    }

}