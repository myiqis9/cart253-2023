class Start {
    constructor() {

    }

    setupArrows() {
        leftArrow = new Arrow(`left`, 50, height/2-35, images.arrowLeft);
        rightArrow = new Arrow(`right`, width-50, height/2-35, images.arrowRight);
        downArrow = new Arrow(`down`, width/2, height-120, images.arrowDown);
        arrows.push(leftArrow, rightArrow, downArrow);
    }
    
    setupPlayer() {
        //TD
    }
    
    createScenes() {
        sc1 = new Scene(1, "room1", sc1Array, null); //door, cupboard, painting
        sc2 = new Scene(2, "room2", sc2Array, null); //statue
        sc3 = new Scene(3, "room3", sc3Array, null); //deer taxidermy, radio dresser
        sc4 = new Scene(4, "room4", sc4Array, null); //window, safe
        sc5 = new Scene(5, "zoomDoor", sc5Array, sc1); //room 1 zoom door
        sc6 = new Scene(6, "zoomCupboard", sc6Array, sc1); //room 1 zoom bloody cupboard
        sc7 = new Scene(7, "zoomStatue", sc7Array, sc2); //room 2 zoom statue
        sc8 = new Scene(8, "zoomDeer", sc8Array, sc3); //room 3 zoom deer
        sc9 = new Scene(9, "zoomRadio", sc9Array, sc3); //room 3 zoom radio + cupboard
        sc10 = new Scene(10, "zoomSafe", sc10Array, sc4); //room 4 zoom safe (locked)
        sc11 = new Scene(11, "zoomSafeOpen", sc10Array, sc4); //room 4 zoom safe (unlocked)
        sc12 = new Scene(12, "zoomWindow", sc11Array, sc4); //room 4 zoom window
        scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12);
        activeScene = sc1;
    }
    
    createPuzzles() {
        //room 1
        let door = new PZoom('door', 190, height/2-92, 234, 384, 'rect', images.door);
        let cupboard = new PZoom('cupboard', width-162, height/2+20, 180, 221, 'rect', images.cupboard);
        let painting = new PFill('painting', width-162, height/2-200, 141, 125, 'rect', images.painting1, images.painting2);
        sc1Array.push(door, cupboard, painting);
        //room 2
    
        //room 3
    
        //room 4
        safe = new PSafe('safe', width/2-50, height/2, 120, 120, 'rect', images.safe, images.safe);
        sc4Array.push(safe);
    }
    
    createLocks() {
        lock1 = new Lock(3, width/2-50, height/2+10);
        lock2 = new Lock(1, width/2+25, height/2+10);
        lock3 = new Lock(7, width/2+100, height/2+10);
        lock4 = new Lock(9, width/2+175, height/2+10);
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