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
        this.actionTimer = 60;
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
      if(this.actionTimer !== 0) {
        this.actionTimer--;
      }
      else {
        this.actionTimer = 120;
        this.state = `wait`;
      }
    }
  
    waiting() {
      if(this.actionTimer !== 0) {
        this.actionTimer--;
      }
      else {
        //if fox it not pet on time, it burrows away
        this.actionTimer = 50;
        this.state = `burrow`;
      }  
    }
  
    petting() {
      if(this.actionTimer !== 0) {
        this.actionTimer--;
      }
      else {
        this.actionTimer = 50;
        this.state = `burrow`;
      }  
    }
  
    burrowing() {
      if(this.actionTimer !== 0) {
        foxIsBurrowing(this);
        this.actionTimer--;
      }
      else {
        //fox leaves in burrow
        deleteFox(this.id);
      }  
    }
  }

  let bgColor = {
    R: 0,
    G: 0,
    B: 0
  };

  let food1 = {
    name: `food1`,
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    mouseHover: false,
    isDragged: false,
    cdTime: 20
  }

  let food2 = {
    name: `food2`,
    x: undefined,
    y: undefined,
    size: 50,
    cooldown: false,
    mouseHover: false,
    isDragged: false,
    cdTime: 20
  }

  let feast = {
    name: `feast`,
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
  let foods = [food1, food2, feast]; //create array of foods
  let foxSpeed = 1.5;

  let foxID = 0; //assign a number to foxes for identification
  let spawnCounter = 50; //cooldown until another fox is spawned
  let activeFoxes = 0; //number of foxes on screen
  let maxFoxes = 4; // max number of foxes that can spawn

  let score = 0; //total score
  let lives = 10; //foxes being sad makes it decrease, too many sad foxes and you lose!

  let difficulty1 = 35; //different difficulty scale
  let difficulty2 = 60;
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
    happyImg = loadImage("assets/images/happy.png");
    sadImg = loadImage("assets/images/sad.png");
  }
  
  function setup() {
    createCanvas(975,800);

    setupBurrows();
    resetFood(food1);
    resetFood(food2);
    resetFood(feast);
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

  function foxIsBurrowing(fox) {
    let inBurrow = false;

    for(let burrow of burrows) {
      let d = dist(fox.x, fox.y, burrow.x, burrow.y);

      //check if fox is already next to a burrow
      if(d < fox.size / 2) {
        fox.x = burrow.x;
        fox.y = burrow.y;
        inBurrow = true;
      }
    }

    //if no burrows are nearby, create a new one at fox position
    if(inBurrow === false) {
      let newBurrow = new Burrow(fox.x, fox.y);
      burrows.push(newBurrow);
    }
  }

  function resetFood(food) {
    switch(food.name) {
      case `food1`:
        food1.x = width/2-100;
        food1.y = height-70;
        break;
      case `food2`:
        food2.x = width/2;
        food2.y = height-70;
        break;
      case `feast`:
        feast.x = width/2+100;
        feast.y = height-70;
        break;
    }
    food.isDragged = false;
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
    checkDistanceFoxFood();
    checkFoodMovement();
    for(let food of foods) {
      checkDragging(food);
    }
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
    for(let fox of foxes) {
      switch(fox.state) {
        case `peek`: fox.peeking();
          break;
        case `walk`: fox.walking();
          break;
        case `eat`: fox.eating();
          break;
        case `wait`: fox.waiting();
          break;
        case `pet`: fox.petting();
          break;
        case `burrow`: fox.burrowing();
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

  function checkFoodMovement() {
    for(let food of foods) {
      if(mouseIsInside(food)) {
        food.mouseHover = true;
        print(`hovering ${food.name}`);
      }
      else food.mouseHover = false;
    }
  }

  function mouseIsInside(food) {
  let d = dist(mouseX, mouseY, food.x, food.y);
  if (d < food.size / 2) return true;
  else return false;
  }

  function checkMousePressed(food) {
    if(!food.cooldown && food.mouseHover) {
      food.isDragged = true;
      checkDragging(food);
    }
  }

  function checkDragging(food) {
    if(food.isDragged) {
      food.x = mouseX;
      food.y = mouseY;
  
      food.x = constrain(food.x, 0, width);
      food.y = constrain(food.y, 0, height);
    }
  }

  function checkMouseReleased(food) {
    if(food.isDragged) {
      resetFood(food);
    }
  }

  function checkDistanceFoxFood() {
    for(let food of foods) {
      for(let fox of foxes) {
        let d = dist(fox.x, fox.y, food.x, food.y);

        if (d < fox.size / 2 && fox.state === `walk`) {
          fox.state = `eat`;
          resetFood(food);

          //increase score more if feast
          if(food.name === `feast`) score += 3;
          else score++;

          print(`fox ${fox.id} eating ${food.name}`);
        }
      }
    }
  }

  function checkFoxBeingPet(fox) {
    let d = dist(mouseX, mouseY, fox.x, fox.y);

    if(d < fox.size / 2 && fox.state === `wait`) {
      fox.state = `pet`;
      score++;
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
    for(let fox of foxes) {
      switch(fox.state) {
        case `peek`:
          if(fox.goLeft) {
            image(foxPeekL, fox.x, fox.y);
          }
          else {
            image(foxPeekR, fox.x, fox.y);
          }
          break;
        case `walk`: 
          if(fox.goLeft) {
            image(foxWalkL, fox.x, fox.y);
          }
          else {
            image(foxWalkR, fox.x, fox.y);
          }
          break;
        case `eat`: 
          if(fox.goLeft) {
            image(foxEatL, fox.x, fox.y);
          }
          else {
            image(foxEatR, fox.x, fox.y);
          }
          break;
        case `wait`: 
          if(fox.goLeft) {
            image(foxWaitL, fox.x, fox.y);
          }
          else {
            image(foxWaitR, fox.x, fox.y);
          }
          break;
        case `pet`: 
          if(fox.goLeft) {
            image(foxPetL, fox.x, fox.y);
          }
          else {
            image(foxPetR, fox.x, fox.y);
          }
          break;
        case `burrow`: 
          if(fox.goLeft) {
            image(foxBurrowL, fox.x, fox.y);
          }
          else {
            image(foxBurrowR, fox.x, fox.y);
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

    fill(200);
    textSize(32);
    text(`Final score: ${score}`, width/2, (height*2)/3);
    text(`Press ENTER to try again!`, width/2, (height*2)/3+38);
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

  function mousePressed() {
    for(let food of foods) {
      checkMousePressed(food);
    }

    for(let fox of foxes) {
      checkFoxBeingPet(fox);
    }
  }

  function mouseReleased() {
    for(let food of foods) {
      checkMouseReleased(food);
    }
  }
