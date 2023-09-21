/**
 * Title of Project
 * Author Name
 * 
 * This is a template. You must fill in the title, author, 
 * and this description to match your project!
 */

"use strict";

//declaring variables
let cloud1X = 180;
let cloud2X = 280;
let cloud3X = 520;
let cloud4X = 600;
let cloudtimer = 40;

let layer1 = 200;
let layer2 = 310;
let layer3 = 420;

let up = 0.0;
let down = 0.0;
let upY = 0;
let downY = 0;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(600,500);
}


/**
 * Description of draw()
*/
function draw() {
    background(153, 204, 255);

    //clouds move every second
    cloudtimer--;
    if(cloudtimer == 0) {
        cloud1X--;
        cloud2X--;        
        cloud3X--;
        cloud4X--;

        if(cloud2X == -45) {
            cloud1X = 680;
            cloud2X = 780;
        }

        if(cloud4X == -45) {
            cloud3X = 680;
            cloud4X = 760;
        }

        cloudtimer = 25;
    }

    //sun :)
    fill(255,255,50);
    strokeWeight(8);
    stroke(255, 150, 50);
    circle(470, 10, 160);

    //draw clouds
    fill(225, 235, 250);
    strokeWeight(0);

    //layer 1
    ellipse(cloud1X, 80, 150, 140);
    ellipse(cloud2X, 90, 80, 70);

    fill(153, 204, 255);
    rect(300, 130, 700, 60);

    //layer 2
    fill(225, 235, 250);
    ellipse(cloud3X, 115, 120, 110);
    ellipse(cloud4X, 130, 60, 60);

    fill(153, 204, 255);
    rect(300, 160, 700, 60);

    //water background
    rectMode(CENTER);
    ellipseMode(CENTER);
    
    fill(11, 66, 149);
    strokeWeight(8);
    stroke(51, 160, 255);
    rect(width / 2, 380, 700, 450);

    //variable constraints
    upY = map(mouseY, windowHeight, 0, 0, 65);
    downY = map(mouseY, windowHeight, 0, 0, 65);

    //assign up and down
    up = layer1 + upY;
    down = layer1 - downY;

    console.log(`layer 1 up: ${up}, layer 1 down: ${down}`);
    
    //waves
    strokeWeight(9);
    //row 1
    bezier(-80, 200, -80, down, 30, down, 30, 200);
    bezier(30, 200, 30, up, 140, up, 140, 200);
    bezier(140, 200, 140, down, 250, down, 250, 200);
    bezier(350, 200, 350, up, 250, up, 250, 200);
    bezier(460, 200, 460, down, 350, down, 350, 200);
    bezier(570, 200, 570, up, 460, up, 460, 200);
    bezier(680, 200, 680, down, 570, down, 570, 200);

    //variable constraints
    up = layer2 + upY;
    down = layer2 - downY;
    console.log(`layer 2 up: ${up}, layer 2 down: ${down}`);
    
    
    //row 2
    bezier(-20, 310, -20, down, 90, down, 90, 310);
    bezier(90, 310, 90, up, 200, up, 200, 310);
    bezier(310, 310, 310, down, 200, down, 200, 310);
    bezier(430, 310, 430, up, 310, up, 310, 310);
    bezier(540, 310, 540, down, 430, down, 430, 310);
    bezier(650, 310, 650, up, 540, up, 540, 310);

    //variable constraints
    up = layer3 + upY;
    down = layer3 - downY;
    
    //row 3
    bezier(30, 430, 30, up, -90, up, -90, 430);
    bezier(150, 430, 150, down, 30, down, 30, 430);
    bezier(260, 430, 260, up, 150, up, 150, 430);
    bezier(380, 430, 380, down, 260, down, 260, 430);
    bezier(490, 430, 490, up, 380, up, 380, 430);
    bezier(610, 430, 610, down, 490, down, 490, 430);

}