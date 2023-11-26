class Start {
    setupArrows() {
        leftArrow = new Arrow(`left`, 50, height/2-35, images.arrowLeft);
        rightArrow = new Arrow(`right`, width-50, height/2-35, images.arrowRight);
        downArrow = new Arrow(`down`, width/2, height-120, images.arrowDown);
        arrows.push(leftArrow, rightArrow, downArrow);
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
        sc11 = new Scene(11, "zoomSafeOpen", sc11Array, sc4); //room 4 zoom safe (unlocked)
        sc12 = new Scene(12, "zoomWindow", sc12Array, sc4); //room 4 zoom window
        scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12);
        activeScene = sc1;
    }
    
    createPuzzles() {
        //room 1
        let door1 = new PZoom('door', 190, height/2-92, 234, 384, 'rect', images.door1);
        let cupboard1 = new PZoom('cupboard', width-162, height/2+20, 180, 221, 'rect', images.cupboard1);
        let painting = new PFill('painting', width-162, height/2-200, 141, 125, 'rect', images.painting1, images.painting2);
        sc1Array.push(door1, cupboard1, painting);

        //room 2
        statue = new Statue('statue', 180, height/2-62, 324, 467, 'rect', images.statue1, 
        images.statue2, images.statue3, images.placedhand, null, null, null);
        let greencube = new PItem('greencube', 258, height/2+123, 35, 44, 'rect', images.greencube);
        let taxidermy = new Puzzle('taxidermy', width-145, height/2-112, 153, 270, 'rect', images.taxidermy);
        let paper = new PItem('paper', width-68, 89, 45, 57, 'round', images.paper);
        sc2Array.push(greencube, statue, taxidermy, paper);

        //room 3
    
        //room 4
        safe = new PSafe('safe', width/2-50, height/2, 120, 120, 'rect', images.safe, images.safe);
        sc4Array.push(safe);

        //zoom door
        let door2 = new PDoor('door2', 300, 257, 600, 511, 'rect', images.door2);
        sc5Array.push(door2);

        //zoom cupboard
        let cupboard2 = new Puzzle('cupboard2', 290, 257, 596, 511, 'rect', images.cupboard2);
        let goldchest = new PReveal('goldchest', width/2+14, height/2+103, 205, 156, 'rect', images.goldchest1, images.goldchest2);
        let knife = new PItem('knife', width/2+3, height/2-94, 280, 54, 'rect', images.knife);
        sc6Array.push(cupboard2, goldchest, knife);

        //zoom statue
        sc7Array.push(statue);
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