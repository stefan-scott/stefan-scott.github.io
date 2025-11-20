// Manages dialogues for every subset

let dialogues = [
  ['Set1 Sub1', 1, 1, ['It is dark...', 'And it is cold...', 'Your muscles ache..', 'How long have you been here?', 'And       W           H           Y?']],
  ['Set2 Sub1', 2, 1, ['You...', 'g}$.&s!s.|s%s!."$~~}"sr.#}.tw|r.#vo#.ys(<', 'g]c.eS`S.ac^^]aSR.b].PS.bVS`S.T]`SdS`', '...', 'You must not remember', '', '', 'The hallway is long.', 'It seems never-ending.', 'Like your dreams once were.']],
  ['Set2 Sub2', 2, 2, ['Stop Searching.', 'There is nothing for you to go on for...', 'Nothing...', 'Nobody...', 'No matter how Far you go.']],
  ['Set3 Sub1', 3, 1, ['Does the room feel familiar?', 'Like you have been here before?', 'If not...', 'Good', 'There is nothing here of importance Anymore', 'Like the dust on the chair', 'Or the sins that you bear...', 'Does that trigger Anything?']],
  ['Set3 Sub2', 3, 2, ['G    O                 B     A     C    K                  N        O        W']],
  ['Set3 Sub3', 3, 3, ['Will you ever falter?', 'Have you not done enough?', 'They say the evil shall perish', 'If you choose to leave', 'Here is something for you to remember', 'You are the reason   I   am like this', 'Forever trapped', 'And I Will Bring You B.A.C.K']]
];
//  Parameters:
// [ 'Set# SubSet#', SetNum, SubSetNum [Lines] ]


let
  textState = 'Writing',
  currLine = 0,
  charTyped = 0,
  fullLineShown = false;


// ++++++++++++++++++++++++++++++++++++++++++++++++
// Caller Functions 
// ++++++++++++++++++++++++++++++++++++++++++++++++


function diaSetup() {
  // setup()
  if (gameSaved) {
    dialogues = saved.get(dialogues);
  }
}


function dialogueCon() {
  // draw()
  if (set[currentSet][currentSubSet][1] === false) {
    drawDiaBox();
    showDialogue(dialogues[0][3]);
  }
}


function diaPressed() {
  // mousePressed()
  if (set[currentSet][currentSubSet][1] === false) dialogueBoxPressed();
}



// ++++++++++++++++++++++++++++++++++++++++++++++++
// Cutscene
// ++++++++++++++++++++++++++++++++++++++++++++++++

function drawDiaBox() {
  // draw the box and ? marks
  push();
  rectMode(CENTER);
  strokeWeight(4);
  stroke(41, 36, 21);
  fill(224, 202, 139);
  rect(width / 2, height - height / 6, 500, 130, 10);

  textAlign(CENTER, CENTER);
  textSize(20);
  text('????', width / 2 - 190, (height - height / 6) - 62);
  pop();
}

function showDialogue(dias) {
  // play dialogue line by line. Stop animation if mousePressed
  rectMode(CENTER);
  textSize(15);
  fill(41, 36, 21);
  if (textState === 'Writing') {
    animateText(dias[currLine]);
    if (charTyped - 1 === dias[currLine].length) {
      fullLineShown = true;
    }
  }
  else if (textState === 'AtOnce') {
    textAlign(LEFT, TOP);
    text(dias[currLine], width / 2, height - height / 7, 400, 110);
    fullLineShown = true;
  }
}


function animateText(line) {
  // animate the lines
  textAlign(LEFT, TOP);
  text(line.substring(0, charTyped + 1), width / 2, height - height / 7, 400, 110);
  if (frameCount % 2 === 0) charTyped++;
}


function dialogueBoxPressed() {
  // The function that either finishes the animation or moves on to the next line
  if (mouseX > width / 12 && mouseX < width - width / 12) {
    if (mouseY < height - height / 25 && mouseY > 3 * height / 4 - height / 25) {

      if (textState === 'Writing' && fullLineShown === false) {
        textState = 'AtOnce';
      }
      else {  //else line is completely shown
        fullLineShown = false;
        textState = 'Writing';
        currLine++;
        charTyped = 0;
        if (currLine === dialogues[0][3].length) {
          set[currentSet][currentSubSet][1] = true;
          dialogues.shift();
          currLine = 0;
        }
      }

    }
  }
}
