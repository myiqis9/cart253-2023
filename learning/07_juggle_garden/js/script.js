/**
 * Juggle Garden by Viviana Ema Radu
 */
"use strict";

let game = `title`;

let paddle; 
let AIpaddle;

let ball;
let AIball;
let balls = [];

let gravityForce = 0.02;
let AIdifficulty = 2;
let speedLevel;

let canPowerUp = false;
let cooldown = 1;
let powerCount = 0;
let powerTimer;
let coolTimer;

let count = 0;
let setTimer;

function setup() {
    createCanvas(700, 500);

    paddle = new Paddle();
    AIpaddle = new AIPaddle();

    ball = new Ball(random(width/2-75, width/2+75), random(-100, -10), false);
    AIball = new Ball(random(width/2-75, width/2+75), random(height+10, height+100), true);
    balls.push(ball, AIball);
}

function draw() {
    background(0);
    switch(game) {
        case `title`: title();
        break;
        case `simulation`: simulation();
        break;
        case `ending`: endGame();
    }

}

function timer() {
    if(game === `simulation`) count++;
}

function powerupTimer() {
    powerCount--;
    print(`powerup: ${powerCount}`);

    if(powerCount === 0) {
        paddle.nopower();
        clearInterval(powerTimer);
    }
}

function cooldownTimer() {
    cooldown--;
    print(`cooldown: ${cooldown}`);

    if(cooldown === 0) {
        canPowerUp = true;
        clearInterval(coolTimer);
    }
}

function displayPowerup() {
    push();
    textSize(24);
    textAlign(CENTER,CENTER);

    if(canPowerUp) {
        fill(225, 225, 225);
        text(`Click to power up!`, width/2, height/2+50);
    }
    else if(paddle.poweredup) {
        fill(150, 150, 225);
        text(`POWERING UP!`, width/2, height/2+50);
    }
    else if(cooldown > 0) {
        fill(225, 150, 150);
        text(`Powerup on cooldown...`, width/2, height/2+50);
    }
    pop();
}

function title() {
    push();
    textSize(48);
    fill(150, 150, 250);
    textAlign(CENTER,CENTER);
    text(`JUGGLE THE BALL!`, width/2, height/2-50);
  
    textSize(32);
    fill(225, 225, 225);
    text(`Welcome to the juggle competition!`, width/2, height/2+80);
    text(`Click anywhere to start.`, width/2, height/2+120);
    pop();
}

function simulation() {
    //move and display both paddles
    noCursor();
    paddle.move();
    paddle.display();
    AIpaddle.move(AIball);
    AIpaddle.display();

    //timer and difficulty increase the more time goes on, check powerup
    displayTimer();
    checkDifficulty();
    displayPowerup();

    //move and display balls
    for(let ball of balls) {
        if(ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            if(ball.reverse) ball.bounce(AIpaddle); 
            else ball.bounce(paddle);
            ball.display();
        }
        else game = `ending`; //if either ball is missed, the game ends
    }
}

function displayTimer() {
    push();
    textSize(32);
    fill(225, 225, 225);
    textAlign(CENTER,CENTER);
    text(`TIME: ${count}`, width/2, height/2);
    pop();
}

function checkDifficulty() {
    //difficulty for player increases the more time goes on, but it increases for the AI too
    //I can beat the AI in about 40-60 seconds, depending on if I get lucky, without powerups!
    if(count > 35) {
        AIdifficulty = 6;
        AIpaddle.speed = 2.8;
        for(let ball of balls) ball.maxSpeed = 20;
        gravityForce = 0.05;
    }
    else if(count > 25) {
        AIdifficulty = 5;
        AIpaddle.speed = 2.5;
        for(let ball of balls) ball.maxSpeed = 16;
        gravityForce = 0.04;
    }
    else if(count > 15) {
        AIdifficulty = 3;
        AIpaddle.speed = 2.2;
        for(let ball of balls) ball.maxSpeed = 12;
        gravityForce = 0.03;
    }
    else {
        AIdifficulty = 2;
        AIpaddle.speed = 2;
        for(let ball of balls) ball.maxSpeed = 10;
        gravityForce = 0.02;
    }
}

function endGame() {
    //show last movement of the paddles for fun
    cursor();
    paddle.display();
    AIpaddle.display();
    displayTimer();

    //check winner
    let winner;
    let winner2;
    let color = {R: undefined, B: undefined};

    if(!AIball.active) {
        color.B = 255;
        color.R = 100;
        winner = `You won!`;
        winner2 = `You out-juggled your enemy! Hurray!`
    }
    else if(!ball.active) {
        color.R = 255;
        color.B = 100;
        winner = `You lost!`;
        winner2 = `Enemy juggler beat you! Better luck next time.`
    }

    push();
    textSize(48);
    fill(color.R, 100, color.B);
    textAlign(CENTER,CENTER);
    text(winner, width/2, height/2-50);
  
    textSize(32);
    fill(225, 225, 225);
    text(winner2, width/2, height/2+80);
    text(`Click anywhere to restart.`, width/2, height/2+120);
    pop();
}

function mousePressed() {
    if(game === `title`) {
        game = `simulation`;
        setTimer = setInterval(timer, 1000);
        coolTimer = setInterval(cooldownTimer, 1); 
        //game starts powered up because of the mouseclick to start the game, so I set a 1 frame cooldown to fix this...
    }
    if(game === `ending`) location.reload();
    if(game === `simulation` && canPowerUp) paddle.powerup();
}

