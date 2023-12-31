/**
 * Project 2
 * Viviana Ema Radu
 * 
 * Quick rundown of code workings:
 * - Start.js has all the setup() and preload() parts
 * - GameState.js has all the draw() parts, cutscenes, and the current active state
 * - AudioPlayer.js has the audio components and bgm sound changes
 * - Everything that checks mouse movement or clicking is left in here
 * - UI_display holds general parts of the game always displayed: scenes, inventory, arrows
 * - room_puzzles holds all the puzzle classes that will be displayed across each scene
 * - the main class most of them extend from is Puzzle.js (which non-interactives default to)
 */
"use strict";

let start; //setup class
let manager; //game manager
let audio; //audio manager
let activeScene; //active scene
let heldItem = null; //item being dragged
let images = {}; //images for everything - see Start.js

let canClick = true; //can player interact with things
let timeout; //settimeout
let interval; //setinterval
let counter = 0; //counter for setinterval

let inventory = []; //player inventory
let activeItem = null; //held item if player is currently holding one

let scenes = []; //scenes in the game - 0-3 are 4 main room, 4-11 are zoom-ins - see Start.js
let sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12; //all scenes
let safe, hand; //unique puzzles - see Start.js

let locks = []; //array of safe numbers - combination: 3719
let buttons = []; //array of the buttons on the radio
let keyslots = []; //array of key slots on the door - answer: blue, yellow, red, green
let arrows = []; //array of arrows: 0 left, 1 right, 2 down

let noto, notoita, lcd; //fonts


//p5js preload
function preload() {
    start = new Start();
    manager = new GameState();
    audio = new AudioPlayer();
    start.preload();
    audio.preload();
}


//p5js setup
function setup() {
    createCanvas(600, 600);
    start.setupArrows();
    start.createPuzzles();
    start.createLocks();
    start.createInventory();
    start.createScenes();
    audio.createBGM();
}


//p5js draw
function draw() {
    background(0);
    manager.checkState();
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

function mousePressed() {
    if(manager.state === 'title' && audio.bgm.isLoaded()) { //make sure sound finished loading first!
        canClick = false;
        interval = setInterval(cutscene, 300);
        manager.state = 'opening';
        audio.playBGM();
    }
    else if(manager.state === 'game') {
        for(let arrow of arrows) arrow.checkMousePressed();
        for(let slot of inventory) slot.checkMousePressed();
        if(activeScene.id === 10) for(let lock of locks) lock.checkMousePressed();
        //iterate through the array backwards, since the items displayed on top get interacted with first!
        for(let i = activeScene.puzzleArray.length - 1; i >= 0; i--) activeScene.puzzleArray[i].checkMousePressed();
    }
    else if(manager.state === 'ending' && canClick) location.reload();
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

  function cutscene() {
    print(counter);
    counter++;
}