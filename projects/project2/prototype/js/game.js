/**
 * Project 2
 * Viviana Ema Radu
 */

let manager = `title`; //game manager
let activeScene; //active scene
let heldItem = null; //item being dragged

let scenes = []; //scenes in the game - 0-3 are 4 wall sides, 4-8(?) are zoom-ins on interactables
let inventory = []; //player inventory
let inventorySize = 5;
let slotID = 0; //id for slots, might not be needed?
let activeItem = null; //held item if player is currently holding one

let sc0, sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8; //all scenes
let int0, int1, int2, int3, int4, int5, int6, int7, int8, int9, int10; //all interactibles
let sc0ints = [], sc1ints = [], sc2ints = [], sc3ints = [], sc4ints = [];
let sc5ints = [], sc6ints = [], sc7ints = [], sc8ints = []; //interactables in each scene
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
let imgNames = [`item1`, `item2`, `item3`, `arrowDown`, `arrowLeft`, `arrowRight`];

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
    createInteractables();
    createInventory();
    createScenes();
}

function setupArrows() {
    leftArrow = new Arrow(`left`, 50, height/2, images.arrowLeft);
    rightArrow = new Arrow(`right`, width-50, height/2, images.arrowRight);
    downArrow = new Arrow(`down`, width/2, height-50, images.arrowDown);
    arrows.push(leftArrow, rightArrow, downArrow);
}

function setupPlayer() {
    //TD
}

function createScenes() {
    sc0 = new Scene(0, "room1", sc0ints, null);
    sc1 = new Scene(1, "room2", sc1ints, null);
    sc2 = new Scene(2, "room3", sc2ints, null);
    sc3 = new Scene(3, "room4", sc3ints, null);
    sc4 = new Scene(4, "zoom1", sc4ints, 0);
    sc5 = new Scene(5, "zoom2", sc5ints, 0);
    sc6 = new Scene(6, "zoom3", sc6ints, 0);
    sc7 = new Scene(7, "zoom4", sc7ints, 0);
    sc8 = new Scene(8, "zoom5", sc8ints, 0);
    scenes.push(sc0, sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8);
    activeScene = sc0;
}

function createInteractables() {
    //TD
    //room 1
    int0 = new Interactable(`r1bluekey`, 100, 100, 50, 50, true, false, false, false, 
    images.item1, null);
    sc0ints.push(int0);

    //room 2
    int1 = new Interactable(`r2redkey`, width/2, height/2, 50, 50, true, true, false, false, 
    images.item2, null);
    sc1ints.push(int1);

    //room 3


    //room 4
}

function createInventory() {
    let slotX = 145;
    for(let i = 0; i < inventorySize; i++) {
        let newSlot = new InventorySlot(slotX, height-50);
        inventory.push(newSlot);
        slotX += 75;
        slotID++;
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
    checkDraggedItemInteraction();
    checkInventory();
    checkInteractibles();
    checkArrows();
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
    for(let int of activeScene.intArray) {
        if(mouseIsInside(int)) int.mouseHover = true;
        else int.mouseHover = false;
    }
}

function checkArrows() {
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

function checkMousePressed(obj) {
    //if mouse is pressed on an inventory item, it starts being dragged
    //if it's pressed on an interactable object, it interacts with it
    //if it's on an arrow, change scenes
    if(obj.mouseHover) {
        if(obj instanceof InventorySlot && obj.hasItem) {
            obj.item = activeItem;
            activeItem.isDragged = true;
            checkDragging();
        }
        else if(obj instanceof Interactable) {
            if(!obj.needsItem) obj.interact();
        }
        else if(obj instanceof Arrow) obj.clicked();
    }
}

function checkMouseReleased() {
    if(activeItem !== null) {
        for(let slot of inventory) {
            if(slot.item === activeItem) {
                activeItem.x = slot.x;
                activeItem.y = slot.y;
            }
        }
        activeItem = null;
        //TD if activeItem is dropped onto another slot, swap? maybe?
    }
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

    //display active scene and interactables
    activeScene.display();

    //display arrows
    for(let arrow of arrows) if(arrow.active) arrow.display();

    //display inventory & player items
    for(let slot of inventory) slot.display();
    
    //TD display player cursor
}

function ending() {
    //I have no idea what the ending will be like. it's an escape room puzzle, so it's pretty linear... 
    //maybe have a way to get a bad ending early?
}

function mousePressed() {
    if(manager === `title`) manager = `game`; //goes straight to game for now

    for(let slot of inventory) checkMousePressed(slot);
    for(let int of activeScene.intArray) checkMousePressed(int);
    for(let arrow of arrows) checkMousePressed(arrow);
  }

  function mouseReleased() {
    for(let slot of inventory) checkMouseReleased(slot);
  }