/**
 * Project 2
 * Viviana Ema Radu
 * 
 * Quick rundown of code workings:
 * - 
 */
"use strict";

let start; //setup class
let manager = `title`; //game manager
let activeScene; //active scene
let heldItem = null; //item being dragged
let soundFile, reverb, noise; //bgm

let canClick = true; //can player interact with things
let timeout; //settimeout

let inventory = []; //player inventory
let inventorySize = 5;
let activeItem = null; //held item if player is currently holding one

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-11 are zoom-ins - see Start.js
let sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12; //all scenes
let safe, hand; //unique puzzles - see Start.js


let locks = []; //array of safe numbers - combination: 3179
let buttons = []; //array of the buttons on the radio
let keyslots = []; //array of key slots on the door - blue, yellow, red, green
let arrows = []; //array of arrows: 0 left, 1 right, 2 down

//loading images
let images = {};
let imgNames = [`iredkey`, `ibluekey`, `igoldkey`, `ipaper`, `iknife`, 
    `igreencube`, `iredcube`, `ibluecube`, `iyellowcube`, `iemptycube`, //items
    `door1`, `cupboard1`, `painting1`, `painting2`, //room 1
    `statue1`, `statue2`, `greencube`, `taxidermy`, `paper`, //room 2
    `deertaxidermy`, //room 3
    `safe`, //room 4
    `door2`, `redin`, `bluein`, `yellowin`, `greenin`, //zoom door
    `cupboard2`, `goldchest1`, `goldchest2`, `knife`, //zoom cupboard
    `statue3`, `placedhand`, //zoom statue
    `deer`, `deermouth`, `emptycube`, //zoom deer
    //zoom radio
    //zoom window
    //zoom safe
    `arrowDown`, `arrowLeft`, `arrowRight`]; //arrows


function preload() {
    //preload all images
    for(let img of imgNames) {
        images[img] = loadImage(`assets/images/${img}.png`);
        //thanks to Pippin for helping me with this!
    }
    soundFile = loadSound('assets/sounds/satie.mp3');
}


function setup() {
    createCanvas(600, 600);
    start = new Start();
    start.setupArrows();
    start.createPuzzles();
    start.createLocks();
    start.createInventory();
    start.createScenes();
    start.createBGM();
}


function draw() {
    background(0);
    switch(manager) {
        case `title`: title();
        break;
        case `opening`: opening();
        break;
        case `game`: game();
        break;
        case `ending`: ending();
    }
}

function title() {
    //insert title here
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(`insert title here`, width/2, height/2);
    pop();
}

function opening() {
    //might have an opening animation? setting? tutorial? 
    //you wake up in a strange room and it's dark...
    //shadow passes through the window, suddenly lights flicker open?
}

function game() {
    if(activeItem !== null) activeItem.checkInteraction();
    checkHover();
    checkDragging();
    displayGame();
}

function checkDragging() {
    if(activeItem !== null) {
      activeItem.x = mouseX;
      activeItem.y = mouseY;
  
      activeItem.x = constrain(activeItem.x, 0, width);
      activeItem.y = constrain(activeItem.y, 0, height);
    }
}

function checkHover() {
    for(let slot of inventory) {
      slot.mouseHover = mouseIsInside(slot) ? true : false;
    }

    for(let puzzle of activeScene.puzzleArray) {
        if(puzzle.shape === 'round') puzzle.mouseHover = mouseIsInside(puzzle) ? true : false;
        else if(puzzle.shape === 'rect') puzzle.mouseHover = mouseIsInsideRect(puzzle) ? true : false;
    }

    for(let arrow of arrows) {
        arrow.mouseHover = mouseIsInside(arrow) ? true : false;
    }
}

function mouseIsInside(obj) {
    let d = dist(mouseX, mouseY, obj.x, obj.y);
    if (d < obj.size / 2) return true;
    else return false;
}

function mouseIsInsideRect(obj) {
    if(mouseX > obj.x - obj.width/2 && mouseX < obj.x + obj.width/2
    && mouseY > obj.y - obj.height/2 && mouseY < obj.y + obj.height/2) return true;
    else return false;
}

function displayGame() {
    rectMode(CENTER);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);

    //display active scene and interactables
    activeScene.display();

    //display arrows
    for(let arrow of arrows) if(arrow.active) arrow.display();

    //inventory background
    displayInventoryMenu();

    //display inventory & player items (separately, otherwise items won't print on top of other slots when dragged1)
    for(let slot of inventory) slot.display();
    for(let slot of inventory) if(slot.hasItem) slot.item.display();
}

function displayInventoryMenu() {
    push();
    fill(255);
    noStroke();
    rect(width/2, height-40, 600, 96);
    fill(0);
    stroke(70, 20, 15);
    strokeWeight(2);
    rect(width/2, height-44, 390, 86);
    pop();
}

function ending() {
    //I have no idea what the ending will be like. it's an escape room puzzle, so it's pretty linear... 
    //maybe have a way to get a bad ending early?
}

function mousePressed() {
    if(manager === `title` && soundFile.isLoaded()) { //make sure sound finished loading first!
        manager = `game`;
        start.playBGM();
    }
    else if(manager === 'game') {
        for(let arrow of arrows) arrow.checkMousePressed();
        for(let slot of inventory) slot.checkMousePressed();
        //iterate through the array backwards, since the items displayed on top get interacted with first!
        for(let i = activeScene.puzzleArray.length - 1; i >= 0; i--) activeScene.puzzleArray[i].checkMousePressed();
        if(activeScene.id === 10) for(let lock of locks) lock.checkMousePressed();
    }
  }

  function mouseReleased() {
    if(activeItem != null) activeItem.checkMouseReleased();
  }

  function cooldown() {
    canClick = false;
    timeout = setTimeout(() => {
        canClick = true;
    }, 100);
  }