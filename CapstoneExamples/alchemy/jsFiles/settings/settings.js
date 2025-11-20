// Manages the settings, volume, fullscreen

let settingIcon;

let settingsVisible = false;
let instructionsVisible = true;
let cheatsVisible = false;

let fullScreenCheckBox;
let muteCheckBox;
let volumeSlider;

function settingsPreLoad() {
    // preload()
    settingIcon = loadImage('/assets/images/settings/settingsIcon.png')
}


function settingsSetup() {
    // setup()
    // ready the checkboxes and slider
    fullScreenCheckBox = createCheckbox('  Full Screen');
    fullScreenCheckBox.changed(fullScreenFunc);

    muteCheckBox = createCheckbox('  Mute or Slide');
    muteCheckBox.changed(muteVolFunc);

    volumeSlider = createSlider(0.0, 1.0, volumeChosen, 0.1);
    volumeSlider.changed(changeVolFunc);
}


function settingsCon() {
    // draw()
    settingsButton();
    if (settingsVisible) {
        drawSettings();
        fullScreenCheckBox.show();
        muteCheckBox.show();
        volumeSlider.show();
    }
    else {      //hide if settings is invisible
        fullScreenCheckBox.hide();
        muteCheckBox.hide();
        volumeSlider.hide();
    }
}


function settingsPressed() {
    // mousePressed()

    // checks for Globe button pressed
    if (mouseX < 80 && mouseY < 80) {
        settingsVisible = !settingsVisible;
    }

    // use UI if visible
    if (settingsVisible) {
        settingsButtonPressed();
    }
}




function settingsButton() {
    // the top-left button
    imageMode(CENTER);
    image(settingIcon, 40, 40, 40, 40);
}


function drawSettings() {
    // draw bg
    rectMode(CENTER);
    fill(49, 37, 81);
    rect(width / 2, height / 2, width / 1.5, height / 1.75);
    fill(31, 24, 51);
    rect(width / 2.75, height / 2, width / 3, height / 2);


    // call the other helper functions
    settingsUI();
    settingsButtons();
    instructionsRant();
    shortcutsRant();

}




function settingsButtons() {
    // the buttons on the right
    let startX = width - width / 3.25;
    let startY = height - height / 2;

    // bgs
    rectMode(CENTER);
    fill(56, 44, 89);
    rect(startX, startY, 150, 40);
    rect(startX, startY + 50, 150, 40);
    rect(startX, startY + 100, 150, 40);

    // text
    textAlign(CENTER, CENTER);
    textSize(10);
    fill(147, 132, 186);
    text('Instructions', startX, startY);
    text('Shortcuts', startX, startY + 50);
    text('Save and Exit', startX, startY + 100);
}


function instructionsRant() {
    // the mini instructions
    let startX = width / 4.5 + 100;
    let startY = height / 3 - 10;
    let boxWidth = 200;

    if (instructionsVisible) {
        textAlign(LEFT);
        textSize(20);
        text('Instructions', startX, startY, 200);

        textSize(13);
        text('Use Arrow keys to move', startX, startY + 30, boxWidth);
        text('Use 5-6 ingredients for a potion', startX, startY + 60, boxWidth);
        text("Move to certain points of the screen to change sets", startX, startY + 90, boxWidth);
        text("Once you leave a set, you can't return", startX, startY + 130, boxWidth);
        text("Be careful not to eat your potion's ingredients", startX, startY + 170, boxWidth);
    }

}

function shortcutsRant() {
    // the shortcuts
    if (cheatsVisible) {
        let startX = width / 4.5 + 100;
        let startY = height / 3 - 20;
        let boxWidth = 200;
        textAlign(LEFT);
        textSize(20);
        text('Shortcuts', startX, startY, 200);

        textSize(10);
        text('Press the A key to get everything', startX, startY + 30, boxWidth);
        text('Press the S key to get all Spells', startX, startY + 50, boxWidth);
        text("Press the P key to get all Potions", startX, startY + 70, boxWidth);
        text("Press the I key to get all Items", startX, startY + 90, boxWidth);

        text('Press Q for Set1 SubSet1', startX, startY + 110, boxWidth);
        text('Press W for Set2 SubSet1', startX, startY + 130, boxWidth);
        text("Press R for Set2 SubSet2", startX, startY + 150, boxWidth);
        text("Press T for Set3 SubSet1", startX, startY + 170, boxWidth);
        text("Press Y for Set3 SubSet2", startX, startY + 190, boxWidth);
        text("Press U for Set3 SubSet3", startX, startY + 210, boxWidth);

        text('Press Z for Ending 1, X for 2, C for 3, V for 4, B for 5, N for 6', startX, startY + 240, boxWidth);

        text('You have to start the game before you try any of the codes.', startX, startY + 270, boxWidth);
        text('The dialogue will get messed up when you switch between sets.', startX, startY + 300, boxWidth);

    }
}

function settingsButtonPressed() {
    // if the UI is being click
    let mouseXMin = (width - width / 3.5) - 90;
    let mouseXMax = (width - width / 3.5) + 60;
    let mouseYRef = height - height / 2;

    if (mouseX < mouseXMax && mouseX > mouseXMin) {
        //instructions
        if (mouseY < mouseYRef + 20 && mouseY > mouseYRef - 20) {
            instructionsVisible = !instructionsVisible;
            cheatsVisible = false;
        }

        // cheats
        if (mouseY < mouseYRef + 50 + 20 && mouseY > mouseYRef + 50 - 20) {
            cheatsVisible = !cheatsVisible;
            instructionsVisible = false;
        }

        // Back to Homescreen
        if (mouseY < mouseYRef + 100 + 20 && mouseY > mouseYRef + 100 - 20) {
            setLeft = currentSet;
            currentSet = 0;
            settingsVisible = false;
            saveGame();
        }
    }
}

function settingsUI() {
    // style the checkboxes and slider
    fullScreenCheckBox.position(width - width / 2.5, height / 4);
    fullScreenCheckBox.style('color', 'white');

    muteCheckBox.position(width - width / 2.5, (height / 4) + 30);
    muteCheckBox.style('color', 'white');

    volumeSlider.position(width - width / 2.5, (height / 4) + 60);
}




// ++++++++++++++++++++++++++++++
//   Checkbox / Slide helpers
// ++++++++++++++++++++++++++++++

function fullScreenFunc() {
    fullscreen(!fullscreen());
}

function muteVolFunc() {
    mute = !mute;
}

function changeVolFunc() {
    volumeChosen = volumeSlider.value();
}