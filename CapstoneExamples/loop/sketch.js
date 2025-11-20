// Loop Hero
// Luke Wu
// May 13, 2024
//
// Repeat loop game, fight for fun, just fight

// the meaning of code are as same as the name is short for ASAN;

// ASAN
const taunts = [
  "Your gaming skills are on par with a sleep-deprived sloth.",
  "I've seen bots play more skillfully than you.",
  "Are you trying out a new strategy called\n 'random button smashing'?",
  "You're the reason they invented 'easy mode'.",
  "Watching you play is like witnessing\n a car crash in slow motion.",
  "Do you need a map to find the 'skill' button?",
  "You're like a GPS for death in this game.",
  "Your gaming skills are like your internet connection\n - lagging behind.",
];
let tauntSentence = 0;

const compliments = [
  "You're doing an amazing job!",
  "Your skills are impressive!",
  "That was a fantastic performance!",
  "You handled that perfectly!",
  "You have great talent!",
  "Your effort really paid off!",
  "You're a natural at this!",
  "Keep up the great work!",
  "You're really mastering this!",
  "You're doing excellent!"
];
let complimentSentence = 0;

const ENEMY_TYPE = ['shielder','knife','spearman','archer'];

let dungeon;

// for dungeon coordinate
let dungeonX = 0, dungeonY = 0;

// for dungeon paning
let paning = 0;
let paningstate = 'null';



// ASAN
let freezetime = 0;

let hero;
let hero_ani = new SpecialAni();


let is_tutorial_show = false;

let Is_dash_touch = false;
let dash_hero;


// this is to test should the program show the death message
let endprocess = false;

// ASAN
let skeleton_shielder_ani = new SpecialAni();
let skeleton_archer_ani = new SpecialAni();
let skeleton_knife_ani = new SpecialAni();
let skeleton_spearman_ani = new SpecialAni();
let skeleton_boss0_ani = new SpecialAni();
let skeleton_boss1_ani = new SpecialAni();


let ShiftFreeze = 0;
let generateFreeze = 0;
let Monsternum = 0;
let monsterList = [];

BulletList = [];

const EDGE = {
  xstart:28,
  xend: 612,
  ystart: 12,
  yend: 276
}

//SFX
let shield_counter;
let shield_atk;
let atkSFX;
let arrowSFX;


// gamestate
let gameState = 'mainMenu';

// menu img
let menu;


// for different Loop
// the more loop player play
// the more better they are,
// also monster will be enhanced as well
let LoopTime;
let Finished_room;
let atkTimes;
let defTimes;
let magicTimes;
let shootTimes;
let dashTimes;


let Menu_wait_time = 0; // if player mouse has been 
//the same place as tutorial or play once the pressed and the game end, the programm will respond so quickly

// ASAN
const tutorialText = `
Game Controls Tutorial

Movement:
- W: Move Up
- A: Move Left
- S: Move Down
- D: Move Right

Actions:
- J: Attack
- K: Defend
- L: Shoot
- U: Cast Magic
- Shift: Dash

Additional Tips:
- Shielder will have reduced damage if you attack in front of them. For every 4 seconds, their attack power will increase.
- Knifer will recover 3 HP and increase attack power every 2 seconds.
- Spearman will push harder with their attacks.
- In this game, you will see a circle enclosing the character representing the immunity frame and the 's' indicates seconds.
- Performing a Shield Counter will increase your immunity time if successful.
- Magic (U) allows you to teleport symmetrically towards the origin.
- The right corner of the screen displays the map. Blue represents the player, red represents the boss, and green represents the spawn room.

Make sure to practice these controls in the tutorial area to get comfortable before facing real challenges in the game.
`;


function setup() {
  //ASAN
  createCanvas(40*16 + 5 * 16,20 * 16);


  // use localstorage to store important data
  if(localStorage.getItem("LoopTime") === null){
    localStorage.setItem("LoopTime",1);
  }
  LoopTime = localStorage.getItem("LoopTime");

  if(localStorage.getItem("Finished_room") === null){
    localStorage.setItem("Finished_room",0);
  }
  Finished_room = localStorage.getItem("Finished_room");

  if(localStorage.getItem("atkTimes") === null){
    localStorage.setItem("atkTimes",0);
  }
  atkTimes = localStorage.getItem("atkTimes");


  if(localStorage.getItem("defTimes") === null){
    localStorage.setItem("defTimes",0);
  }
  defTimes = localStorage.getItem("defTimes");

  if(localStorage.getItem("shootTimes") === null){
    localStorage.setItem("shootTimes",0);
  }
  shootTimes = localStorage.getItem("shootTimes");

  if(localStorage.getItem("magicTimes") === null){
    localStorage.setItem("magicTimes",0);
  }
  magicTimes = localStorage.getItem("magicTimes");
  
  if(localStorage.getItem("dashTimes") === null){
    localStorage.setItem("dashTimes",0);
  }
  dashTimes = localStorage.getItem("dashTimes");


  

  // this is to set listener once the music end
  for(let i = 0; i < musicList.length; ++i){
    musicList[i].onended(music_shuffle);
  }
}

