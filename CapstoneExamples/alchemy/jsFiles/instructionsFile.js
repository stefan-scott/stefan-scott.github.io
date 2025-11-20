// The file that tells you all you need to know (in-game)
// The instructions in the settings was not enough, so this has been made upon feedback

let showedInstructions = false;
let instLine = 0;
let instList = [
    "Use the Arrow keys to move.",
    "No you are not able to walk on the wall (in most places) OR go down a hallway",
    "The cursor also does not change when hovering on a potential item",
    "Why?",
    "...",
    "Makes it harder for you :]",
    "Anyways",
    "You have 4 buttons on along the top part of the screen",
    "The globe to the left is the settings.",
    "The chest to the top-right is your inventory",
    "The book to the top-second is your spellbook",
    "The mortar on the top-third allows you to make a potion. Follow the sequence in the spellbook (if you collected any spells).",
    "Don't make something out of pure whim",
    "Why",
    "Find out",
    "The required items are spread throughout the areas",
    "There is no indication in how to change spots because",
    "You Don't Remember Anything",
    "Once you leave a floor, you can't go back to it",
    "There is one battle in every floor",
    "You also don't know where that is :D",
    "That is it (?)",
    "Good luck ...?"

];
let instPerAllocatedTime = 200;
let instLineTimer = 0;



function instSetup() {
    // setup()
    // fetch info if game saved
    if (gameSaved) showedInstructions = saved.get(showedInstructions);
}


function instructionsCon() {
    // draw()
    // only show the instructions if it has not been played in the beginning
    if (!showedInstructions) {
        instBg();
        instructionsPlayer();
    }
}


function instPressed() {
    // mousePressed()
    // Move through instructions upon click
    if (!showedInstructions) {
        instLineTimer = 0;
        instLine++;
    }
}



function instBg() {
    // Draws the black bg, instruction #, 'Click to continue'

    // bg
    rectMode(CENTER);
    fill(0);
    rect(width / 2, height / 2, width, height);

    // text
    textAlign(CENTER, CENTER);
    textSize(15);
    fill('purple');
    text(instLine + '/' + instList.length, width / 2, height / 6);
    text('Click to contine', width / 2, height - height / 6);
}



function instructionsPlayer() {
    // Fades in instructions
    if (instLine < instList.length) {
        textSize(20);
        noStroke();
        textAlign(CENTER, CENTER);
        fill(255, 255, 255);
        text(instList[instLine], width / 2, height / 2, width / 2, height / 2);
        if (instLineTimer !== instPerAllocatedTime) instLineTimer++;
    }
    else {
        showedInstructions = true; //stop this scene when done
    }
}
