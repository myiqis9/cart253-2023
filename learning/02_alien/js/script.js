/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(840,640);
    background(200,50,80);

    rectMode(CENTER);

    //head
    strokeWeight(5);
    stroke(255, 0, 0, 40);
    fill(31, 31, 65);
    arc(420, 250, 260, 400, 40, 26, OPEN);

    //fill inside body color 1
    strokeWeight(0);
    arc(542, 490, 460, 400, 70, 11, OPEN);
    arc(50, 490, 1050, 400, 100, 140, OPEN);
    arc(740, 450, 400, 460, 0, 160, OPEN);
    arc(20, 540, 400, 210, 0, 80, OPEN);

    //beziers external color 1
    noFill();
    strokeWeight(62);
    stroke(31, 31, 65);
    bezier(327, 210, 120, 880, 0, 120, -90, 550);
    bezier(514, 210, 700, 850, 900, 150, 900, 700);

    //fill inside body color 2
    fill(0, 0, 0);
    strokeWeight(0);
    ellipse(420, 400, 200, 500);
    /* push();
    rotate(-3); 
    ellipse(0, -100, 100, 200);
    pop(); */
    arc(200, 620, 400, 95, 0, 80, OPEN);
    arc(250, 550, 250, 400, 200, 140, OPEN);
    arc(740, 528, 250, 560, 0, 160, OPEN);
    arc(562, 500, 290, 450, 70, 10, OPEN);

    //beziers color 2
    noFill();
    strokeWeight(42);
    stroke(0, 0, 0);
    bezier(340, 420, 180, 880, 0, 180, -20, 950);
    bezier(500, 400, 620, 850, 800, 190, 920, 800);

    //eyes
    fill(200,50,80);
    strokeWeight(0);
    ellipse(420, 200, 90);
    ellipse(370, 260, 60);
    ellipse(450, 310, 120);
    ellipse(474, 235, 30);
    ellipse(365, 375, 85);
    ellipse(500, 375, 25);
    ellipse(500, 425, 40);
    ellipse(420, 485, 150);
    ellipse(465, 395, 45);
    ellipse(320, 485, 35);
    ellipse(335, 455, 15);
    ellipse(500, 455, 15);
    ellipse(530, 540, 75);
    ellipse(520, 480, 30);
    ellipse(320, 560, 90);
    ellipse(390, 585, 45);Í

    //eyeballs
    fill(31, 31, 65);
    ellipse(420, 200, 15, 45);
    ellipse(370, 260, 10, 30);
    ellipse(450, 310, 20, 65);
    ellipse(365, 375, 15, 45);
    ellipse(500, 425, 5, 15);
    ellipse(474, 235, 5, 12);
    ellipse(500, 375, 3, 10);
    ellipse(420, 485, 22, 75);
    ellipse(465, 395, 7, 20);
}


/**
 * Description of draw()
*/
function draw() {

}