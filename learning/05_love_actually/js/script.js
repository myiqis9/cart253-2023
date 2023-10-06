/**
 * Love, Actually exercise
 * Viviana Ema Radu
 */

"use strict";

let player = {
    x: undefined,
    y: undefined,
    size: 50,
    vx: 0,
    vy: 0
  };
  
  let hater = {
    x: undefined,
    y: undefined,
    size: 80,
    vx: 0,
    vy: 0,
    speed: 2
  };

  let haterRGB = {
    R: 200,
    G: 0,
    B: 0
  };

  class Heart {
    constructor(x,y) {
      this.x = x;
      this.y = y;
      this.size = 40;
    }
  }
  
  let state = `title`; // game state
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
    player.x = width/2;
    player.y = height/2;

    hater.x = 40;
    hater.y = 40;

    setupFans();
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
          fans[i].x = random(width-25);
          fans[i].y = random(height-25);
          print("nope");
          j = 0;
        }
      }
    }
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
    text(`Collect your fans while avoiding the hater.`, width/2, (height*2)/3);
    text(`Arrow keys to move. Press any key to start.`, width/2, (height*2)/3+38);
    pop();
  }
  
  function simulation() {
    movePlayer();
    moveHater();
    checkOffscreen();
    checkFanOverlap();
    checkHaterOverlap();
    checkMultiplier();
    display();
  }

  function superstar() {
    push();
    textSize(64);
    fill(255,51,153);
    textAlign(CENTER, CENTER);
    text(`SUPERSTAR!!!`, width/2, height/2);

    fill(255,204,229);
    textSize(32);
    text(`You're infamous! The whole world knows about you!`, width/2, (height*2)/3);
    text(`Press SPACE to try again?`, width/2, (height*2)/3+38);
    pop();
  }
  
  function influencer() {
    push();
    textSize(64);
    fill(153,51,255);
    textAlign(CENTER, CENTER);
    text(`INFLUENCER!`, width/2, height/2);

    fill(229,204,255);
    textSize(32);
    text(`You're popular! Lots of fans swoon at your feet!`, width/2, (height*2)/3);
    text(`Press SPACE to try again?`, width/2, (height*2)/3+38);
    pop();
  }

  function goodstart() {
    push();
    textSize(64);
    fill(51,153,255);
    textAlign(CENTER, CENTER);
    text(`GOOD START.`, width/2, height/2);
    
    fill(204,229,255);
    textSize(32);
    text(`You got a few fans. You feel special.`, width/2, (height*2)/3);
    text(`Press SPACE to try again?`, width/2, (height*2)/3+38);
    pop();
  }
  
  function tryhard() {
    push();
    textSize(64);
    fill(51,255,153);
    textAlign(CENTER, CENTER);
    text(`TRYHARD :(`, width/2, height/2);

    fill(204,255,229);
    textSize(32);
    text(`Who even are you? That's right. A nobody.`, width/2, (height*2)/3);
    text(`Press SPACE to try again?`, width/2, (height*2)/3+38);
    pop();
  }

  function checkEnding() {
    print("ending");
    if(score < 25) {
      state = `tryhard`;
    }
    else if(score >= 25 && score < 100) {
      state = `goodstart`;
    }
    else if(score >= 100 && score < 1000) {
      state = `influencer`;
    }
    else if(score >= 1000) {
      state = `superstar`;
    }
  }
  
  function movePlayer() {
    player.x += player.vx;
    player.y += player.vy;
  }

  function moveHater() {
    //hater gradually follows player
    let dx = hater.x - player.x;
    let dy = hater.y - player.y;

    if(dx < 0) {
      hater.vx = hater.speed;
    }
    else {
      hater.vx = -hater.speed;
    }

    if(dy < 0) {
      hater.vy = hater.speed;
    }
    else {
      hater.vy = -hater.speed;
    }

    hater.x += hater.vx;
    hater.y += hater.vy;
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
            print("nope");
            j = 0;
          }
        }
      }
    }
  }

  function checkHaterOverlap() {
    let d = dist(player.x, player.y, hater.x, hater.y);
    if(d < player.size/2 + hater.size/2) {
        checkEnding();
    }
  }

  function checkMultiplier() {
    if(score >= 1000) {
      multiplier = floor(random(47,65));
      hater.size = 160;
      hater.speed = 3;
    }
    else if(score >= 100) {
      multiplier = floor(random(12,21));
      hater.size = 140;
      hater.speed = 2.5;
    }
    else if(score >= 25) {
      multiplier = floor(random(2,4));
      hater.size = 110;
      hater.speed = 2.2;
    }
    else {
      multiplier = 1;
      hater.size = 80;
      hater.speed = 2;
    }
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

    //Display hater
    push();
    fill(haterRGB.R, haterRGB.G, haterRGB.B);
    ellipse(hater.x, hater.y, hater.size);
    pop();

    //Display score
    push();
    textSize(32);
    fill(230);
    textAlign(LEFT, CENTER);
    text(`FANS: ${score}`, 10, 30);
    pop();
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

    if(state === `goodstart` || state === `tryhard` || state === `influencer` || state === `superstar`) {
      if(keyCode === 32) {
        location.reload();
      }
    }
  }

