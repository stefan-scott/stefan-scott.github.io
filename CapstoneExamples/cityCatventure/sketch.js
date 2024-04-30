let isPlaying = false;
let isGameOver = false;

let isPause = false;

let hasWon = false;
let player, floorTile, grass, ground;

let idleAnimation;
let score = 0;
let currentLevel = 0;

let currentSkin = -3;
let currentSkinPreview = -3;
let skinBackground;

let intro = false;
let introBackground;
let backgroundMusic; 
let cat2Licking;
let cat1Skin;
let cat2Skin;
let cat3Skin;
let cat4Skin;
let cat5Skin;
let cat6Skin;

let cat1Right;
let cat1Stand;

let cat2Stand;
let cat2Right;

let cat3Right;
let cat3Stand;

let cat4Stand;
let cat4Right;

let cat5Right;
let cat5Stand;

let cat6Stand;
let cat6Right;

let changingBackground = false;
let backgroundImage;
let bgImage, bgImage1, bgImage2, bgImage3, bgImage4;
let startScreenImage;

let changingSkin = false;

let currentBackground = -1;
let ifCurrentBackground = false;
let backgroundBackground;

const TILE_SIZE = 100;
const GAME_BOUND = 1000;
const PLAYER_ATTRIBUTES = {
    START_X: 100,
    START_Y: 40 + 20,
    HEIGHT: 60,
    WIDTH: 60,
    JUMP_FORCE: 7,
    SPEED: 8
}
const COIN_ATTRIBUTES = {
    COIN_WIDTH: 10,
    COIN_HEIGHT: 10,
}

// Automatically generate maps
function generateTileMap(numberOfRows) {
    // Design an array with 16 columns filled with nulls.
    const numberOfColumns = 16;
    const tileMap = new Array(numberOfRows)
        .fill(null)
        .map(_ => new Array(numberOfColumns).fill(null));
        
    // First place nothing, then place a random door and a platform at the player's starting point.
    tileMap[0] = new Array(numberOfColumns).fill('.');
    const randomIndex = Math.floor(Math.random() * numberOfColumns);
    tileMap[0][16] = 'x';
    tileMap[1][15] = 'f';
    // tileMap[1][16] = 'f';
    tileMap[2][14] = 'f';
    tileMap[0][0] = 'f';

    for (let i = numberOfRows - 1; i > 0; i--) {
        for (let j = 0; j < numberOfColumns; j++) {
            tileMap[i][j] = generateTile(i, j, numberOfRows, numberOfColumns);
        }
    }

    function generateTile(i, j, numberOfRows, numberOfColumns) {
        /**
         * rules:
         * 1. G, D, W can only be on top of F
         * 2. top of G, D, W can only be . or 0
         * 3. bottom of F can only be . or 0
         * 4. G, D, W can't be on the left or right of F
         */
        const states = new Set(['f', 'g', 'd', 'w', '0', '.'])
        if (i === numberOfRows - 1) {
            states.delete('g');
            // states.delete('d');
            states.delete('w');
            states.delete('0');
        }
        if (i - 1 >= 0 && tileMap[i - 1][j] === 'f') {
            states.delete('g');
            states.delete('d');
            states.delete('w');
            states.delete('f');
            // states.delete('0');
        }
        if (i + 1 < numberOfRows && tileMap[i + 1][j] === 'f') {
            states.delete('f');
            states.delete('d');
            // states.delete('0');
        }
        if (i + 1 < numberOfRows && tileMap[i + 1][j] !== 'f') {
            states.delete('g');
            states.delete('d');
            states.delete('w');
            // states.delete('0');
        }
        if (i + 1 < numberOfRows && (tileMap[i + 1][j] === 'g' || tileMap[i + 1][j] === 'd' || tileMap[i + 1][j] === 'w')) {
            states.delete('g');
            states.delete('d');
            states.delete('w');
            states.delete('f');
        }
        if (j - 1 >= 0 && j + 1 < numberOfColumns && (tileMap[i][j - 1] === 'f' || tileMap[i][j + 1] === 'f')) {
            states.delete('g');
            states.delete('d');
            states.delete('w');
        }
        const randomIndex = Math.floor(Math.random() * states.size);
        return Array.from(states)[randomIndex];
        // Converts the states collection to array and returns the element
    }

    return tileMap;
}
console.log(generateTileMap(4));

