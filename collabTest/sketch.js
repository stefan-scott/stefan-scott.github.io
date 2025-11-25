// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let serverConnected = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //partyConnect("wss://demoserver.p5party.org", "hello_party", connectionEstablished);
  partyConnect("wss://d39c3875-0df9-444e-a73c-a5f4e32ba2a8-00-16rnhs8trvdyw.kirk.replit.dev/deepstream", "cs30", connectionEstablished);
}

function connectionEstablished(){
  //use as callback for successful connection
  serverConnected = true;
}

function draw() {
    background(220);
  if(serverConnected){


  }
  else{
    text("Connecting to Server", width/2, height/2);
  }
}
