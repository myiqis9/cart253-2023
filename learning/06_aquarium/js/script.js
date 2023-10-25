"use strict";

// fish array
let school = [];
let fishImg;


function preload() {
    fishImg = loadImage(`assets/images/fish.gif`);
}

function setup() {
  createCanvas(600, 600);

  // Create four fish, positioned randomly
  for(let i = 0; i < 10; i++) {
    school[i] = createFish(random(0, width), random(0, height));
  }
}

// createFish(x,y)
// Creates a new JavaScript Object describing a fish and returns it
function createFish(x, y) {
  let fish = {
    x: x,
    y: y,
    size: 50,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return fish;
}

// draw()
// Moves and displays our fish
function draw() {
  background(0);

  for(let fish of school) {
    moveFish(fish);
    displayFish(fish);
  }
}

// moveFish(fish)
// Chooses whether the provided fish changes direction and moves it
function moveFish(fish) {
  // Choose whether to change direction
  let change = random(0, 1);
  if (change < 0.05) {
    fish.vx = random(-fish.speed, fish.speed);
    fish.vy = random(-fish.speed, fish.speed);
  }

  // Move the fish
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // Constrain the fish to the canvas
  fish.x = constrain(fish.x, 50, width-50);
  fish.y = constrain(fish.y, 50, height-50);
}

// displayFish(fish)
// Displays the provided fish on the canvas
function displayFish(fish) {
    image(fishImg, fish.x, fish.y);
}