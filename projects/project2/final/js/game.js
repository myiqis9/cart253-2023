/**
 * Project 2
 * Viviana Ema Radu
 */
"use strict";

let start; //setup class
let manager = `title`; //game manager
let activeScene; //active scene
let heldItem = null; //item being dragged

let canClick = true; //can player interact with things
let timeout; //settimeout

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-10 are zoom-ins - see Start.js
let inventory = []; //player inventory
let inventorySize = 5;
let activeItem = null; //held item if player is currently holding one

let sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12; //all scenes
let safe, statue; //unique puzzles - see Start.js

let sc1Array = [], sc2Array = [], sc3Array = [], sc4Array = [], sc5Array = [];
let sc6Array = [], sc7Array = [], sc8Array = [], sc9Array = [], sc10Array = [];
let sc11Array = [], sc12Array = []; //puzzles in each scene

let lock1, lock2, lock3, lock4; //safe lock numbers
let locks = []; //array of the numbers

let button1, button2, button3, button4, button5; //radio buttons
let buttons = []; //array of the buttons

let leftArrow, rightArrow, downArrow; //arrows
let arrows = []; //array of arrows

//loading images
let images = {};
let imgNames = [`iredkey`, `ibluekey`, `igoldkey`, `ipaper`, 
    `igreencube`, `iredcube`, `ibluecube`, `iyellowcube`, `iemptycube`, //items
    `door1`, `cupboard1`, `painting1`, `painting2`, //room 1
    `statue1`, `statue2`, `greencube`, `taxidermy`, `paper`, //room 2
     //room 3
    `safe`, //room 4
    `door2`, `redin`, `bluein`, `yellowin`, `greenin`, //zoom door
    `cupboard2`, `goldchest1`, `goldchest2`, `knife`, //zoom cupboard
    `statue3`, `placedhand`, //zoom statue
    //zoom deer
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
}


function setup() {
    createCanvas(600, 600);
    start = new Start();
    start.setupArrows();
    start.createPuzzles();
    start.createLocks();
    start.createInventory();
    start.createScenes();
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

function checkLockCombination() {
    let solved = true;

    //checks if all locks are correct, if any one of them isnt then turn solved to false
    for(let lock of locks) {
        if(lock.num !== lock.target) {
            solved = false;
            break;
        }
    }

    if(solved) {
        safe.open = true;
        safe.interact();
        //play sound?
    }
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
    
    //TD display player cursor
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
    if(manager === `title`) manager = `game`;
    else if(manager === 'game') {
        for(let arrow of arrows) arrow.checkMousePressed();
        for(let slot of inventory) slot.checkMousePressed();
        for(let puzzle of activeScene.puzzleArray) puzzle.checkMousePressed();
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