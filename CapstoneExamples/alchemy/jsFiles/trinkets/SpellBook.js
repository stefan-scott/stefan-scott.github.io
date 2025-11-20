// Manages the Spellbook (display/page flipping)
// Not Spells or Potions

let splbk;
let splbkVisible = false;
let splbkItems = [];

let splbkIconClose;
let splbkIconOpen;


function splbkPreLoad() {
  // preload()
  splbkIcon = loadImage('/assets/images/splbk/book.png');
  splbkArrow = loadImage('/assets/images/splbk/arrow.png');
  splbkIconClose = loadImage('/assets/images/splbk/bookClose.png');
  splbkIconOpen = loadImage('/assets/images/splbk/bookOpen.png');
}

function splbkSetup() {
  // setup()
  // retrive info if exists
  if (gameSaved) {
    splbkItems = saved.get(splbkItems);
  }
  splbk = new Book();
}


function spellBookCon() {
  // draw()
  if (battleState) return;
  splbkButton();
  splbk.display();
}

function splbkPressed() {
  // mousePressed();
  if (battleState) return;
  splbk.slide();

  // only move through pages if visible
  if (mouseX > width - 80 && (mouseY > 70 && mouseY < 110)) {
    splbkVisible = !splbkVisible;
  }
}

function splbkButton() {
  // The splbk opening button. Changes bases on visibility state
  fill(90, 30, 70);
  imageMode(CENTER);
  if (splbkVisible) {
    image(splbkIconOpen, width - 40, 90, 50, 50);
  } else {
    image(splbkIconClose, width - 40, 90, 45, 45);
  }
  fill(255);
}





class Book {
  constructor() {
    this.splbkHeight = height / 2.5;
    this.splbkWidth = width / 3;
    this.x = width / 2;
    this.y = height / 2;
    this.splbkStart = 0;
  }

  display() {
    if (splbkVisible) {
      push();

      // book bg
      rectMode(CENTER);
      imageMode(CENTER);
      image(splbkIcon, this.x + 10, this.y, 550, 400);

      // display the items
      if (splbkItems.length !== 0) {
        this.styleSpellsPage(this.splbkStart, this.x - this.splbkWidth / 2, this.y);
        if (this.splbkStart !== splbkItems.length - 1) {
          this.styleSpellsPage(this.splbkStart + 1, this.x + this.splbkWidth / 2, this.y);
        }
      }

      // Arrow
      imageMode(CENTER);
      image(splbkArrow, this.x + 50, this.y + this.splbkHeight / 2 - 10, 80, 80);
      // 2nd arrow
      translate(this.x - 50, this.y + this.splbkHeight / 2 - 10);
      rotate(PI);
      image(splbkArrow, 0, 0, 80, 80);

      pop();
    }
  }


  styleSpellsPage(spellNum, x, y) {
    textSize(20);
    fill(0);

    // heading
    textAlign(CENTER, CENTER);
    textSize(30);
    text(splbkItems[spellNum][0], x - 10, y - this.splbkHeight / 2.5);

    // ingredients
    textAlign(LEFT, TOP);
    textSize(10);
    for (let i in splbkItems[spellNum][1]) {
      text(splbkItems[spellNum][1][i], x - this.splbkHeight / 4, (y - this.splbkHeight / 5) + i * 20);
    }

    // img
    imageMode(CENTER);
    image(splbkItems[spellNum][2], x + this.splbkWidth / 5, y + this.splbkHeight / 5, 80, 120)
  }


  slide() {
    // Left arrow click
    if (mouseX < this.x - 50 + 30 && mouseX > this.x - 50 - 30) {
      if (mouseY > this.y + this.splbkHeight / 2 - 20 && mouseY < this.y + this.splbkHeight / 2) {
        if (this.splbkStart !== 0) {
          this.splbkStart -= 2;
        }
      }
    }

    // Right arrow click
    if (mouseX < this.x + 50 + 30 && mouseX > this.x + 50 - 30) {
      if (mouseY > this.y + this.splbkHeight / 2 - 20 && mouseY < this.y + this.splbkHeight / 2) {
        if (this.splbkStart + 2 < splbkItems.length) {
          this.splbkStart += 2;
        }
      }
    }
  }


  add(thing) {
    //used when pages found
    splbkItems.push(thing);
  }
}