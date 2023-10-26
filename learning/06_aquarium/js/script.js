"use strict";

//game manager
let game = `title`;

//fish parameters
let school = [];
let fishImg;
let rareFishImg;
let maxFish = 10;
let maxRareFish = 15;
let fishCount = 0;
let speed = 2.5;
let rareSpeed = 4;

//game parameters
let timer;
let counter = 0;
let score = 0;
let goodEnding = false;

//player parameters
let player = {
  image: undefined,
  x: undefined,
  y: undefined
}


function preload() {
    fishImg = loadImage(`assets/images/fish.png`);
    rareFishImg = loadImage(`assets/images/rarefish.png`);
    player.image = loadImage(`assets/images/hook.png`);
}


function setup() {
  createCanvas(750, 750);
  createSchool();
}

function createSchool() {
  //spawn all fish
  for(let i = 0; i < maxFish; i++) {
    school[i] = createFish(random(50, width-50), random(50, height-50), `fish`, 50, speed);
  }

  for(let i = maxFish; i < maxRareFish; i++) {
    school[i] = createFish(random(50, width-50), random(50, height-50), `rare`, 25, rareSpeed);
  }
}


function createFish(x, y, name, size, speed) {
  //create a fish and return it
  let fish = {
    count: fishCount,
    name: name,
    x: x,
    y: y,
    size: size,
    vx: 0,
    vy: 0,
    speed: speed
  };
  print(`created ${fish.name} ${fish.count}`);
  fishCount++;
  return fish;
}


function draw() {
  switch(game) {
    case `title`: title();
    break;
    case `simulation`: simulation();
    break;
    case `ending`: ending();
  }
}

function title() {
  background(20, 20, 80);

  push();
  textSize(52);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`Catch the Fish!`, width/2, height/2-50);

  textSize(28);
  fill(225, 225, 255);
  text(`The water is too dirty! Catch all the fish `, width/2, height/2+75);
  text(`& move them to clean water before it's too late...`, width/2, height/2+125);

  fill(160, 160, 255);
  text(`Click anywhere to start.`, width/2, height/2+175);
  pop();
}

function ending() {

  if(goodEnding){
    background(20, 20, 80);

    push();
    textSize(52);
    fill(255);
    textAlign(CENTER,CENTER);
    text(`You did it!!!`, width/2, height/2-50);

    fill(225, 225, 255);
    textSize(28);
    text(`You managed to save all the fish`, width/2, height/2+75);
    text(`and move them to a clean aquarium safely.`, width/2, height/2+125);

    fill(160, 160, 255);
    text(`Click anywhere to try again!`, width/2, height/2+175);
  }
  else {
    background(20, 40, 50);

    push();
    textSize(52);
    fill(255);
    textAlign(CENTER,CENTER);
    text(`Oh no... :(`, width/2, height/2-50);

    fill(225, 250, 250);
    textSize(28);
    text(`You failed to catch all the fish on time.`, width/2, height/2+75);
    text(`You still managed to save ${score} fish.`, width/2, height/2+125);

    fill(160, 220, 220);
    text(`Click anywhere to try again!`, width/2, height/2+175);
  }

  pop();
}

function startTimer() {
  counter = 15;
  timer = setInterval(function() {
    counter--;
    if(counter === 0) game = `ending`;
  }, 1000);
}

function simulation() {
  background(40, 60, 60);

  movePlayer();
  displayScore();
  displayTimer();

  for(let fish of school) {
    moveFish(fish);
    displayFish(fish);
    checkFishPlayerDistance(fish);
  }
}

function displayScore() {
  push();
  textSize(32);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`Score: ${score}`, 70, 25);
  pop();
}

function displayTimer() {
  push();
  textSize(32);
  fill(255);
  textAlign(CENTER,CENTER);
  text(`Timer: ${counter}`, width-80, 25);
  pop();
}

function movePlayer() {
  player.x = mouseX;
  player.y = mouseY;

  player.x = constrain(player.x, 20, width-20);
  player.y = constrain(player.y, 20, height-20);

  push();
  imageMode(CENTER);
  image(player.image, player.x, player.y);
  pop();
}

function moveFish(fish) {
  //if fish are near player, move away from player
  let d = dist(fish.x, fish.y, player.x, player.y);

  if(d < 150) {
    let dx = fish.x - player.x;
    let dy = fish.y - player.y;

    if(dx < 0) fish.vx = -fish.speed;
    else fish.vx = fish.speed;

    if(dy < 0) fish.vy = -fish.speed;
    else fish.vy = fish.speed;
  }
  else {
    // otherwise, move in random pattern
    let change = random(0, 1);
    if (change < 0.05) {
      fish.vx = random(-fish.speed, fish.speed);
      fish.vy = random(-fish.speed, fish.speed);
    }
  }
  
  fish.x = fish.x + fish.vx;
  fish.y = fish.y + fish.vy;

  // constrain fish to not go oob
  fish.x = constrain(fish.x, 50, width-50);
  fish.y = constrain(fish.y, 50, height-50);
}


// Displays the provided fish on the canvas
function displayFish(fish) {
  imageMode(CENTER);
  if(fish.name === `fish`) image(fishImg, fish.x, fish.y);
  else if(fish.name === `rare`) image(rareFishImg, fish.x, fish.y);
}

function checkFishPlayerDistance(fish) {
  //if player catches fish, fish gets eaten
  let d = dist(fish.x, fish.y, player.x, player.y);
  if(d < fish.size) eatFish(fish);
}

function eatFish(fish) {
  //delete fish from array
  for(let i = 0; i < school.length; i++) {
    if(school[i].count === fish.count) {
      school.splice(i, 1);
      print(`ate ${fish.count}`);
    }
  }
  //increase score
  if(fish.name === `rare`) score += 3;
  else score++;

  //check if game won
  if(score === 200) {
    goodEnding = true;
    game = `ending`;
  }

  //if no more fish are left, respawn a new set of fish
  checkRemainingFish();
}

function checkRemainingFish() {
  if(school.length === 0) {
    //raise speed for more difficulty, and reset fish count for ease of debugging
    speed += 0.4;
    rareSpeed += 0.4;
    fishCount = 0;

    //reset timer
    clearInterval(timer);
    startTimer();

    createSchool();
  }
}

function mousePressed() {
  if(game === `title`) {
    game = `simulation`;
    startTimer();
  }
  else if(game === `ending`) {
    location.reload();
  }
}