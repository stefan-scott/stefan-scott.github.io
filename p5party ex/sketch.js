let pos = {x: 0, y: 0, s: 100}
let roleCount = {add: 0, remove: 0};
let role;
function preload() {
  // connect to a p5party server
  partyConnect(
    "wss://demoserver.p5party.org",
    "hello_party"
  );
  
  // tell p5.party to sync the pos object
  pos = partyLoadShared("pos", pos);
  
}

function setup() {
  createCanvas(400, 400);
  role = random(['add', 'remove']);
  pos.s = 100;
  if (role === 'add') {
    roleCount.add += 1;
  } else if (role === 'remove') {    
    roleCount.remove += 1;
  }
}

function draw() {
  background(50);
  circle(pos.x, pos.y, pos.s);
}

function mousePressed() {
  if (role === 'add') {
    pos.s += 10;
  } else if (role === 'remove') {
    pos.s -= 1;
  }
  
}