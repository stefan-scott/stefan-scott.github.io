let input, button 

function setup() {
  createCanvas(400, 400);
	input = createInput();
	input.position(20,65);
	
	button = createButton("Submit");
	button.position(20, 100);
	button.mousePressed(greeting);
	
	textSize(50);
}

function greeting(){
	let name = input.value();
	for (let i = 0;	i < 200 ; i ++){
		fill(random(255), 255, 255);
		text(name, random(width), random(height));
	}
	
}




