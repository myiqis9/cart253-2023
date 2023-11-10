/**
 * Project 2
 * Viviana Ema Radu
 */

let manager = `title`; //game manager
let activeScene; //active scene
let heldItem = null; //item being dragged

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-12(?) are zoom-ins on areas
let inventory = []; //player inventory
let inventorySize = 5;
let activeItem = null; //held item if player is currently holding one

let sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9; //all scenes
let intBlueKey, intRedKey, intBox, intSafe; //all interactibles

let sc1Array = [], sc2Array = [], sc3Array = [], sc4Array = [], sc5Array = [];
let sc6Array = [], sc7Array = [], sc8Array = [], sc9Array = []; //puzzles in each scene

let lock1, lock2, lock3, lock4; //safe lock numbers
let locks = []; //array of the numbers

let leftArrow, rightArrow, downArrow; //arrows
let arrows = []; //array of arrows

let player = {
    x: undefined,
    y: undefined,
    state: `idle`,
    idleImg: undefined,
    grabImg: undefined,
    moveImg: undefined
}

//loading images
let images = {};
let imgNames = [`redkey`, `bluekey`, `goldkey`, `box1`, `box1open`, `safe`,
`arrowDown`, `arrowLeft`, `arrowRight`];

function preload() {
    //preload all images
    for(img of imgNames) {
        images[img] = loadImage(`assets/images/${img}.png`);
        //thanks to Pippin for helping me with this!
    }
}


function setup() {
    createCanvas(600, 600);
    setupArrows();
    setupPlayer();
    createPuzzles();
    createLocks();
    createInventory();
    createScenes();
}

function setupArrows() {
    leftArrow = new Arrow(`left`, 50, height/2, images.arrowLeft);
    rightArrow = new Arrow(`right`, width-50, height/2, images.arrowRight);
    downArrow = new Arrow(`down`, width/2, height-120, images.arrowDown);
    arrows.push(leftArrow, rightArrow, downArrow);
}

function setupPlayer() {
    //TD
}

function createScenes() {
    sc1 = new Scene(1, "room1", sc1Array, null);
    sc2 = new Scene(2, "room2", sc2Array, null);
    sc3 = new Scene(3, "room3", sc3Array, null);
    sc4 = new Scene(4, "room4", sc4Array, null);
    sc5 = new Scene(5, "zoomSafe", sc5Array, sc4); //safe
    sc6 = new Scene(6, "zoomPainting", sc6Array, null); //painting/taxidermy
    sc7 = new Scene(7, "zoomSink", sc7Array, null); //sink
    sc8 = new Scene(8, "zoomCupboard", sc8Array, null); //cupboard
    sc9 = new Scene(9, "zoomDoor", sc9Array, null); //door
    scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9);
    activeScene = sc1;
}

function createPuzzles() {
    //bool order: addsItem, needsItem, revealsObject, movesScenes
    //room 1
    intBlueKey = new Puzzle(`r1bluekey`, 100, 100, 50, 50, 
    true, false, false, false, images.bluekey, null);
    sc1Array.push(intBlueKey);

    //room 2
    intRedKey = new Puzzle(`r2redkey`, width/2, height/2, 50, 50, 
    true, false, false, false, images.redkey, null);
    sc2Array.push(intRedKey);

    //room 3
    intBox = new Puzzle(`r3box`, width/2+75, height/2+50, 100, 100, 
    false, true, true, false, images.box1, images.box1open);
    sc3Array.push(intBox);

    //room 4
    intSafe = new Puzzle(`r4safe`, width/2-50, height/2+50, 120, 120,
    false, false, false, true, images.safe, null);
    sc4Array.push(intSafe);
}

function createLocks() {
    lock1 = new Lock(2, width/2-50, height/2+10);
    lock2 = new Lock(2, width/2+25, height/2+10);
    lock3 = new Lock(2, width/2+100, height/2+10);
    lock4 = new Lock(2, width/2+175, height/2+10);
    locks.push(lock1, lock2, lock3, lock4);
}

function createInventory() {
    let slotX = 150;
    for(let i = 0; i < inventorySize; i++) {
        let newSlot = new InventorySlot(slotX, height-44);
        inventory.push(newSlot);
        slotX += 75;
    }
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
      if(mouseIsInside(slot)) slot.mouseHover = true;
      else slot.mouseHover = false;
    }

    for(let puzzle of activeScene.puzzleArray) {
        if(mouseIsInside(puzzle)) puzzle.mouseHover = true;
        else puzzle.mouseHover = false;
    }

    for(let arrow of arrows) {
        if(mouseIsInside(arrow) && arrow.active) arrow.mouseHover = true;
        else arrow.mouseHover = false;
    }
}

function mouseIsInside(obj) {
    let d = dist(mouseX, mouseY, obj.x, obj.y);
    if (d < obj.size / 2) return true;
    else return false;
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

function ending() {
    //I have no idea what the ending will be like. it's an escape room puzzle, so it's pretty linear... 
    //maybe have a way to get a bad ending early?
}

function mousePressed() {
    if(manager === `title`) manager = `game`; //goes straight to game for now

    for(let slot of inventory) slot.checkMousePressed();
    for(let puzzle of activeScene.puzzleArray) puzzle.checkMousePressed();
    for(let arrow of arrows) arrow.checkMousePressed();
    if(activeScene.id === 5) for(let lock of locks) lock.checkMousePressed();
  }

  function mouseReleased() {
    if(activeItem != null) activeItem.checkMouseReleased();
  }