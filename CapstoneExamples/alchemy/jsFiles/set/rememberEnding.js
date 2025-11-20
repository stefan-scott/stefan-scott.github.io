// The file for a special ending (my favourite one :D)
// Does the animation for the memorySpell

let memoryTimer = 1;

function cueMemory() {
    // called after ending text is shown
    boxes();
    screenGlitch();

    // manage timer
    memoryTimer++;
    if (memoryTimer === 30) {
        memoryTimer = 0;
    }
}

function boxes() {
    // draw the 3D boxes
    push();
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    background(0);

    // bottom-left
    push();
    translate(width / 3, -height / 3);
    rotateX(-frameCount * 10);
    rotateZ(-frameCount * 10);
    box(100);
    pop();

    // bottom-right
    push();
    translate(-width / 3, -height / 3);
    rotateX(frameCount * 7);
    rotateZ(frameCount * 7);
    box(200);
    pop();

    // top-left
    push();
    translate(width / 3, height / 3);
    rotateX(frameCount * 15);
    rotateZ(frameCount * 15);
    box(300);
    pop();

    // top-right
    push();
    translate(-width / 3, height / 2.5);
    rotateX(frameCount * 3);
    rotateZ(frameCount * 3);
    box(60);
    pop();

    pop();
}

function screenGlitch() {
    // Add the translucent glitch effect
    push();
    translate(-width, -height);
    tint(255, 90);
    image(glitchGif, width / 2, height / 2, width * 2.5, height * 2.5);
    noTint();
    pop();
}