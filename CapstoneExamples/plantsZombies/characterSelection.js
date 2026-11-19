function pickCharacter() {
  if (selectedPlant) {
    image(selectedPlant[0], mouseX, mouseY,100,100);
  }
}

function placeCharacter() {
  // Place plant on grid
  if (selectedPlant && mouseY > 150) {

    // Snap to grid
    let col = floor(mouseX / (width / 10));//Divide the mouseX by the size of the cell to find the column
    let gridX = col * (width / 10) + (width / 20); //Place it in the middle of the cell
    
    let row = floor((mouseY - (height / 8)) / (height / 8));
    let gridY = (row + 1) * (height / 8) + (height / 16);

    

    let occupied = false;

    for (let plant of plants) {
      if (plant.x === gridX && plant.y === gridY - 20) {
        occupied = true;
      }
    }
    if (!occupied) {
    plants.push(new Plants(gridX,gridY - 20,selectedPlant,plantAttack,loadImage("./assets/Pea Shooter/Projectile/pea-projectile.png"))
  );
}
    
   

    selectedPlant = undefined;
  }
}