function draw() {
  // ASAN
  clear();
  gameProcess();

}



function mousePressed() {
  // ASAN, only apply in mainmenu state
  if(is_tutorial_show && gameState === 'mainMenu'){
    is_tutorial_show = false;
  }

  // monsterList.push(new Enemy(32,32,null,null,null,'boss1'));

  


  
  // dungeon.setup();
  // dungeon.mini_map(); 
  
}



function keyPressed(){
  // if(keyIsDown(DOWN_ARROW)){
  //   hero.hp = 0;
  // }
  // // else if(keyIsDown(UP_ARROW)){monsterList[0].speed = 1}
  // else if(keyIsDown(LEFT_ARROW)){
  //   for(let i = 0 ; i < monsterList.length; ++i){
  //     monsterList[i].hp = 0;
  //   }}
  
  // if(keyIsDown(49))hero.immuneFreeze += 0x3f3f3f; 

  // above is test

  // press 0 to show collider
  if(keyIsDown(48) && gameState === "play"){
    for(let i = 0; i < monsterList.length; ++i){
      monsterList[i].debug = hero.debug;
      monsterList[i].debug ? monsterList[i].debug = false : monsterList[i].debug = true;
    }
    hero.debug ? hero.debug = false : hero.debug = true
  }
  
}



function uiBar(){
  // ASAN, show skillfreeze by graphic also hp_bar
  textSize(20);

  rectMode(CORNER)
   fill(122);
  rect(40*16,5*16,5*16,15*16);
  atkTimes > 100 ? fill(63,76,86) : fill(0);
  rect(40*16,5*16, 5 * 16 - map(hero.atkFreeze,0,hero.atkFreezeMax,0,5*16),3*16);
  fill(255);
  text('atk',41 * 16, 6.5 * 16);

  defTimes > 100 ? fill(145,99,125) :fill(102, 51, 153);
  rect(40*16,8*16, 5 * 16 - map(hero.defFreeze,0,hero.defFreezeMax,0,5*16),3*16);
  fill(255);
  text('def',41 * 16, 9.5 * 16);

  shootTimes > 100 ? fill(131,175,155) : fill(0, 128, 0);
  rect(40*16,11*16, 5*16 - map(hero.shootFreeze,0,hero.shootFreezeMax,0,5*16),3*16);
  fill(255);
  text('shoot',41 * 16, 12.5 * 16);
  
  magicTimes > 100 ? fill (224,228,204) :fill(135, 206, 235);
  rect(40*16,14*16, 5 * 16 - map(hero.magicFreeze,0,hero.magicFreezeMax,0,5*16),3*16);
  fill(255);
  text('magic',41 * 16, 15.5 * 16);


  dashTimes > 100 ? fill(200,200,169) : fill(138,194,219);
  rect(40*16,17*16, 5 * 16 - map(hero.dashFreeze,0,hero.dashFreezeMax,0,5*16),3*16);
  fill(255);
  text('dash',41 * 16, 18.5 * 16);
}




function check_dash(){
  // ASAN , check for dash_hero
  // the location for hero next dash
  Is_dash_touch = false;
  for(let i = 0; i < monsterList.length; ++i){
    if(dash_hero.CheckCollision(monsterList[i].selfcollider)){
      Is_dash_touch = true;
      break;
    }
  }

  dash_hero.x = hero.x;
  dash_hero.y = hero.y;

  if(hero.direction === 'right'){
    dash_hero.x += 128;
  }
  else if(hero.direction === 'left'){
    dash_hero.x -=128;
  }
  else if(hero.direction === 'up'){
    dash_hero.y -= 128;
  }
  else{
    dash_hero.y += 128;
  }

  fill(0,255,0);
  if(Is_dash_touch){
    fill(255,0,0);
  }
  
  dash_hero.display();
}



