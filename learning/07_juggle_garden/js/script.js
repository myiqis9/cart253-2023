/**
 * Juggle Garden by Viviana Ema Radu
 */
"use strict";

let paddle; 
let AIpaddle;

let ball;
let AIball;
let balls = [];

let gravityForce = 0.02;
let speedLevel;
let bounces = 0;
let AIbounces = 0;

function preload() {

}



function setup() {
    createCanvas(700, 500);

    paddle = new Paddle(100, 25);
    AIpaddle = new AIPaddle(100, 25);

    ball = new Ball(random(width/2-75, width/2+75), random(-100, -10), false);
    AIball = new Ball(random(width/2-75, width/2+75), random(height+10, height+100), true);
    balls.push(ball, AIball);
}



function draw() {
    background(0);

    //move and display both paddles
    paddle.move();
    paddle.display();
    AIpaddle.move(AIball);
    AIpaddle.display();

    //move and display balls
    for(let ball of balls) {
        if(ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            if(ball.reverse) ball.bounce(AIpaddle); 
            else ball.bounce(paddle);
            ball.display();
        }
        else endGame(); //if either ball is missed, the game ends
    }

}

function endGame() {
    print("game ended");
}