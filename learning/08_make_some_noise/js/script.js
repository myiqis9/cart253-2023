let soundFile, reverb, noise;
let isPlaying = false;
let room = 1; //this is a stand-in for the different rooms I have in my game

//these are stand ins for the arrows that move you between rooms
let arrows = [];
let arrowLeft, arrowRight;

function preload() {
  soundFile = loadSound('assets/sounds/satie.mp3');
}

function setup() {
  createCanvas(300, 300);
  createArrows();
  createBGM();
}

function createArrows() {
  arrowLeft = new Arrow('left', 30, height/2);
  arrowRight = new Arrow('right', width-30, height/2);
  arrows.push(arrowLeft, arrowRight);
}

function createBGM() {
  reverb = new p5.Reverb();
  noise = new p5.Noise('brown');

  soundFile.disconnect(); // so we'll only hear reverb...

  //connect soundFile to reverb, reverbTime, decayRate
  reverb.process(soundFile, 7, 20);
  setSound(0.2);
}

function draw() {
  background(0);
  printRoom();
  for(let arrow of arrows) {
    arrow.checkDist();
    arrow.display();
  }
}

function checkRoom() {
  let drywet;

  switch(room) {
    case 1: drywet = 0.1;
    break;
    case 2: case 4: drywet = 0.55;
    break;
    case 3: drywet = 1;
    break;
  }
  setSound(drywet);
}

function printRoom() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text(`room ${room}`, width/2, height/2);
  pop();
}

function mousePressed() {
  if(isPlaying == false) playSound();
  for(let arrow of arrows) if(arrow.hover) arrow.move();
}

function playSound() {
  soundFile.play();
  noise.start();
  isPlaying = true;
}

function setSound(drywet) {
  //strength of reverb (this is what will be modified!)
  reverb.amp(1.4-drywet);
  reverb.drywet(drywet);
  noise.amp(0.085-(drywet/10));

  print(drywet);
}