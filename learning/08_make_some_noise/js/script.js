let soundFile, reverb;
function preload() {
  soundFile = loadSound('assets/sounds/satie.mp3');
}

function setup() {
  let cnv = createCanvas(300, 300);
  cnv.mousePressed(playSound);

  reverb = new p5.Reverb();
  soundFile.disconnect(); // so we'll only hear reverb...

  // connect soundFile to reverb, process w/
  // 3 second reverbTime, decayRate of 2%
  reverb.process(soundFile, 3, 2);
}

draw() {
  background(0);
}

function playSound() {
  soundFile.play();
}