function generate_monster(){
  // ASAN
  if(dungeon.map[dungeon.index[0]][dungeon.index[1]].type !== 'boss'){
    // not the boss, generate the monster one by one
    // rather than generate all of them at one time
    if(ShiftFreeze > 0)ShiftFreeze --;
    if(generateFreeze > 0)generateFreeze --;

    if(!dungeon.map[dungeon.index[0]][dungeon.index[1]].played && !dungeon.map[dungeon.index[0]][dungeon.index[1]].has_generate
      && ShiftFreeze === 0
    ){
      if(Monsternum > 0 && generateFreeze === 0){
        let x = random(EDGE.xstart , EDGE.xend);
        let y = random(EDGE.ystart, EDGE.yend);
        monsterList.push(new Enemy(x,y,null,null,null,ENEMY_TYPE[int(random(ENEMY_TYPE.length))]));
        generateFreeze = 90;
        Monsternum--;
        if(hero.hp > 0)hero.immuneFreeze += 40 ;
      }
        
      if(Monsternum === 0)dungeon.map[dungeon.index[0]][dungeon.index[1]].has_generate = true;
    }

    if(!dungeon.map[dungeon.index[0]][dungeon.index[1]].played && dungeon.map[dungeon.index[0]][dungeon.index[1]].has_generate
      && monsterList.length === 0
    ){
      // if played then set up variable
      dungeon.map[dungeon.index[0]][dungeon.index[1]].played = true;
      Finished_room++;
      localStorage.setItem("Finished_room",Finished_room);

    }
  }
  else{
    if(!dungeon.map[dungeon.index[0]][dungeon.index[1]].played && !dungeon.map[dungeon.index[0]][dungeon.index[1]].has_generate){
      // generate the boss at one time
      for(let i = 0; i < 2; ++i){
        let x = random(EDGE.xstart ,EDGE.xend);
        let y = random(EDGE.ystart, EDGE.yend);
        monsterList.push(new Enemy(x,y,null,null,null,"boss"+i));
        dungeon.map[dungeon.index[0]][dungeon.index[1]].has_generate = true;
      }
   } 
   if(monsterList.length === 0 && !endprocess){
    // endprocee is the var help me generate the taunt just once after boss died
    // set up variable after boss die
    dungeon.map[dungeon.index[0]][dungeon.index[1]].played = true;
    complimentSentence = int(random(compliments.length));
    endprocess = true;
    LoopTime ++;
    localStorage.setItem("LoopTime",LoopTime);
    for(let i = 0; i < dungeon.cell.length; i++){
      if(!dungeon.map[dungeon.cell[i][0]][dungeon.cell[i][1]].played)dungeon.map[dungeon.cell[i][0]][dungeon.cell[i][1]].played = true;
    }
  }
  }
}


function gameLoop(){
  
  // ASAN
  // aplly when game state is play

  dungeonDisplay();

  check_and_play_music();

  hero.all_in_one();

  //make hero move only it is alive
  if(hero.hp > 0){
    hero.action();
    hero.skillAction();
    check_dash();
  }

  // clear bullet once hero die
  if(hero.hp === 0)BulletList.length = 0;
  

  generate_monster();


  // check for monster death 
  for(let i = 0; i < monsterList.length; ++i){
    monsterList[i].Enemy_action();
    if(monsterList[i].condition === 'null'){
      monsterList.splice(i,1);
      i--;
      if(hero.hp > 0){
        if(hero.hp === hero.hpMax)hero.immuneFreeze += 30;
        hero.hp += hero.hpMax / 20;
        if(hero.hp > hero.hpMax)hero.hp = hero.hpMax;
        
      }
    }
  }

  // check for if the bullet has used
  for(let i = 0; i < BulletList.length; ++i){
    BulletList[i].display();
    BulletList[i].out_of_range();
    BulletList[i].Check();
    if(BulletList[i].Is_used){
      BulletList.splice(i,1);
      i--;
    }
  }
  




  


  // display mini_map  
  dungeon.mini_map();
  


 // ASAN
  uiBar();
  hero.hp_bar();
  



  
  // clear();

  // image(temp.get(0,0,48,32),mouseX,mouseY);
  //highlight here, one bug, cause my skeleton not move properly
  // this is because here the index of ani class has always change
  // image(skeleton_shielder_ani.aniarr['run']['right'][skeleton_shielder_ani.index % 7],mouseX,mouseY);
  // if(frameCount % 7 === 0)skeleton_shielder_ani.index ++;
}

