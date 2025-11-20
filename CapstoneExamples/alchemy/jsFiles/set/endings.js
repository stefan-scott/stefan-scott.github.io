// Manages endings
let glitchGif;

let endingList = [
  'All the endings for now',
  ['ripped Battle1', ['Oh well', 'What did you expect?']],
  ['poisioned Battle 2', ['That must have hurt']],
  ['eaten Battle 3', ['That was quick', 'And', 'Too merciful']],
  ['starved', ["Just because You can't remember", 'Does not mean you forget to eat', 'Idiot']],
  ['success', ['YOU', 'WILL', 'BE', 'BACK']],
  ['remembers', ['Too Much To Remember?', 'How Ironic']],
];
// Parameters:
// endingName, [text], img

let
  ending = 0,
  endingLineTimer = 200,
  currEnding = 0,
  currEndLine = 0,
  endingInProgress = false;




function endingCon() {
  // draw()
  if (endingInProgress) {
    endingManager();
    endingBg();
    endingDialogue();
  }
}


function endingBg() {
  // draw the bg
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, width, height);
}


function endingDialogue() {
  // fades in the dialogue
  if (currEndLine < endingList[currEnding][1].length) {
    push();
    textSize(20);
    noStroke();
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, endingLineTimer);
    text(endingList[currEnding][1][currEndLine], width / 2, height / 2);
    endingLineTimer--;
    if (endingLineTimer === 0) {
      endingLineTimer = 200;
      currEndLine++;
    }
    pop();
  }
  else if (drankMemorySpell && memoryTimer !== 0) {
    cueMemory();
  }
  else {
    endingInProgress = false;
    currentSet = 0;
    currEndLine = 0;
    restartGame(); //restart everything
  }
}



function endingManager() {
  // Manage ending
  if (char.health === 0 && starved) {
    currEnding = 4;
  }
  else if (drankMemorySpell) {
    currEnding = 6;
  }
  else if (currentSet === 1 && monsterList[currentSet - 1].defeated === false) {
    currEnding = 1;
  }
  else if (currentSet === 2 && monsterList[currentSet - 1].defeated === false) {
    currEnding = 2;
  }
  else if (currentSet === 3 && monsterList[currentSet - 1].defeated === false) {
    currEnding = 3;
  }
  else if (currentSet === 3 && currentSubSet === 3) {
    currEnding = 5;
  }
}