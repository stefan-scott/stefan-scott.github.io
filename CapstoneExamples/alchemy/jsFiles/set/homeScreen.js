// currentSet = 0
// The homeScreen

let homeBg;
let textBoxBg;
let homeFont;

function homePreLoad() {
    homeBg = loadImage('/assets/images/set/home/set0.gif');
    textBoxBg = loadImage('/assets/images/set/home/box.png');
    homeFont = loadFont('/assets/fonts/MeltedMonster-ARPLA.ttf')
}


function homeCon() {
    // draw()
    if (currentSet === 0) {
        push();
        // Image
        imageMode(CENTER);
        tint('gray');
        image(homeBg, width / 2, height / 2, width, height);
        noTint();

        // Text
        noFill();
        stroke(255);

        textFont(homeFont);
        textAlign(CENTER, CENTER);
        textSize(70);
        text('Why are you', width / 2, height / 4);
        textSize(100);
        text('HERE', width / 2, height / 2.45);


        //start + Exit
        textSize(20);
        image(textBoxBg, width / 2, height - height / 3, width / 2, height / 6.5);
        text('Start / Continue', width / 2, height - height / 3 - 5);

        image(textBoxBg, width / 2, height - height / 6, width / 2, height / 6.5);
        text('Restart', width / 2, height - height / 6 - 5);

        pop();
    }
}


function homePressed() {
    // pressed()
    // The calcs look headache-y but they are mapped from the calcs above
    if (mouseX < (width / 2 + width / 4) && mouseX > (width / 2 - width / 4)) {
        if (mouseY < (height - height / 3 + height / 12.5) && mouseY > (height - height / 3 - height / 12.5)) {
            loadGame();
            if (gameSaved) currentSet = saved.get(currentSet);
            else currentSet = 1;
            currentSet = 1;
        }

        if (mouseY < (height - height / 6 + height / 12.5) && mouseY > (height - height / 6 - height / 12.5)) {
            restartGame();
        }
    }
}
