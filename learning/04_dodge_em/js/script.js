/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

let enemy = {
    x: 0,
    y: -50,
    size: 100,
    vy: 0,
    speed: 10
  };
  
  let player = {
    x: 250,
    y: 250,
    size: 100,
    speed: 15
  };

  let projectile = {
    x: 0,
    y: 0,
    size: 20,
    speed: 50, 
    fill: {
        r: 210,
        g: 40,
        b: 60
      }
  }

  //background
  let bgWidth = 0;
  let bgColor = 210;
  let direction = true;

  //game
  let playerImg;
  let enemyImg;
  let enemyKilled = false;
  let shootProjectile = false;

  function preload() {
    playerImg = loadImage("assets/images/player.png");
    enemyImg = loadImage("assets/images/alien.png");
  }
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
  
    //random spawn for first enemy
    enemy.x = random(0, height);
    enemy.vy = enemy.speed;
    
    //noCursor();
  }
  
  function draw() {

    background(0);

    bgWidth = 0;
    bgColor = 210;

    //gradient background
    for(let i = 0; i < windowWidth; i++) {

        stroke(bgColor, bgColor, 50);
        line(bgWidth, 0, bgWidth, windowHeight);
        bgWidth = i;

        if(bgColor == 210) {
            direction = false;
        }
        else if(bgColor == 0) {
            direction = true;
        }

        if(direction) {
            bgColor++;
        }
        else {
            bgColor--;
        }

        //print(bgColor);
    }

    //projectile reset
    if(shootProjectile) {
        projectile.x = player.x;
        projectile.y = player.y;
        shootProjectile = false;
    }

    //projectile movement
    projectile.y = projectile.y - projectile.speed;

    //enemy movement
    enemy.y = enemy.y + enemy.vy;
  
    //enemy touching the bottom of the screen lose
    if (enemy.y > height) {
        noLoop();
    }

    //reset enemy if killed
    if(enemyKilled) {
        enemy.x = random(0, height);
        enemy.y = -50;
        projectile.x = -500;
        projectile.y = -500;
        enemyKilled = false;
    }
  
    //player movement
    player.y = windowHeight - 200;
    if (keyIsDown(LEFT_ARROW)) {
        player.x = player.x - player.speed;
    }
    else if (keyIsDown(RIGHT_ARROW)) {
        player.x = player.x + player.speed;
    }
  
    //enemy touches you lose
    let d1 = dist(player.x, player.y, enemy.x, enemy.y);
    if (d1 < enemy.size / 2 + player.size / 2) {
      noLoop();
    }

    //projectile kills enemy
    let d2 = dist(projectile.x, projectile.y, enemy.x, enemy.y);
    if (d2 < enemy.size / 2 + projectile.size / 2) {
        enemyKilled = true;
    }
    
    //draw everything
    imageMode(CENTER);
    ellipseMode(CENTER);

    //enemy
    image(enemyImg, enemy.x, enemy.y);
  
    //player
    image(playerImg, player.x, player.y);

    //projectile fill
    fill(projectile.fill.r, projectile.fill.g, projectile.fill.b)

    //projectile
    ellipse(projectile.x, projectile.y, projectile.size);
    }

    //check for space pressed
    function keyPressed() {
        if(keyCode == 32) {
            shootProjectile = true;
        }
    }