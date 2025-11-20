// file that manages character display and movement
// not set change

let charImgs = [
  [], //idle
  [], //walk
  [], //run
  [], //jump
  []  //dead
];
let char;
let charBod = 40;     //change detection sensitivity (sets & battle scenes)
let starved = false;  //for an ending


function charPreLoad() {
  // preload()
  for (let i = 1; i <= 22; i++) {
    charImgs[0].push(loadImage("/assets/images/characters/idle/" + i + ".png"));
  }
  for (let i = 1; i <= 4; i++) {
    charImgs[1].push(loadImage("/assets/images/characters/walk/" + i + ".png"));
  }
  for (let i = 1; i <= 8; i++) {
    charImgs[2].push(loadImage("/assets/images/characters/run/" + i + ".png"));
  }
  for (let i = 1; i <= 8; i++) {
    charImgs[3].push(loadImage("/assets/images/characters/jump/" + i + ".png"));
  }
  for (let i = 1; i <= 3; i++) {
    charImgs[4].push(loadImage("/assets/images/characters/dead/" + i + ".png"));
  }
}


function charSetup() {
  // setup()
  if (!gameSaved) {
    char = new Char(width / 2, height - height / 8, 100, 2, charImgs)
  }
  else {
    char = saved.get(char);
    char.speed = saved.get(char.speed);
  }
}


function charCon() {
  // draw()
  // charSelection();
  if (currentSet !== 0) char.manage();
}


function charPressed() {
  // mousePressed()
}

function charKey() {
  //keyPressed
  char.charKeyClick();
}



// Once upon a time, you could select your character.  
// I know you are reading this Mr.Scott. 
// I decided to keep this part because I really liked it.
// But refining it is (or I guess 'was') not on my priority list.
// ;-;
// function charSelection() {
//   imageMode(CENTER);
//   tint('grey');
//   image(selChars[0], width / 4, height / 2);
//   image(selChars[1], width / 2, height / 2);
//   image(selChars[2], width - width / 4, height / 2);

//   // check selection intention
//   if (mouseY > height / 3 && mouseY < height - height / 3) {
//     if (mouseX < width / 4) {
//       noTint();
//       image(selChars[0], width / 4, height / 2);
//       if (mouseIsPressed) {
//         char = new Char(0);
//         char.charLoad();
//       }
//     }
//     else if (mouseX > width / 4 && mouseX < width - width / 4) {
//       noTint();
//       image(selChars[0], width / 2, height / 2);
//       if (mouseIsPressed) {
//         char = new Char(1);
//         char.charLoad();
//       }
//     }
//     else {
//       noTint();
//       image(selChars[0], width - width / 4, height / 2);
//       if (mouseIsPressed) {
//         char = new Char(2);
//         char.charLoad();
//       }
//     }
//   }
// }



class Char {
  constructor(x, y, health, speed, images) {
    this.x = x;
    this.y = y;
    this.health = health;
    this.fullHealth = health;
    this.perHeart = health / 5;

    this.speed = speed;
    this.images = images;
    this.imgIndex = 0;
    this.currentImg = 0;  //0- idle  1-walk  2-run  3-fall  4-jump  5-dead
  }

  display() {
    // display the character (and not in some conditions) depending on action
    if (potionInitiated || splbkVisible) return;
    tint('darkgrey');
    image(this.images[this.currentImg][this.imgIndex], this.x, this.y, 50, 50);

    //cycle through imgs, but faster when running
    if (frameCount % 20 === 0 && this.currentImg !== 2) {
      this.imgIndex++;
    }
    else {
      if (frameCount % 4 === 0 && this.currentImg === 2) {
        this.imgIndex++;
      }
    }

    // fix imgIndex going out of bounds
    if (this.imgIndex > this.images[this.currentImg].length - 1) {
      this.imgIndex = 0;
    }
    noTint();
  }

  move() {
    // no moving under some conditions
    if (battleState && monsterList[currentSet - 1].defeated === false) return;
    if (set[currentSet][currentSubSet][1] === false) return;

    // allows diagonal movement with keyIsDown
    // vertical
    if (keyIsDown(UP_ARROW) && this.y > height - height / 5) {
      this.y -= char.speed;
    }
    else if (keyIsDown(DOWN_ARROW) && this.y < height) {
      this.y += char.speed;
    }

    // horizontal
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= char.speed;
    }
    else if (keyIsDown(RIGHT_ARROW) && this.x < width) {
      this.x += char.speed;
    }
  }

  decideCharacterAnimation() {
    // animate char if doing something, else Idle
    if (keyIsPressed) {
      if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW || keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
        if (char.speed > 5) this.currentImg = 2;  //if running
        else this.currentImg = 1;
      }
      if (keyCode === 32) this.currentImg = 3;
    }
    else {
      this.currentImg = 0;
    }
  }

  charKeyClick() {
    // resets imgIndex back to 0 (or crashed because all animations not same length)
    this.imgIndex = 0;
  }

  starving() {
    // lose health if char hasn't eating anything
    if (frameCount % 3600 === 0) { //every 1-ish minute
      char.health -= 10;
      // ending 4 if starved
      if (char.health <= 0) {
        starved = true;
        endingInProgress = true;
      }
    }
  }

  manage() {
    // manager function
    this.display();
    this.move();
    this.decideCharacterAnimation();
    this.starving();
  }
}