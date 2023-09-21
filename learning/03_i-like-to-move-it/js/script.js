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

let wave = 0;
let waveDirection = false;

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

        if(wave == 40) {
            waveDirection = true;
        }
        
        if(wave == 0) {
            waveDirection = false;
        }

        if(waveDirection) {
            wave--;
        }
        else {
            wave++;
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
    upY = constrain(upY, 0, 65);
    downY = constrain(downY, 0, 65);

    //assign up and down
    up = layer1 + upY;
    down = layer1 - downY;

    console.log(`layer 1 up: ${up}, layer 1 down: ${down}`);
    
    //waves
    strokeWeight(9);
    //row 1
    bezier(-80+wave, 200, -80+wave, down, 30+wave, down, 30+wave, 200);
    bezier(30+wave, 200, 30+wave, up, 140+wave, up, 140+wave, 200);
    bezier(140+wave, 200, 140+wave, down, 250+wave, down, 250+wave, 200);
    bezier(350+wave, 200, 350+wave, up, 250+wave, up, 250+wave, 200);
    bezier(460+wave, 200, 460+wave, down, 350+wave, down, 350+wave, 200);
    bezier(570+wave, 200, 570+wave, up, 460+wave, up, 460+wave, 200);
    bezier(680+wave, 200, 680+wave, down, 570+wave, down, 570+wave, 200);

    //variable constraints
    up = layer2 + upY;
    down = layer2 - downY;
    console.log(`layer 2 up: ${up}, layer 2 down: ${down}`);
    
    
    //row 2
    bezier(-20-wave, 310, -20-wave, down, 90-wave, down, 90-wave, 310);
    bezier(90-wave, 310, 90-wave, up, 200-wave, up, 200-wave, 310);
    bezier(310-wave, 310, 310-wave, down, 200-wave, down, 200-wave, 310);
    bezier(430-wave, 310, 430-wave, up, 310-wave, up, 310-wave, 310);
    bezier(540-wave, 310, 540-wave, down, 430-wave, down, 430-wave, 310);
    bezier(650-wave, 310, 650-wave, up, 540-wave, up, 540-wave, 310);

    //variable constraints
    up = layer3 + upY;
    down = layer3 - downY;
    
    //row 3
    bezier(30+wave, 430, 30+wave, up, -90+wave, up, -90+wave, 430);
    bezier(150+wave, 430, 150+wave, down, 30+wave, down, 30+wave, 430);
    bezier(260+wave, 430, 260+wave, up, 150+wave, up, 150+wave, 430);
    bezier(380+wave, 430, 380+wave, down, 260+wave, down, 260+wave, 430);
    bezier(490+wave, 430, 490+wave, up, 380+wave, up, 380+wave, 430);
    bezier(610+wave, 430, 610+wave, down, 490+wave, down, 490+wave, 430);

    let fishColor = map(mouseY, 0, width, 100, 200);

    //fish!
    strokeWeight(0);
    fill(255,fishColor,fishColor);
    ellipse(mouseX, mouseY, 60, 30);
    triangle(mouseX-10, mouseY-10, mouseX+20, mouseY, mouseX+10, mouseY-30);
    triangle(mouseX+20, mouseY, mouseX+50, mouseY-18, mouseX+50, mouseY+18);
    fill(0,0,0);
    ellipse(mouseX-16, mouseY-5, 6, 4);
}