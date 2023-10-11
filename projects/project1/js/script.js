/**
 * Project 1: Simulation
 * Viviana Ema Radu
 */

"use strict";

  class Burrow {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.canSpawn = false; //is spawning fox
      this.size = 150;
    }
  }

  class Fox {
    constructor(id, x, y, goLeft, speed) {
      this.id = id;
      this.x = x;
      this.y = y;
      this.state = `peek`; //peek, walk, eat, wait, pet, burrow
      this.goLeft = goLeft; //direction fox is going
      this.speed = speed; //speed of the fox
      this.actionTimer = 40;
      this.waitTimer = 40;
      this.size = 100;
    }
  
    peeking() {
      if(this.actionTimer !== 0) {
        this.actionTimer--;
      }
      else {
        this.actionTimer = 40;
        this.state = `walk`;
      }
    }
  
    walking() {
      if(this.goLeft == true) {
        this.x = this.x - this.speed;
        if(this.x <= 25) {
          //fox out of bounds, lose health
          lives--;
          deleteFox(this.id);
        }
      }
      else {
        this.x = this.x + this.speed;
        if(this.x >= (width-25)) {
          //fox out of bounds, lose health
          lives--;
          deleteFox(this.id);
        }
      }
    }
  
    eating() {
  
    }
  
    waiting() {
  
    }
  
    petting() {
  
    }
  
    burrowing() {
  
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
    mouseHover: false,
    isDragged: false,
    cdTime: 20
  }

  let food2 = {
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    mouseHover: false,
    isDragged: false,
    cdTime: 20
  }

  let feast = {
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    mouseHover: false,
    isDragged: false,
    cdTime: 40
  }
  
  //tutorials & game manager
  let game = `title`; //game manager
  let tutorial1 = true; //is tutorial showing?
  let tutorial2 = true;

  let foxes = []; //create array of foxes
  let burrows = []; //create array of burrows
  let foxSpeed = 1.5;

  let foxID = 0; //assign a number to foxes for identification
  let spawnCounter = 50; //cooldown until another fox is spawned
  let activeFoxes = 0; //number of foxes on screen
  let maxFoxes = 4; // max number of foxes that can spawn

  let score = 0; //total score
  let lives = 10; //foxes being sad makes it decrease, too many sad foxes and you lose!

  let difficulty1 = 25; //different difficulty scale
  let difficulty2 = 50;
  let difficulty3 = 100;

  //images for everything
  let foxPeekL;
  let foxPeekR;
  let foxWalkL;
  let foxWalkR;
  let foxEatL;
  let foxEatR;
  let foxWaitL;
  let foxWaitR;
  let foxPetL;
  let foxPetR;
  let foxBurrowL;
  let foxBurrowR;
  let burrowImg;
  let foodImg;
  let feastImg;
  let happyImg;
  let sadImg;

  function preload() {
    //load images
    burrowImg = loadImage("assets/images/burrow.png");
    foxPeekL = loadImage("assets/images/fpeekL.png");
    foxPeekR = loadImage("assets/images/fpeekR.png");
    foxWalkL = loadImage("assets/images/fwalkL.png");
    foxWalkR = loadImage("assets/images/fwalkR.png");
    foxEatL = loadImage("assets/images/featL.png");
    foxEatR = loadImage("assets/images/featR.png");
    foxWaitL = loadImage("assets/images/fwaitL.png");
    foxWaitR = loadImage("assets/images/fwaitR.png");
    foxPetL = loadImage("assets/images/fpetL.png");
    foxPetR = loadImage("assets/images/fpetR.png");
    foxBurrowL = loadImage("assets/images/fburrowL.png");
    foxBurrowR = loadImage("assets/images/fburrowR.png");
    foodImg = loadImage("assets/images/food.png");
    feastImg = loadImage("assets/images/feast.png");
  }
  
  function setup() {
    createCanvas(975,800);

    setupBurrows();
    resetFood1();
    resetFood2();
    resetFeast();
  }
  
  function setupBurrows() {
    //spawn burrows on each lane at the start of the game
    let burrow1 = new Burrow(random(50, width-50), (height/2)-350);
    let burrow2 = new Burrow(random(50, width-50), (height/2)-250);
    let burrow3 = new Burrow(random(50, width-50), (height/2)-150);
    let burrow4 = new Burrow(random(50, width-50), (height/2)-50);
    let burrow5 = new Burrow(random(50, width-50), (height/2)+50);
    let burrow6 = new Burrow(random(50, width-50), (height/2)+150);
    let burrow7 = new Burrow(random(50, width-50), (height/2)+250);

    burrows.push(burrow1, burrow2, burrow3, burrow4, burrow5, burrow6, burrow7);
  }

  function resetFood1() {
    food1.x = width/2-100;
    food1.y = height-70;
  }

  function resetFood2() {
    food2.x = width/2;
    food2.y = height-70;
  }

  function resetFeast() {
    feast.x = width/2+100;
    feast.y = height-70;
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
    fill(255);
    textAlign(CENTER,CENTER);
    text(`FOX COLLECTOR!!`,width/2,height/2);

    fill(200);
    textSize(32);
    text(`Feed the foxes and raise a happy fox family!`, width/2, (height*2)/3);
    text(`Press ENTER to start.`, width/2, (height*2)/3+38);
    pop();
  }
  
  function simulation() {
    //simulation functions go here
    checkSpawnTime();
    checkFoxBehavior();
    checkDifficulty();
    checkLives();
    display();
  }

  function checkSpawnTime() {
    if(spawnCounter === 0) {
      //if there isn't the max amount of foxes on screen, spawn a new one
      if(activeFoxes !== maxFoxes) {
        spawnFox();
      }

      //the more the game goes on the faster they spawn
      if(score >= difficulty3) {
        spawnCounter = 20;
      }
      else if(score >= difficulty2) {
        spawnCounter = 30;
      }
      else if(score >= difficulty1) {
        spawnCounter = 40;
      }
      else {
        spawnCounter = 50;
      }
    }
    else {
      spawnCounter--;
    }
  }

  function spawnFox() {
    let spawn = floor(random(burrows.length));

    //check if burrow is on an edge of the map, so the fox doesn't immediately go in a direction that goes oob
    let direction;
    if(burrows[spawn].x >= width-200) {
      direction = true;
    }
    else if(burrows[spawn].x <= 200) {
      direction = false;
    }
    else {
      direction = floor((random(0,1))+0.5);
    }

    //spawn a new fox
    let newFox = new Fox(foxID, burrows[spawn].x, burrows[spawn].y, direction, foxSpeed);
    foxes.push(newFox);
    activeFoxes++;
    foxID++;
  }

  function deleteFox(del) {
    for(let i = 0; i < foxes.length; i++) {
      if(foxes[i].id === del) {
        foxes.splice(i, 1);
        print(`deleted ${del}`);
        activeFoxes--;
      }
    }
  }

  function checkFoxBehavior() {
    for(let i = 0; i < foxes.length; i++) {
      switch(foxes[i].state) {
        case `peek`: foxes[i].peeking();
          break;
        case `walk`: foxes[i].walking();
          break;
        case `eat`: foxes[i].eating();
          break;
        case `wait`: foxes[i].waiting();
          break;
        case `pet`: foxes[i].petting();
          break;
        case `burrow`: foxes[i].burrowing();
          break;
      }
    }
  }

  function checkDifficulty() {
    //the higher your score is, the more foxes spawn and the faster they go
    if(score >= difficulty3) {
      foxSpeed = 2.2;
      maxFoxes = 6;
    }
    else if(score >= difficulty2) {
      foxSpeed = 1.8;
      maxFoxes = 6;
    }
    else if(score >= difficulty1) {
      foxSpeed = 1.5;
      maxFoxes = 5;
    }
    else {
      foxSpeed = 1.2;
      maxFoxes = 4;
    }
  }

  function checkLives() {
    if(lives <= 0) {
      bgColor.R = 0;
      bgColor.G = 0;
      bgColor.B = 0;
      game = `gameOver`;
    }
  }

  
  function display() {
    imageMode(CENTER);
    rectMode(CENTER);

    //display burrows
    for(let i = 0; i < burrows.length; i++) {
      image(burrowImg, burrows[i].x, burrows[i].y);
    }

    //display food menu
    push();
    fill(0);
    rect(width/2, height-70, 70);
    rect((width/2)-100, height-70, 70);
    rect((width/2)+100, height-70, 70);
    pop();

    //display food
    image(foodImg, food1.x, food1.y);
    image(foodImg, food2.x, food2.y);
    image(feastImg, feast.x, feast.y);

    //TD display reactions

    //display foxes
    for(let i = 0; i < foxes.length; i++) {
      switch(foxes[i].state) {
        case `peek`:
          if(foxes[i].goLeft) {
            image(foxPeekL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxPeekR, foxes[i].x, foxes[i].y);
          }
          break;
        case `walk`: 
          if(foxes[i].goLeft) {
            image(foxWalkL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxWalkR, foxes[i].x, foxes[i].y);
          }
          break;
        case `eat`: 
          if(foxes[i].goLeft) {
            image(foxEatL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxEatR, foxes[i].x, foxes[i].y);
          }
          break;
        case `wait`: 
          if(foxes[i].goLeft) {
            image(foxWaitL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxWaitR, foxes[i].x, foxes[i].y);
          }
          break;
        case `pet`: 
          if(foxes[i].goLeft) {
            image(foxPetL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxPetR, foxes[i].x, foxes[i].y);
          }
          break;
        case `burrow`: 
          if(foxes[i].goLeft) {
            image(foxBurrowL, foxes[i].x, foxes[i].y);
          }
          else {
            image(foxBurrowR, foxes[i].x, foxes[i].y);
          }
          break;
      }
    }
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
    if(keyCode === ENTER) {
      if(game === `title`) {
        bgColor.R = 88;
        bgColor.G = 210;
        bgColor.B = 88;
        game = `simulation`;
      } 
      else if(game === `gameOver`) {
        location.reload()
      }
    }
  }



