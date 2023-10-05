/**
 * Love, Actually exercise
 * Viviana Ema Radu
 */

"use strict";

let player = {
    x: undefined,
    y: 250,
    size: 50,
    vx: 0,
    vy: 0
  };
  
  let enemy1 = {
    x: undefined,
    y: undefined,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 3
  };

  let enemy2 = {
    x: undefined,
    y: undefined,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 3
  };

  let enemy3 = {
    x: undefined,
    y: undefined,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 3
  };

  let enemyRGB = {
    R: 200,
    G: 0,
    B: 0
  };

  class Heart {
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.size = 50;
      this.R = 200;
      this.G = 100;
      this.B = 100;
    }
  }
  
  let state = `title`; // game state
  let haters = [enemy1, enemy2, enemy3]; //create array of enemies
  let fans = []; //create array of fans

  let score = 0; //determines which ending you get
  let multiplier = 1; //multiplies score the further you go

  let fanImg;

  function preload() {
    fanImg = loadImage("assets/images/hearts.png");
    //heart icon by Vitaly Gorbachev
  }
  
  function setup() {
    createCanvas(800,800);
    player.x = width / 4;

    setupFans();
    setupHaters();
  }
  
  function setupFans() {
    //create all the fans
    let heart1 = new Heart(0,0);
    let heart2 = new Heart(0,0);
    let heart3 = new Heart(0,0);
    let heart4 = new Heart(0,0);
    let heart5 = new Heart(0,0);
    fans.push(heart1, heart2, heart3, heart4, heart5);

    for(let i = 0; i < fans.length; i++) {
      fans[i].x = random(25, width-25);
      fans[i].y = random(25, height-25);

      for(let j = 0; j < fans.length; j++) {

        let d = dist(fans[i].x, fans[i].y, fans[j].x, fans[j].y);

        //checking if a fan is in a position where another fan already exists
        if (i !== j && d < (fans[i].size/2 + fans[j].size/2)) {
          fans[i].x = random(width);
          fans[i].y = random(height);
          j = 0;
        }
      }
    }
  }

  function setupHaters() {
    enemy1.x = 40;
    enemy1.y = 40;
  }
  
  function draw() {
    background(0);

    switch(state) {
      case `title`: title();
        break;
      case `simulation`: simulation();
        break;
      case `superstar`: superstar();
        break;
      case `influencer`: influencer();
        break;
      case `goodstart`: goodstart();
        break;
      case `tryhard`: tryhard();
        break;
    }
  }
  
  function title() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER,CENTER);
    text(`FAN COLLECTOR!`,width/2,height/2);

    fill(200,100,100);
    textSize(32);
    text(`Collect your fans while avoiding the haters.`, width/2, (height*2)/3);
    text(`Arrow keys to move. Press any key to start.`, width/2, (height*2)/3+38);
    pop();
  }
  
  function simulation() {
    movePlayer();
    moveHaters();
    checkOffscreen();
    checkFanOverlap();
    checkHaterOverlap();
    checkMultiplier();
    display();
  }

  function superstar() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER, CENTER);
    text(`SUPERSTAR!!!`, width/2, height/2);
    pop();
  }
  
  function influencer() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER, CENTER);
    text(`INFLUENCER!`, width/2, height/2);
    pop();
  }

  function goodstart() {
    push();
    textSize(64);
    fill(255,150,150);
    textAlign(CENTER, CENTER);
    text(`GOOD START.`, width/2, height/2);
    pop();
  }
  
  function tryhard() {
    push();
    textSize(64);
    fill(150,150,255);
    textAlign(CENTER, CENTER);
    text(`TRYHARD :(`, width/2, height/2);
    pop();
  }

  function checkEnding() {
    if(score < 10) {
      state = `tryhard`;
    }
    else if(score >= 10 && score < 40) {
      state = `goodstart`;
    }
    else if(score >= 40 && score < 1000) {
      state = `influencer`;
    }
    else if(score >= 1000) {
      state = `superstar`;
    }
  }
  
  function movePlayer() {
    player.x = player.x + player.vx;
    player.y = player.y + player.vy;
  }

  function moveHaters() {

  }
  
  function checkOffscreen() {
    // Check if the player has gone offscreen
    if (isOffscreen(player)) {
      checkEnding();
    }
  }
  
  function isOffscreen(circle) {
    if (circle.x < 0 || circle.x > width || circle.y < 0 || circle.y > height) {
      return true;
    }
    else {
      return false;
    }
  }
  
  function checkFanOverlap() {
    // Check if the player overlaps with any fan
    for(let i = 0; i < fans.length; i++) {
      let d = dist(player.x, player.y, fans[i].x, fans[i].y);
      if(d < player.size/2 + fans[i].size/2) {
        //respawns fan somewhere else and increases score
        score += 1*multiplier;

        fans[i].x = random(25, width-25);
        fans[i].y = random(25, height-25);
  
        for(let j = 0; j < fans.length; j++) {
          let d = dist(fans[i].x, fans[i].y, fans[j].x, fans[j].y);
  
          //checking if a fan is in a position where another fan already exists
          if (i !== j && d < (fans[i].size/2 + fans[j].size/2)) {
            fans[i].x = random(width);
            fans[i].y = random(height);
            j = 0;
          }
        }
      }
    }
  }

  function checkHaterOverlap() {

  }

  function checkMultiplier() {

  }
  
  function display() {
    ellipseMode(CENTER);
    imageMode(CENTER);

    //Display the player
    ellipse(player.x, player.y, player.size);

    //Display fans
    for(let i = 0; i < fans.length; i++) {
      image(fanImg, fans[i].x, fans[i].y);
    }

    //Display haters
    fill(enemyRGB.R, enemyRGB.G, enemyRGB.B);

    for(let i = 0; i < haters.length; i++) {
      ellipse(haters[i].x, haters[i].y, haters[i].size);
    }

    //Display score
  }

  function keyPressed() {
    //press any key to start
    if (state === `title`) {
      state = `simulation`;
    }

    //player movement
    if(state === `simulation`) {
      if (keyCode === LEFT_ARROW) {
        player.vx = -5;
        player.vy = 0;
      } 
      if (keyCode === RIGHT_ARROW) {
        player.vx = 5;
        player.vy = 0;
      } 
      if (keyCode === UP_ARROW) {
        player.vx = 0;
        player.vy = -5;
      } 
      if (keyCode === DOWN_ARROW) {
        player.vx = 0;
        player.vy = 5;
      }

    }
  }