// map:
// .:empty
// 0: gold coins
// x: door
// f: ground
// d: land
// g: grass
// w: water
const TILE_MAPS = [
    [
        '................',
        '............0..x',
        'ffffffffff.fffff',
    ],//0 level 1
    [
        '.................x',
        '......g.g......ff.',
        'fff.ffffff.ffff',
    ],//1 leve 2
    ['.......x.......',
        'ff.....ffff.......',
        '..f..........ff....0',
        '...f.0wwgw.......ffff',
        '....fffffff.ffff',
    ],//2 level 3
    ['........x....',
        'dd....ffffff....0',
        '..d...........ddd',
        '.....g0g.....f',
        '...fffffff.ff',
    ],//3 level 4
    ['......x............',
        '....ff......',
        'ff......g.',
        '..ff...fff.0',
        '....dd.....d.',
        '0gg.....g....f',
        'ffffffffff.ff',
    ],//4 level 5
    ['dd................',
        '..dw0w...x...0.....',
        '...ddd..fff..d...g0',
        '................ddd',
        '.g0g..g.g.....dd',
        'dddddddddd.dd',
    ],//5 level 6
    ['.....0..............',
        '....ff..wwx..00....',
        'ff......fffffff...00w',
        '....w.............fff',
        '0..fff..0www...ff',
        'ff.....fffffff',
    ],//6 level 7
    ['........x.....',
        '......ffff..000..',
        'ff..........ffff..',
        '..ffff..ww.0......',
        '.......fffff........',
    ],//7 level 8
    [
        'x...............',
        '.f................',
        '..f0...............',
        '..ffff...........',
        '.......d........',
        '.......g.f...0.....',
        '0..f..dddd.....0',
        'ff........ffffff...',
    ],//8 level 9
    generateTileMap(4)
    //bounty level
]



function preload() {
    world.gravity.y = 10;

    // textFont1 = loadFont('assets/Ticketing.ttf');
    startScreenImage = loadImage('./assets/IMG_2120.jpg')
    skinBackground = loadImage('./assets/IMG_2118.jpg')
    backgroundBackground = loadImage('./assets/IMG_2126.jpg')
    introBackground = loadImage('./assets/IMG_2115.jpg')
    bgImage = loadImage('./assets/bg.jpg')
    bgImage1 = loadImage('./assets/bg1.jpg')
    bgImage2 = loadImage('./assets/bg2.jpg')
    bgImage3 = loadImage('./assets/bg3.jpg')
    bgImage4 = loadImage('./assets/bg4.jpg')
    bgImage5 = loadImage('./assets/bg5.jpg')
    floorTile = loadImage('./assets/floor_tile.png')
    grassTile = loadImage('./assets/grass_tile.png')
    dirtTile = loadImage('./assets/dirt_tile.png')
    waterTile = loadImage('./assets/water_tile.png')
    coinImg = loadImage('./assets/coin.png')
    doorImage = loadImage('./assets/door.png')


    // music 
    backgroundMusic = loadSound('./assets/bgmusic.mp3')
    coinSound = loadSound('./assets/coin.mp3')

    // textFont1 = loadFont('textFont/8-bitanco.ttf');

}

function loadBackground() {
    cat2Licking = loadAnimation('assets/Cat-2-Licking 1.png', { frameSize: [50, 50], frames: 4 });
    cat2Licking.frameDelay = 10;
    cat2Licking.scale = 10;
}

