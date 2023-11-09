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
let activeItem = null; //held item if player is currently holding one

let sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9; //all scenes
let intBlueKey, intRedKey, intBox, intSafe; //all interactibles
let sc1ints = [], sc2ints = [], sc3ints = [], sc4ints = [], sc5ints = [];
let sc6ints = [], sc7ints = [], sc8ints = [], sc9ints = []; //interactables in each scene

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
    createInteractables();
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
    sc1 = new Scene(1, "room1", sc1ints, null);
    sc2 = new Scene(2, "room2", sc2ints, null);
    sc3 = new Scene(3, "room3", sc3ints, null);
    sc4 = new Scene(4, "room4", sc4ints, null);
    sc5 = new Scene(5, "zoomSafe", sc5ints, sc4); //safe
    sc6 = new Scene(6, "zoomPainting", sc6ints, null); //painting/taxidermy
    sc7 = new Scene(7, "zoomSink", sc7ints, null); //sink
    sc8 = new Scene(8, "zomCupboard", sc8ints, null); //cupboard
    sc9 = new Scene(9, "zoomDoor", sc9ints, null); //door
    scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9);
    activeScene = sc1;
}

function createInteractables() {
    //bool order: addsItem, needsItem, revealsObject, movesScenes
    //room 1
    intBlueKey = new Interactable(`r1bluekey`, 100, 100, 50, 50, 
    true, false, false, false, images.bluekey, null);
    sc1ints.push(intBlueKey);

    //room 2
    intRedKey = new Interactable(`r2redkey`, width/2, height/2, 50, 50, 
    true, false, false, false, images.redkey, null);
    sc2ints.push(intRedKey);

    //room 3
    intBox = new Interactable(`r3box`, width/2+75, height/2+50, 100, 100, 
    false, true, true, false, images.box1, images.box1open);
    sc3ints.push(intBox);

    //room 4
    intSafe = new Interactable(`r4safe`, width/2-50, height/2+50, 120, 120,
    false, false, false, true, images.safe, null);
    sc4ints.push(intSafe);
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
                activeItem = null;
                break;
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
            activeItem = obj.item;
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
        let tempSlot;
        for(let slot of inventory) {
           if(slot.item === activeItem) {
                tempSlot = slot;
                break;
            }
        }

        //if activeItem is dropped onto another slot, swap slots
        //else drop it back to its original slot
        for(let dropSlot of inventory) {
            if(dropSlot.mouseHover) {
                tempSlot.swap(dropSlot);
                break;
            }
            else tempSlot.add(activeItem);
        }
        activeItem = null;
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

    for(let slot of inventory) checkMousePressed(slot);
    for(let int of activeScene.intArray) checkMousePressed(int);
    for(let arrow of arrows) checkMousePressed(arrow);
  }

  function mouseReleased() {
    for(let slot of inventory) checkMouseReleased(slot);
  }