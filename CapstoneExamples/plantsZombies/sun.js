function fallSun() {
    for (let s of suns) {
      image(sunImg,s.x,s.y,60,60)
      s.y += 5

      if(s.y > height-100){
        s.y = height
      }
    }
}

function collectSun() {
  for(let s of suns){

    //Check if mouseX is in the range of the width of the image
    if (mouseX >= s.x -30 && mouseX <= s.x+30 ) {

      //Chech if mouseY is in the range of the height of the image
      if (mouseY >= s.y -30 && mouseY <= s.y+30) {
        sunScore += 50
        suns.splice(suns.indexOf(s),1) //Remove the sun from the screen
      }
    }
  }
}