function gameProcess(){
  // ASAN
  // run the programm under diff gameState
  if(gameState === 'play'){
    textAlign(LEFT,BOTTOM);
    textStyle(BOLD);
    gameLoop();
    // hero is dead
    if(hero.condition === 'null'){
      textAlign(CENTER);
      textStyle(ITALIC);
      fill(255,0,0);
      text(taunts[tauntSentence],(EDGE.xstart + EDGE.xend)/2,(EDGE.ystart + EDGE.yend)/2);

      text("Press to return to the main menu",mouseX,mouseY);

      if(mouseIsPressed){
        gameState = 'mainMenu';
        Menu_wait_time = 30;
      } 
    }

    // boss is dead, player win
    if(dungeon.map[dungeon.bossCell[0][0]][dungeon.bossCell[0][1]].played){
      textAlign(CENTER);
      textStyle(ITALIC);
      fill(0,255,0);
      text(compliments[complimentSentence],(EDGE.xstart + EDGE.xend)/2,(EDGE.ystart + EDGE.yend)/2);

      
      text("Press to return to the main menu",mouseX,mouseY);

      if(mouseIsPressed){
        gameState = 'mainMenu';
        Menu_wait_time = 30;
      } 
    }
   
  }
  else if(gameState === 'init'){
   // init all the variable
  musicIndex = int(random(musicList.length))
  monsterList.length = 0;
   dungeon = new Dungeon();
   dungeon.setup();
   hero = new SpecialCharacter((EDGE.xstart + EDGE.xend)/2,(EDGE.ystart + EDGE.yend)/2, 20 + int(Finished_room/3), 50 + int(Finished_room), hero_ani);
   Is_dash_touch = false;
   dash_hero = new Collider(hero.x, hero.y, 15, 15, 'rect', 0, 'null', 'null', true);   
   gameState = 'play';
    endprocess = false;
  }
  else if(gameState === 'mainMenu'){
    // show the button once the gameState is main menu
    // stop the music
    if(Menu_wait_time > 0)Menu_wait_time --;

    if(musicList[musicIndex].isPlaying())musicList[musicIndex].stop();
    textAlign(LEFT,BOTTOM);
    textStyle(BOLD);
    imageMode(CORNER);
    image(menu,0,0,width,height);
    fill(255);
    textSize(40);
    text("Loop Hero",50,50);
    text(`Loop: ${LoopTime}`,32*16, 100);
    text(`Finished room: ${Finished_room}`,16*16, 320);
    // use the diff of fill to show the touch of button
    fill(0)
  if(mouseX <= 230 && mouseX >= 30
    && mouseY <= 280 && mouseY >= 200
    && !is_tutorial_show
  ){
    fill(0,255,0);
    if(mouseIsPressed && !is_tutorial_show && Menu_wait_time === 0){
      is_tutorial_show = true;
    } 
  }
  rect(30,200,200,80);
  fill(255);
  text("tutorial",40,240);

  if(is_tutorial_show){
    textAlign(CENTER);
    textStyle(ITALIC);
    textSize(10);
    fill(255);
    rect(0,0,width,height);
    fill(0);
    text(tutorialText,330,300);
    fill(255,0,0);
    text("Press to return to the main menu",mouseX,mouseY);
  }
      
  if(!is_tutorial_show){
    rectMode(CORNER);
  fill(0);
  if(mouseX <= 230 && mouseX >= 30
    && mouseY <= 180 && mouseY >= 100
  ){
    fill(0,255,0);
    if(mouseIsPressed && Menu_wait_time === 0){
      gameState = 'init';
    }
  }
    rect(30,100,200,80);
    fill(255);
    textSize(30);
    text("start Game",40,140);  
  }

  }

}


 //old
// myplayer = new Player;
// mymap = new Gamemap();
// mymap.setup();









  // test for map 
  //// let x = dungeon.index[1];
  // let y = dungeon.index[0];
  
  // if (keyIsDown(UP_ARROW) === true) {
  //   y -=1;
  //   if(dungeon.in_range(y,x) && dungeon.map[y][x].visited){
  //     dungeon.index[0] -=1;
      
  //   }
  //   else{
  //     y+=1;
  //   }
  // }

  // if (keyIsDown( DOWN_ARROW) === true) {
  //   y +=1;
  //   if(dungeon.in_range(y,x) && dungeon.map[y][x].visited){
  //     dungeon.index[0] +=1;
  //   }
  //   else{
  //     y-=1;
  //   }
  // }

  // if (keyIsDown(LEFT_ARROW) === true) {
  //   x -=1;
  //   if(dungeon.in_range(y,x) && dungeon.map[y][x].visited){
  //     dungeon.index[1] -=1;
  //   }
  //   else{
  //     x+=1;
  //   }
  // }

  // if (keyIsDown(RIGHT_ARROW) === true) {
  //   x +=1;
  //   if(dungeon.in_range(y,x) && dungeon.map[y][x].visited){
  //     dungeon.index[1] +=1;
  //   }
  //   else{
  //     x-=1;
  //   }
  // }









  // down 308 - 326 , 274
  // up 308 - 326 , 12
  // left 28, 144 - 154
  // right 612, 144 - 154