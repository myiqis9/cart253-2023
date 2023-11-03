/**
 * Juggle Garden by Viviana Ema Radu
 */
"use strict";

let paddle; 
let balls = [];
let numBalls = 5;
let gravityForce = 0.02;

function preload() {

}



function setup() {
    createCanvas(700, 500);

    paddle = new Paddle(100, 25);

    for(let i = 0; i < numBalls; i++) {
        let ball = new Ball(random(0, width), random(-100, -10));
        balls.push(ball);
    }
}



function draw() {
    background(0);
    paddle.move();
    paddle.display();

    for(let ball of balls) {
        if(ball.active) {
            ball.gravity(gravityForce);
            ball.move();
            ball.bounce(paddle);
            ball.display();
        }
    }
}