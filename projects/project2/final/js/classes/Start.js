class Start {
    constructor() {

    }

    setupArrows() {
        leftArrow = new Arrow(`left`, 50, height/2, images.arrowLeft);
        rightArrow = new Arrow(`right`, width-50, height/2, images.arrowRight);
        downArrow = new Arrow(`down`, width/2, height-120, images.arrowDown);
        arrows.push(leftArrow, rightArrow, downArrow);
    }
    
    setupPlayer() {
        //TD
    }
    
    createScenes() {
        sc1 = new Scene(1, "room1", sc1Array, null); //door, cupboard
        sc2 = new Scene(2, "room2", sc2Array, null); //statue
        sc3 = new Scene(3, "room3", sc3Array, null); //deer taxidermy, radio dresser
        sc4 = new Scene(4, "room4", sc4Array, null); //window, safe
        sc5 = new Scene(5, "zoomDoor", sc5Array, sc1); //room 1 zoom door
        sc6 = new Scene(6, "zoomCupboard", sc6Array, sc1); //room 1 zoom bloody cupboard
        sc7 = new Scene(7, "zoomStatue", sc7Array, sc2); //room 2 zoom statue
        sc8 = new Scene(8, "zoomDeer", sc8Array, sc3); //room 3 zoom deer
        sc9 = new Scene(9, "zoomRadio", sc9Array, sc3); //room 3 zoom radio + cupboard
        sc10 = new Scene(10, "zoomSafe", sc10Array, sc4); //room 4 zoom safe
        sc11 = new Scene(11, "zoomWindow", sc11Array, sc4); //room 4 zoom window
        scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11);
        activeScene = sc1;
    }
    
    createPuzzles() {
        //bool order: addsItem, needsItem, revealsObject, movesScenes
        //room 1
        intBlueKey = new PItem('bluekey', 100, 100, 50, 50, 'round', images.bluekey, null);
        sc1Array.push(intBlueKey);
    
        //room 2
        intRedKey = new PItem('redkey', width/2, height/2, 50, 50, 'round', images.redkey, null);
        sc2Array.push(intRedKey);
    
        //room 3
        intBox = new Puzzle('box', width/2+75, height/2+50, 100, 100, 'rect', images.box1, images.box1open);
        sc3Array.push(intBox);
    
        //room 4
        intSafe = new PZoom('safe', width/2-50, height/2+50, 120, 120, 'rect', images.safe, null);
        sc4Array.push(intSafe);
    }
    
    createLocks() {
        lock1 = new Lock(2, width/2-50, height/2+10);
        lock2 = new Lock(2, width/2+25, height/2+10);
        lock3 = new Lock(2, width/2+100, height/2+10);
        lock4 = new Lock(2, width/2+175, height/2+10);
        locks.push(lock1, lock2, lock3, lock4);
    }
    
    createInventory() {
        let slotX = 150;
        for(let i = 0; i < inventorySize; i++) {
            let newSlot = new InventorySlot(slotX, height-44);
            inventory.push(newSlot);
            slotX += 75;
        }
    }
}