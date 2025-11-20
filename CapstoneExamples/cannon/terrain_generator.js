
let terrainHeights = [];

//TERRAIN GENERATING
//setting variables for the terrain 
let terrainUnitWidth = 10; //width of each terrain unit
let interval = 0.01; //the difference in unit heights
function createTerrain() {
  let time = 0;
  for (let x = 0; x < width; x += terrainUnitWidth) {
    let h = noise(time) * height;

    // terrainHeights.push(int(y));
    terrainHeights.push(new TerrainUnit(x, h));
    time += interval;
  }
}

function renderTerrain() {
  for (let u of terrainHeights) { //creating the terrain units on the canvas
    u.display();
  }
}

class TerrainUnit { //creating a class for the terrain so that each individual part can be located and given a hitbox
  constructor(x, h) {
    this.x = x;
    this.y = height;
    this.h = h;
    //hitbox (or just terrain unit info)
    this.top = height - h / 2;
    this.left = this.x - terrainUnitWidth / 2;
    this.right = this.x + terrainUnitWidth / 2;
  }

  display() {
    noStroke();
    //colour is darker than the background
    fill(backgroundRed * 0.5, backgroundGreen * 0.5, backgroundBlue * 0.5);
    rectMode(CENTER);
    rect(this.x, this.y, terrainUnitWidth, this.h);
  }
}

