//    TRANSITIONING    \\

//adding a fading transition that can be applied
function fadeOut() {
  //fade into black
  background(backgroundRed, backgroundGreen, backgroundBlue);
  if (backgroundRed > 0) {
    backgroundRed -= 1;
  }
  if (backgroundBlue > 0) {
    backgroundBlue -= 1;
  }
  if (backgroundGreen > 0) {
    backgroundGreen -= 1;
  }
}

function fadeIn(r, g, b) {
  background(backgroundRed, backgroundGreen, backgroundBlue);
  //fade into specfied colour
  if (backgroundRed < r) {
    backgroundRed += 1;
  }
  if (backgroundBlue < b) {
    backgroundBlue += 1;
  }
  if (backgroundGreen < g) {
    backgroundGreen += 1;
  }
  if (backgroundRed === r && backgroundGreen === g && backgroundBlue === b) { //once the colour has been applied, stop. 
    transitionColour = false;
  }
}
