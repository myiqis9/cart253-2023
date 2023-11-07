/**
 * Project 2
 * Viviana Ema Radu
 */

let manager = `title`; //game manager
let activeScene; //active scene
let heldItem = null; //item being dragged

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-8(?) are zoom-ins on interactables
let inventory = []; //player inventory
let slotID = 0; //id for slots
let activeItem; //held item if player is currently holding one

let sc0, sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8; //all scenes
let int0, int1, int2, int3, int4, int5, int6, int7, int8, int9, int10; //all interactibles
let sc0ints = [], sc1ints = [], sc2ints = [], sc3ints = [], sc4ints = [];
let sc5ints = [], sc6ints = [], sc7ints = [], sc8ints = []; //interactables in each scene
let leftArrow, rightArrow, downArrow; //arrows

let player = {
    x: undefined,
    y: undefined,
    state: `idle`,
    idleImg: undefined,
    grabImg: undefined,
    moveImg: undefined
}

function preload() {
    //TD load all images
}


function setup() {
    createCanvas(600, 600);
    setupArrows();
    setupPlayer();
    createInteractables();
    createInventory();
    createScenes();
}

function setupArrows() {
    //TD
}

function setupPlayer() {
    //TD
}

function createScenes() {
    sc0 = new Scene("room1", sc0ints, null);
    sc1 = new Scene("room2", sc1ints, null);
    sc2 = new Scene("room3", sc2ints, null);
    sc3 = new Scene("room4", sc3ints, null);
    sc4 = new Scene("zoom1", sc4ints, 0);
    sc5 = new Scene("zoom2", sc5ints, 0);
    sc6 = new Scene("zoom3", sc6ints, 0);
    sc7 = new Scene("zoom4", sc7ints, 0);
    sc8 = new Scene("zoom5", sc8ints, 0);
    activeScene = sc0;
}

function createInteractables() {
    //TD
}

function createInventory() {
    //TD
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
}

function opening() {
    //might have an opening animation? setting? tutorial? 
    //you wake up in a strange room and it's dark...
    //shadow passes through the window, suddenly lights flicker open?
}

function game() {
    checkDraggedItemInteraction();
    checkInventory();
    checkInteractibles();
    checkDragging();
    displayGame();
}

function checkDraggedItemInteraction() {
    if(activeItem !== null) {
        for(let int of activeScene.intArray) {
            let d = dist(int.x, int.y, activeItem.x, activeItem.y);
    
            if (d < activeItem.size / 2 && activeItem.interactsWith === int.name) {
                int.interact();
                activeItem.interacted();
            }
        }
    }
}

function checkDragging() {
    if(activeItem !== null) {
      activeItem.x = mouseX;
      activeItem.y = mouseY;
  
      activeItem.x = constrain(activeItem.x, 0, width);
      activeItem.y = constrain(activeItem.y, 0, height);
    }
}

function checkInventory() {
    for(let slot of inventory) {
      if(mouseIsInside(slot)) slot.mouseHover = true;
      else slot.mouseHover = false;
    }
}

function checkInteractibles() {
    for(let int of activeScene) {
        if(mouseIsInside(int)) int.mouseHover = true;
        else int.mouseHover = false;
    }
}

function mouseIsInside(obj) {
    let d = dist(mouseX, mouseY, obj.x, obj.y);
    if (d < obj.size / 2) return true;
    else return false;
}

function checkMousePressed(obj) {
    if(obj.mouseHover && obj instanceof Slot) {
      food.isDragged = true;
      checkDragging(food);
    }
}

function checkMouseReleased() {
    if(activeItem !== null) resetItem(activeItem);
}

function addItemToInventory(item) {
    for(let slot of inventory) {
        if(!slot.hasItem) {
            slot.add(item);
            break;
        }
    }
}

function displayGame() {
    rectMode(CENTER);
    imageMode(CENTER);

    activeScene.display();
    for(let slot of inventory) slot.display();
}

function ending() {
    //I have no idea what the ending will be like. it's an escape room puzzle, so it's pretty linear... 
    //maybe have a way to get a bad ending early?
}

function mousePressed() {
    if(manager === `title`) manager = `game`; //goes straight to game for now

    for(let slot of inventory) slot.checkMousePressed();
  }

  function mouseReleased() {
    for(let slot of inventory) slot.checkMouseReleased();
  }