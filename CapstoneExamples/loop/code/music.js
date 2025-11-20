// the meaning of code are as same as the name is short for ASAN;
// deal with the Music

// ASAN
let musicList = [];
let musicIndex = 0;

function music_shuffle() {
    // ASAN
    if (musicList[musicIndex].isPlaying()) musicList[musicIndex].stop();
    musicIndex += int(random(1, musicList.length));
    musicIndex %= musicList.length;
}

function check_and_play_music() {
    // ASAN
    if(!musicList[musicIndex].isPlaying()){
        musicList[musicIndex].play();
        musicList[musicIndex].setVolume(0.3);
    } 
    

}