function loadSkin() {
    cat1Skin = loadAnimation('assets/Cat-1-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat1Skin.frameDelay = 8;
    cat1Skin.scale = 10;
    cat2Skin = loadAnimation('assets/Cat-2-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat2Skin.frameDelay = 8;
    cat2Skin.scale = 10;
    cat3Skin = loadAnimation('assets/Cat-3-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat3Skin.frameDelay = 8;
    cat3Skin.scale = 10;
    cat4Skin = loadAnimation('assets/Cat-4-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat4Skin.frameDelay = 8;
    cat4Skin.scale = 10;
    cat5Skin = loadAnimation('assets/Cat-5-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat5Skin.frameDelay = 8;
    cat5Skin.scale = 10;
    cat6Skin = loadAnimation('assets/Cat-6-Walk.png', { frameSize: [50, 50], frames: 8 });
    cat6Skin.frameDelay = 8;
    cat6Skin.scale = 10;
}

function loadplayerRun() {
    cat1Right = loadAnimation('assets/Cat-1-Run.png', { frameSize: [50, 50], frames: 8 });
    // cat1Right.scale = 5.5;
    cat1Stand = loadAnimation('assets/Cat-1-Idle.png', { frameSize: [50, 50], frames: 10 });
    // cat1Stand.scale = 5.5;
    cat2Right = loadAnimation('assets/Cat-2-Run.png', { frameSize: [50, 50], frames: 8 });
    // cat2Right.scale = 5.5;
    cat2Stand = loadAnimation('assets/Cat-2-Idle.png', { frameSize: [50, 50], frames: 10 });
    // cat2Stand.scale = 5.5;
    cat3Right = loadAnimation('assets/Cat-3-Run.png', { frameSize: [50, 50], frames: 8 });
    cat3Stand = loadAnimation('assets/Cat-3-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat4Right = loadAnimation('assets/Cat-4-Run.png', { frameSize: [50, 50], frames: 8 });
    cat4Stand = loadAnimation('assets/Cat-4-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat5Right = loadAnimation('assets/Cat-5-Run.png', { frameSize: [50, 50], frames: 8 });
    cat5Stand = loadAnimation('assets/Cat-5-Idle.png', { frameSize: [50, 50], frames: 10 });
    cat6Right = loadAnimation('assets/Cat-6-Run.png', { frameSize: [50, 50], frames: 8 });
    cat6Stand = loadAnimation('assets/Cat-6-Idle.png', { frameSize: [50, 50], frames: 10 });
}

function setup() {
    backgroundMusic.loop(); // Let the music play in a loop
    if (localStorage.getItem("currentLevel") === null) {
        localStorage.setItem("currentLevel", 0);
    }
    else {
        currentLevel = int(localStorage.getItem("currentLevel"));
    }
    // currentLevel = getItem("currentLevel");

    if (localStorage.getItem("score") === null) {
        localStorage.setItem("score", 0);
    }
    else {
        score = int(localStorage.getItem("score"));
    }

    // Check if currentLevel and score exist, set to 0 if not present.


    createCanvas(2560, 1440);
    backgroundImage = bgImage3;

    isPlaying = false;
    // world.autoStep = false;

    loadBackground();
    loadSkin();
    loadplayerRun();

    playerSetUp();

    // groundsensor for the player
    groundSensor = new Sprite(player.x, player.y + player.h / 2, player.w, 12)
    groundSensor.visible = false;
    groundSensor.mass = 0.1
    // groundSensor.debug = true;
    let joint = new GlueJoint(player, groundSensor)
    joint.visible = false;
    // Link groundSensor and player

    coinSetUp();

    doorSetUp();

    walkableGroupSetUp();

    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )
}

function draw() {
    clear()
    if (isPlaying) {
        if (isPause === false) {
            world.step();
            background(backgroundImage);
            camera.x = player.x;
            camera.y = player.y;
            setGamePlayVisible(true);

            // display score
            fill(175, 115, 179)
            strokeWeight(5);
            textSize(60)
            text(`Score: ${score}`, 2080, 180)

            // display level
            fill(175, 115, 179)
            strokeWeight(5);
            textSize(60)
            text(`Current Level: ${currentLevel + 1}`, 2080, 100);
        }
        else { // not playing, at pause page
            setGamePlayVisible(false);
            image(introBackground, 0, 0, 2560, 1440);

            fill(175, 115, 179, 100);
            rect(900, 300, 700, 280);
            rect(900, 600, 700, 280);
            rect(900, 900, 700, 280);

            stroke(0);
            strokeWeight(10);
            textSize(200);
            fill(255, 115, 179);
            text('Quit', 1050, 530);
            textSize(130);
            text(" Save", 1060, 730);
            text("Record", 1040, 860);
            text("Delete", 1060, 1030);
            text("Record", 1040, 1160);
        }
        if (mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            fill(175, 115, 179, 100);
        }
        else {
            stroke(175, 115, 179);
            fill(75, 115, 179, 60);
        }
        rect(100, 100, 300, 100);

        fill(0);
        textSize(100);
        strokeWeight(1);
        text('Pause', 110, 188);

        movement();
    }

    else { // not playing, in special situations
        setGamePlayVisible(false);

        if (hasWon) {
            background(0)
            fill(255)
            textSize(40)
            text(`You Win! Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)

            if (kb.pressed('enter')) {
                isPlaying = false;
                hasWon = false;
                currentLevel = 0;
                reset()
            }

        }

        else if (isGameOver) {
            background(0)
            fill(255)
            textSize(40)
            text(`Game Over. Your score: ${score} Press Enter.`, width / 2 - 300, height / 2)
            player.vel.x = 0;

            if (kb.pressed('enter')) {
                isPlaying = false;
                isGameOver = false;
                hasWon = false;
                intro = false;
                changingBackground = false;
                changingSkin = false;
                reset();
            }
        }

        /**
         * Beta Testing:
         * 
         * My mom helped me test my project, and she has hardly played any games before. 
         * Her first question was about how to control the character. Additionally, she 
         * found it difficult to jump and walk on both grass and water, so I adjusted the 
         * parameters and included explanations for these in the tutorial. She was also 
         * curious about the number of levels while playing, so I added that information as well.
         * 
         * She was a bit confused about how to change the skin (originally, my rectangular buttons 
         * were two white bars), so I changed all buttons to more distinct colors. Moreover, when 
         * you enter the button area, the button changes color, and I added this information to the 
         * tutorial.
         * 
         * I also spent a considerable amount of time testing and researching issues where the player 
         * couldn't jump to the next level and the breathing animation for the stationary cat wasn't 
         * working. I made corresponding modifications to address these issues.
         * 
         * In the classroom, I asked everyone who played my game, and they all provided me with really 
         * positive feedback. The only minor issue was that the background music would stop after 
         * playing one loop. Therefore, to address this, I replaced the backgroundMusic.play() in the 
         * setup function. After a little research, I modified it to backgroundMusic.loop() to make the 
         * music continuously loop.
         * 
         */

        else if (intro) {
            image(introBackground, 0, 0, 2560, 1440);
            fill(0);
            textSize(46);
            text(`***Thank you for playing***      GAME INTRO       ***Hope you enjoy***
Game starts:
1. The left and right arrows control the character to move left and right, 
the up arrow controls the character to jump, and the character will fall 
naturally due to gravity.
2. There are different terrains in the game. Movement under special terrains 
will encounter greater resistance and you can explore by yourself.
3. Game points and levels are recorded in the upper left corner of the game
 page.
4. When you click the pause button during the game, you can choose to save 
the record or delete the record, so that you can save the previous progress 
or start over when you refresh the website next time.
5. The difficulty of the first 9 levels of the game gradually 
increases, and the 10th level is added as a bounty level. The
 difficulty of the random terrain is greatly increased. Be careful of falling 
 off the cliff at the beginning of the game.
Change background and skin:
1. Click on the left and right rectangles to change pictures or 
animations.
2. Click on the picture or animation of the desired background or
 skin to change it.
3. Press the exit key in the upper left corner to return to the
 main page.`, 520, 110);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179, 100);
            }
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188)

            if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                isPlaying = false;
                isGameOver = false;
                intro = false;
                reset();
            }

        }

        else if (changingBackground) {
            image(backgroundBackground, 0, 0, 2560, 1440);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179, 100);
            }
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188)

            // Create two large keys that slide left and right
            if (mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                fill(175, 115, 179, 100);
            }
            else {
                stroke(175, 115, 179);
                fill(75, 115, 179, 60);
            }
            rect(100, 300, 100, 850);

            if (mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                fill(175, 115, 179, 100);
            }
            else {
                stroke(175, 115, 179);
                fill(75, 115, 179, 60);
            }
            rect(2350, 300, 100, 850);

            // Each layer corresponds to a different background
            if (ifCurrentBackground) {
                if (currentBackground === -2) {
                    image(bgImage4, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 250, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage4;
                        }
                    }
                }
                else if (currentBackground === -1) {
                    image(bgImage3, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage3;
                        }
                    }
                }
                else if (currentBackground === 0) {
                    image(bgImage, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage;
                        }
                    }
                }
                else if (currentBackground === 1) {
                    image(bgImage1, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage1;
                        }
                    }
                }
                else if (currentBackground === 2) {
                    image(bgImage2, 380, 230, 1800, 1100);
                    if (mouseX >= 380 && mouseX <= 2180
                        && mouseY >= 230 && mouseY <= 1330) {
                        fill(175, 115, 179, 30);
                        rect(380, 230, 1800, 1100);
                        if (mouseIsPressed) {
                            backgroundImage = bgImage2;
                        }
                    }
                }

                // When there is no more background when swiping to the far left or right
                else if (currentBackground < -2) {
                    fill(0);
                    textSize(100);
                    strokeWeight(1);
                    text(`No more backgrounds, 
    please swipe right.`, 830, 688);
                    currentBackground = -3;
                }
                else if (currentBackground > 2) {
                    fill(0);
                    textSize(100);
                    strokeWeight(1);
                    text(`No more backgrounds, 
    please swipe left.`, 830, 688)
                    currentBackground = 3;
                }
            }
        }

        else if (changingSkin) {
            image(skinBackground, 0, 0, 2560, 1440);

            stroke(0);
            strokeWeight(10);
            if (mouseX >= 100 && mouseX <= 400
                && mouseY >= 100 && mouseY <= 200) {
                fill(175, 115, 179, 100);
            }
            else {
                fill(75, 115, 179, 100);
            }
            rect(100, 100, 300, 100);

            fill(0);
            textSize(100);
            strokeWeight(1);
            text('Back', 138, 188);

            if (mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                fill(175, 115, 179, 100);
            }
            else {
                stroke(175, 115, 179);
                fill(75, 115, 179, 60);
            }
            rect(100, 300, 100, 850);

            if (mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                fill(175, 115, 179, 100);
            }
            else {
                stroke(175, 115, 179);
                fill(75, 115, 179, 60);
            }
            rect(2350, 300, 100, 850);

            // Each layer corresponds to a different skin, and each skin is animated.
            if (currentSkinPreview === -3) {
                animation(cat1Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -3;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === -2) {
                animation(cat2Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -2;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === -1) {
                animation(cat3Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = -1;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 0) {
                animation(cat4Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 0;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 1) {
                animation(cat5Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 1;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview === 2) {
                animation(cat6Skin, 1255, 750);
                if (mouseX >= 870 && mouseX <= 1670
                    && mouseY >= 500 && mouseY <= 1000) {
                    fill(175, 115, 179, 30);
                    rect(870, 500, 800, 500);
                    if (mouseIsPressed) {
                        currentSkin = 2;
                        setSkin();
                    }
                }
            }
            else if (currentSkinPreview < -3) {
                fill(0);
                textSize(100);
                strokeWeight(1);
                text(`No more skins, 
please swipe right.`, 830, 688);
                currentSkinPreview = -4;
            }
            else if (currentSkinPreview > 2) {
                fill(0);
                textSize(100);
                strokeWeight(1);
                text(`No more skins, 
please swipe left.`, 830, 688)
                currentSkinPreview = 3;
            }

        }

        else {
            gameStart();
        }
    }
}

function mousePressed() {
    if (isPlaying) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            isPause = !isPause;
        }
        if (isPause) {
            if (mouseIsPressed && mouseX >= 900 && mouseX <= 1600
                && mouseY >= 300 && mouseY <= 580) {
                isPlaying = false;
                // isPause = false;
            }
            // Save score record
            else if (mouseIsPressed && mouseX >= 900 && mouseX <= 1600
                && mouseY >= 600 && mouseY <= 880) {
                localStorage.setItem("currentLevel", currentLevel);
                localStorage.setItem("score", score);
                print(currentLevel, score);
            }
            // Clear History
            else if (mouseIsPressed && mouseX >= 900 && mouseX <= 1600
                && mouseY >= 900 && mouseY <= 1180) {
                localStorage.setItem("currentLevel", 0);
                localStorage.setItem("score", 0);
            }
        }
    }
    if (changingBackground) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            isPlaying = false;
            isGameOver = false;
            changingBackground = false;
            reset();
        }

        else { // Slide left or right
            if (mouseIsPressed && mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                ifCurrentBackground = true;
                currentBackground -= 1;
                console.log(currentBackground);
            }
            else if (mouseIsPressed && mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                ifCurrentBackground = true;
                currentBackground += 1;
                console.log(currentBackground);
            }
        }
    }
    if (changingSkin) {
        if (mouseIsPressed && mouseX >= 100 && mouseX <= 400
            && mouseY >= 100 && mouseY <= 200) {
            isPlaying = false;
            isGameOver = false;
            changingSkin = false;
            reset();
        }

        else { // Slide left or right
            if (mouseIsPressed && mouseX >= 100 && mouseX <= 200
                && mouseY >= 300 && mouseY <= 1150) {
                currentSkinPreview -= 1;
            }
            else if (mouseIsPressed && mouseX >= 2350 && mouseX <= 2450
                && mouseY >= 300 && mouseY <= 1150) {
                currentSkinPreview += 1;
            }
        }
    }
}

function gameStart() {
    // background(startScreenImage)
    // background(75, 115, 179);
    image(startScreenImage, 0, 0, 2560, 1440)
    animation(cat2Licking, 2350, 1368);

    fill(215, 115, 179, 220);
    strokeWeight(8);
    stroke(175, 115, 179, 320);
    textSize(200);
    text('CITY', 1500, 700)
    text('CATVENTURE', 1100, 950)


    // if(kb.pressed('enter')) {
    //     isPlaying = true;
    //     isGameOver = false;
    //     reset()
    // }

    stroke(0);
    strokeWeight(10);
    // print(mouseX, mouseY);

    // When the mouse is over a specific area, the color of that area changes to indicate selection.
    if (mouseX >= 300 && mouseX <= 900
        && mouseY >= 530 && mouseY <= 730) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(300, 530, 600, 200);

    fill(175, 115, 179);
    stroke(0);
    textSize(100);
    text('Start Game', 335, 660)

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 300 && mouseX <= 900
        && mouseY >= 770 && mouseY <= 970) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(300, 770, 600, 200);

    fill(175, 115, 179);
    stroke(0);
    textSize(100);
    text('Game Intro', 330, 910);

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 70 && mouseY <= 170) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(2000, 70, 480, 100);

    fill(175, 115, 179);
    stroke(0);
    textSize(80);
    strokeWeight(5);
    text('Background', 2014, 148);

    stroke(0);
    strokeWeight(10);
    if (mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 220 && mouseY <= 320) {
        fill(175, 115, 179, 100);
    }
    else {
        stroke(175, 115, 179);
        fill(75, 115, 179, 60);
    }
    rect(2000, 220, 480, 100);

    fill(175, 115, 179);
    stroke(0);
    textSize(80);
    strokeWeight(5);
    text('Skin', 2155, 300);

    // Four options are set: 
    // start the game, game introduction, change background and skin.

    if (mouseIsPressed && mouseX >= 300 && mouseX <= 900
        && mouseY >= 530 && mouseY <= 730) {
        isPause = false;
        isPlaying = true;
        groundSensor.x = player.x;
        groundSensor.y = player.y + player.h / 2;
        isGameOver = false;
        reset();
    }

    else if (mouseIsPressed && mouseX >= 300 && mouseX <= 900
        && mouseY >= 770 && mouseY <= 970) {
        intro = true;
    }
    else if (mouseIsPressed && mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 70 && mouseY <= 170) {
        changingBackground = true;
        ifCurrentBackground = true;
    }
    else if (mouseIsPressed && mouseX >= 2000 && mouseX <= 2450
        && mouseY >= 220 && mouseY <= 320) {
        changingSkin = true;
    }
}

function playerSetUp() { //Create player sprite
    player = new Sprite(PLAYER_ATTRIBUTES.START_X, PLAYER_ATTRIBUTES.START_Y + 20)

    setSkin();

    player.rotationLock = true;
    player.scale = 5.5;
    player.width = PLAYER_ATTRIBUTES.WIDTH;
    player.height = PLAYER_ATTRIBUTES.HEIGHT;
    // player.debug = true;

}

function setSkin() { //Different layers correspond to animations of different skins
    if (currentSkin === -3) { 
        player.addAnimation('idle', cat1Stand)
        player.addAnimation('running', cat1Right)
    }
    else if (currentSkin === -2) {
        player.addAnimation('idle', cat2Stand)
        player.addAnimation('running', cat2Right)
    }
    if (currentSkin === -1) {
        player.addAnimation('idle', cat3Stand)
        player.addAnimation('running', cat3Right)
    }
    else if (currentSkin === 0) {
        player.addAnimation('idle', cat4Stand)
        player.addAnimation('running', cat4Right)
    }
    if (currentSkin === 1) {
        player.addAnimation('idle', cat5Stand)
        player.addAnimation('running', cat5Right)
    }
    else if (currentSkin === 2) {
        player.addAnimation('idle', cat6Stand)
        player.addAnimation('running', cat6Right)
    }
}

function coinSetUp() {
    coin = new Group()
    coin.w = COIN_ATTRIBUTES.COIN_WIDTH;
    coin.h = COIN_ATTRIBUTES.COIN_HEIGHT;
    coin.tile = '0'
    coin.collider = 'static'
    coinImg.resize(100, 100);
    coin.image = coinImg
    coin.visible = false;

    // remove coins when the player touches them
    player.overlap(coin, function cb(p, c) {
        c.remove();
        coinSound.play()
        score += 1
    })
}

function doorSetUp() {
    door = new Group()
    door.w = 30;
    door.h = 50;
    door.tile = 'x'
    door.collider = 's'
    // door.image = doorImage;
    doorImage.resize(120, 240);
    door.image = doorImage;
    door.visible = false;

    // move to the next level when the player touches the door
    player.overlap(door, function cb(p, d) {
        nextLevel();
    })
}

function walkableGroupSetUp() { //The following are things cats can walk on:
    walkable = new Group()
    walkable.layer = 1;
    // walkable.debug = true;

    floor = new walkable.Group();
    floor.w = TILE_SIZE;
    floor.h = TILE_SIZE;
    floor.tile = 'f';
    floor.collider = 's'; 
    floorTile.resize(100, 100);
    floor.image = floorTile;

    water = new walkable.Group();
    water.w = TILE_SIZE;
    water.h = TILE_SIZE;
    water.tile = 'w';
    water.collider = 'n'; // Accurate collision detection
    waterTile.resize(100, 100);
    water.image = waterTile;

    dirt = new walkable.Group();
    dirt.w = TILE_SIZE;
    dirt.h = TILE_SIZE;
    dirt.tile = 'd';
    dirt.collider = 's';
    dirtTile.resize(100, 100);
    dirt.image = dirtTile;

    grass = new walkable.Group()
    grass.w = TILE_SIZE;
    grass.h = TILE_SIZE;
    grass.tile = 'g';
    grass.collider = 'n'; // Accurate collision detection
    grassTile.resize(100, 100);
    grass.image = grassTile;

    // Water and grass need to be detected to achieve increased resistance
}

function movement() {
    if (kb.pressing(LEFT_ARROW)) { // Animation of running left and right
        player.vel.x = -PLAYER_ATTRIBUTES.SPEED;
        player.ani = 'running'
        player.mirror.x = true;
    } else if (kb.pressing(RIGHT_ARROW)) {
        player.vel.x = PLAYER_ATTRIBUTES.SPEED;
        player.ani = 'running'
        player.mirror.x = false;
    }
    else { // still animation
        player.vel.x = 0;
        player.ani = 'idle'
        // cat1Stand.scale = 5.5;
        // player.changeAni(cat1Stand);
    }
    if (kb.presses(UP_ARROW) && groundSensor.colliding(walkable)) {
        player.vel.y = -PLAYER_ATTRIBUTES.JUMP_FORCE;
    }

    // create friction when the player is on grass or in water
    if (groundSensor.overlapping(grass) || groundSensor.overlapping(water)) {
        player.drag = 1;
        player.friction = 5;
    } else {
        player.drag = 0;
        player.friction = 0;
    }

    // game over when the player falls off
    if (player.y > GAME_BOUND) {
        isPlaying = false;
        isGameOver = true;
    }
    // storeData();
}

// next level program
function nextLevel() {
    if (currentLevel === TILE_MAPS.length - 1) {
        isPlaying = false;
        hasWon = true;
        return;
    }
    currentLevel++;

    // reset
    player.speed = 0;
    player.x = PLAYER_ATTRIBUTES.START_X;
    player.y = PLAYER_ATTRIBUTES.START_Y;
    tileMap.remove();
    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )
}

// Settings that require restarting under special circumstances
function reset() {
    player.speed = 0;
    player.x = PLAYER_ATTRIBUTES.START_X;
    player.y = PLAYER_ATTRIBUTES.START_Y;
    tileMap.remove();
    tileMap = new Tiles(TILE_MAPS[currentLevel],
        TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE - 1,
        TILE_SIZE - 1,
    )

}


function setGamePlayVisible(bool) {
    // If gamePlay doesn't want to be seen, none of the following should be seen.
    player.visible = bool;
    walkable.visible = bool;
    door.visible = bool;
    coin.visible = bool;
}


