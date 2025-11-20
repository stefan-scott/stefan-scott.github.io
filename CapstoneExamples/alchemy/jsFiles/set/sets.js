// Manages the sets
let set = [
  ['Intro Scene'],

  ['Set1 Chains',
    ['Dungeon', false, [/*Not Allowed*/], [/*Next x,y*/], [2, 1]]
  ],

  ['Set2 Bottom',
    ['Bottom', false, [/*Not Allowed*/], [/*Next x,y*/], [2, 2]],
    ['Top', false, [/*Back x,y*/], [/*Next x,y*/], [3, 1]]
  ],

  ['Set3 Library',
    ['Entrance', false, [/*Not Allowed*/], [/*Next x,y*/], [3, 2]],
    ['Reading', false, [/*Back x,y*/], [/*Next x,y*/], [3, 3]],
    ['Out', false, [/*Back x,y*/], [/*Next x,y*/], [/*special case*/, /*special case*/]]
  ]
]

// Parameters:
// [Name, dialogueDone, [Going Back XY], [Moving on XY], [ReturningSetInfo], img]

let currentSet = 0;   //0- menu.js Homescreen,   1- Chains   2- Hallways   3- Library  4- Ending
let currentSubSet = 1;  //is 0-battle scene >0- defined above
let setLeft;


function setPreLoad() {
  if (!gameSaved) {
    set[1][1].push(loadImage("/assets/images/set/set1_subSet1_chains1.png"));
    set[2][1].push(loadImage("/assets/images/set/set2_subSet1_stairs1.png"));
    set[2][2].push(loadImage("/assets/images/set/set2_subSet2_stairs2.png"));
    set[3][1].push(loadImage("/assets/images/set/set3_subSet1_library1.png"));
    set[3][2].push(loadImage("/assets/images/set/set3_subSet2_library2.png"));
    set[3][3].push(loadImage("/assets/images/set/set3_subSet3_library3.png"));
  }
}

function setSetup() {
  // setup()
  // fill in some value because width and height
  if (!gameSaved) {
    // change backto
    set[2][2][2] = [0, height / 2];
    set[3][2][2] = [0, height / 2];
    set[3][3][2] = [0, height / 2];

    // change onto
    set[1][1][3] = [width - width / 9, height - height / 6];
    set[2][1][3] = [width, height - 50];
    set[2][2][3] = [width, height - 50];
    set[3][1][3] = [width, height - height / 6];
    set[3][2][3] = [width, height - height / 6];
    set[3][3][3] = [width, height - height / 6];
  }
  else {
    set = saved.get(set);
    setLeft = saved.get(setLeft);
    currentSet = saved.get(currentSet);
    currentSubSet = saved.get(currentSubSet);
  }
}

function setCon() {
  // draw()
  setDisplay();
  setChangeHandler();
}


function setDisplay() {
  // show the bg
  imageMode(CENTER);
  if (currentSet !== 0 && currentSubSet !== 0) {
    image(set[currentSet][currentSubSet][5], width / 2, height / 2, width, height);
  }
}




function setChangeHandler() {
  // manage set changing
  // going out to
  if (currentSet === 0) return;
  if (char.x > set[currentSet][currentSubSet][3][0] - charBod) {
    if (char.y < set[currentSet][currentSubSet][3][1] + charBod && char.y > set[currentSet][currentSubSet][3][1] - charBod) {   // in sub1
      if (currentSet === 3 && currentSubSet === 3) {
        endingInProgress = true;
      }
      else {
        char.x = 100;
        let prevSet = currentSet;
        let prevSubSet = currentSubSet;
        currentSet = set[prevSet][prevSubSet][4][0];
        currentSubSet = set[prevSet][prevSubSet][4][1];
      }
    }
  }

  // going back to
  if (currentSubSet !== 1) {
    if (char.x < set[currentSet][currentSubSet][2][0] + charBod) {
      if (char.y < set[currentSet][currentSubSet][2][1] + charBod && char.y > set[currentSet][currentSubSet][2][1] - charBod) {   // in sub1
        char.x = width - 100;
        currentSubSet = currentSubSet - 1;
      }
    }
  }
}