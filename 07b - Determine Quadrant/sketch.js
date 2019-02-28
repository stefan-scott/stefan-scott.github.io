let quadrant = 1;  //1 - upper left  2 - upper right
							 //3 - lower left  4 - lower right
function setup() {
  createCanvas(400, 400);
}

function determineQuadrant(){
	if (mouseX < width /2){ //left side
		if (mouseY < height /2) quadrant = 1;  //top L
		else quadrant = 3;  //bottom L
	}
	else{ //right side
		if (mouseY < height /2) quadrant = 2; //top R
		else quadrant = 4; //bottom R
	}
}



function draw() {
  background(220);
	determineQuadrant();
	print(quadrant);
}