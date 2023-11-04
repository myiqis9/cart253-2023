/**
 * Juggle Garden by Viviana Ema Radu
 */
"use strict";

let paddle; 
let AIpaddle;
let paddles = [];

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
    paddles.push(paddle, AIpaddle);

    ball = new Ball(random(0, width), random(-100, -10), false);
    AIball = new Ball(random(0, width), random(height+10, height+100), true);
    balls.push(ball, AIball);
}



function draw() {
    background(0);

    //move and display both paddles
    for(let paddle of paddles) {
        paddle.move();
        paddle.display();
    }

    //move and display balls
    for(let ball of balls) {
        if(ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            if(ball.reverse) ball.bounce(AIpaddle); 
            else ball.bounce(paddle);
            ball.display();
        }
        else endGame(); //if eiter ball is missed, the game ends
    }

}

function endGame() {
    print("game ended");
}