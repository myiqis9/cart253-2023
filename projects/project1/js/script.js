/**
 * Project 1: Simulation
 * Viviana Ema Radu
 */

"use strict";

class Fox {
  constructor(x, y, state, goLeft, speed) {
    this.x = x;
    this.y = y;
    this.state = state; //peek, walk, eat, wait, pet, burrow
    this.goLeft = goLeft; //direction fox is going
    this.speed = speed; //speed of the fox
    this.petTimer = 30;
    this.size = 100;
  }
}

class Burrow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.canSpawn = false; //is spawning fox
    this.size = 150;
  }
}

  let bgColor = {
    R: 0,
    G: 0,
    B: 0
  };

  let food1 = {
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    cdTime: 20
  }

  let food2 = {
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    cdTime: 20
  }

  let feast = {
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    cdTime: 40
  }
  
  //tutorials & game manager
  let game = `title`; //game manager
  let tutorial1 = true; //is tutorial showing?
  let tutorial2 = true;

  let foxes = []; //create array of foxes
  let burrows = []; //create array of burrows
  let foxSpeed = 5;

  let score = 0; //total score
  let lives = 10; //foxes being sad makes it decrease, too many sad foxes and you lose!

  //images for everything
  let foxPeek;
  let foxWalk;
  let foxWait;
  let foxPet;
  let foxBurrow;
  let burrowImg;
  let food1Img;
  let food2Img;
  let feastImg;
  let heart;
  let sad;

  function preload() {
    //load images
    //foxPeek = loadImage("");
  }
  
  function setup() {
    createCanvas(950,750);

    setupBurrows();
  }
  
  function setupBurrows() {
    //spawn burrows at the start of the game
  }
  
  function draw() {
    background(bgColor.R, bgColor.G, bgColor.B);

    switch(game) {
      case `title`:
        title();
        break;
      case `simulation`:
        simulation();
        break;
      case `gameOver`:
        gameOver();
        break;
    }
  }
  
  function title() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`FOX COLLECTOR!!`,width/2,height/2);

    fill(200,100,100);
    textSize(32);
    text(`Feed the foxes and raise a happy fox family!`, width/2, (height*2)/3);
    text(`Press ENTER to start.`, width/2, (height*2)/3+38);
    pop();
  }
  
  function simulation() {
    //simulation functions go here
    
    display();
  }

  
  function display() {
    //display everything in simulation
    imageMode(CENTER);
    rectMode(CENTER);
  }

  function gameOver() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`GAME OVER!`,width/2,height/2);
    pop();
  }

  function keyPressed() {
    if(game === `title`) {
      if (keyCode === ENTER) {
        bgColor.R = 0;
        bgColor.G = 0;
        bgColor.B = 0;
        game = `simulation`;
      }
    } else if(game === `gameOver`) {
      if (keyCode === ENTER) {
        location.reload()
      }
    }
  }



