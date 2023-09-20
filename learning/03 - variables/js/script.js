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
let cloud3X = 430;
let cloud4X = 510;
let cloudtimer = 40;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(500,500);
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
        cloudtimer = 40;
    }

    //sun :)
    fill(255,255,50);
    strokeWeight(8);
    stroke(255, 150, 50);
    circle(460, 10, 160);

    //draw clouds
    fill(225, 235, 250);
    strokeWeight(0);

    //layer 1
    ellipse(cloud1X, 80, 150, 140);
    ellipse(cloud2X, 90, 80, 70);

    fill(153, 204, 255);
    rect(200, 130, 500, 60);

    //layer 2
    fill(225, 235, 250);
    ellipse(cloud3X, 115, 120, 110);
    ellipse(cloud4X, 130, 60, 60);

    fill(153, 204, 255);
    rect(200, 160, 700, 60);

    //water background
    rectMode(CENTER);
    ellipseMode(CENTER);
    
    fill(11, 66, 149);
    strokeWeight(8);
    stroke(51, 153, 255);
    rect(width / 2, 380, 700, 450);
    
    //waves
    strokeWeight(9);
    //row 1
    bezier(140, 200, 140, 210 + (mouseY/9), 250, 210 + (mouseY/9), 250, 200);
    bezier(140, 200, 140, 180 - (mouseY/9), 250, 180 - (mouseY/9), 250, 200);
    bezier(350, 200, 350, 210 + (mouseY/9), 250, 210 + (mouseY/9), 250, 200);
    
    //row 2
    bezier(100, 310, 100, 300 - (mouseY/9), 0, 300 - (mouseY/9), 0, 310);
    bezier(100, 310, 100, 310 + (mouseY/9), 200, 310 + (mouseY/9), 210, 310);
    bezier(320, 310, 310, 300 - (mouseY/9), 210, 300 - (mouseY/9), 210, 310);
    bezier(430, 310, 430, 310 + (mouseY/9), 320, 310 + (mouseY/9), 320, 310);
    bezier(540, 310, 540, 300 - (mouseY/9), 440, 300 - (mouseY/9), 430, 310);
    
    //row 3
    
    //row 4
}