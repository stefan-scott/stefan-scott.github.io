// this is My load file, deal all the load problem;

// the meaning of code are as same as the name is short for ASAN;


// ASAN
const ANIDIRECTION = ["down", 'left', 'right', 'up'];
let ClosedDoorset = []; 
let OpenDoorset = []
let wallset = []; // 40 x 20
let floorset = []; // 38 x 17










function loadAssets() {

  // load Assets


  
  // load the menu
  menu = loadImage("assets/2.png");

  
  // main character
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    hero_ani.loadAni('run', ANIDIRECTION[i] , 'assets/main Character/run/' + ANIDIRECTION[i]  + '/' , 7);
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    hero_ani.loadAni('atk', ANIDIRECTION[i] , 'assets/main Character/atk/' + ANIDIRECTION[i]  + '/' , 7);
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    hero_ani.loadAni('def', ANIDIRECTION[i] , 'assets/main Character/def/' + ANIDIRECTION[i]  + '/' , 5);
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    hero_ani.loadAni('magic', ANIDIRECTION[i] , 'assets/main Character/magic/' + ANIDIRECTION[i]  + '/' , 6);
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    hero_ani.loadAni('shoot', ANIDIRECTION[i] , 'assets/main Character/shoot/' + ANIDIRECTION[i]  + '/' , 5);
  }
  // diff method because the diff of file name and direction
  for(let i = 0; i < 5; ++i){
    hero_ani.aniarr['die'].push(loadImage('assets/main Character/die/' + i + '.png'));
  }

  // skeleton shielder
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_shielder_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/Shielder/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_shielder_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/Shielder/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_shielder_ani.deathLoad('die', 'down','assets/Skeleton/Shielder/die/' , 5 );
  }
  // archer
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_archer_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/archer/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_archer_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/archer/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_archer_ani.deathLoad('die', 'down','assets/Skeleton/archer/die/' , 5 );
  } 
  // knife
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_knife_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/knife/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_knife_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/knife/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_knife_ani.deathLoad('die', 'down','assets/Skeleton/knife/die/' , 5 );
  }
  // spearman
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_spearman_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/spearman/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_spearman_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/spearman/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_spearman_ani.deathLoad('die', 'down','assets/Skeleton/spearman/die/' , 5 );
  }

  //SFX
  shield_counter = loadSound("assets/SFX/sword-slash-with-metal-shield-impact-185433.mp3");
  shield_atk = loadSound("assets/SFX/face-punch-2-84757.mp3");
  atkSFX = loadSound("assets/SFX/knife-slice-41231.mp3");
  arrowSFX = loadSound("assets/SFX/arrow-body-impact-146419.mp3")

  
  //dungeon
  wallset.push(loadImage("assets/wall/wall.png"));
  floorset.push(loadImage("assets/floor/floor.png"))
  // n w s e
  for(let i = 0; i < 4; ++i){
    ClosedDoorset.push(loadImage("assets/ClosedDoor/" + i + '.png') );
    OpenDoorset.push(loadImage("assets/Opendoor/" + i + '.png'))
  }
 
  for(let i = 0; i < 8; ++i){
    musicList.push(loadSound('assets/music/' + i  + '.mp3'));
  }
 

  // boss
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_boss0_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/boss0/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_boss0_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/boss0/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_boss0_ani.deathLoad('die', 'down','assets/Skeleton/boss0/die/' , 5 );
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_boss1_ani.SavetimeLoad('run', ANIDIRECTION[i] , 'assets/Skeleton/boss1/walk/'  , 7, 'walk');
  }
  for(let i = 0 ; i < ANIDIRECTION.length; ++i){
    skeleton_boss1_ani.SavetimeLoad('atk', ANIDIRECTION[i] , 'assets/Skeleton/boss1/tuci/' , 7, 'tuci');
  }
  for(let i = 0; i < 1; ++i){
    skeleton_boss1_ani.deathLoad('die', 'down','assets/Skeleton/boss1/die/' ,5 );
  }
}






function preload() {
  // load the assets in preload
  loadAssets();

}
