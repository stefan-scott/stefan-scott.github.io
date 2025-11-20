// Manages music
// Still a bit funky (?)
// Does not manage volume changing, but does set it

let mute = false;
let volumeChosen = 1.0;
let setMusic = [];
let battleMusic;
let prevMusicSet = 0;


function musicPreLoad() {
    // preload()
    soundFormats('mp3');
    for (let i = 0; i <= 3; i++) {
        setMusic.push(loadSound('/assets/sounds/set' + i + '.mp3'));
    }
    battleMusic = loadSound('/assets/sounds/battleMusic.mp3');
}

function musicSetup() {
    // setup()
    setMusic[0].play()
    if (gameSaved) volumeChosen = saved.get(volumeChosen);
}

function musicCon() {
    // draw()

    //volume handler
    if (mute) {
        setMusic[currentSet].setVolume(0);
    }
    else {
        setMusic[currentSet].setVolume(volumeChosen);
    }

    //battle music handler
    if (currentSubSet === 0) {
        setMusic[currentSet].stop();
        if (!battleMusic.isPlaying()) battleMusic.play();
    }
    else battleMusic.stop();


    //set music handler
    if (currentSet !== prevMusicSet) {
        setMusic[prevMusicSet].stop();
        prevMusicSet = currentSet;
    }
    if (!setMusic[currentSet].isPlaying()) {
        setMusic[currentSet].play();
    }
}
