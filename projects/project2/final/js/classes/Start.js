class Start {
    constructor() {
        //array of all the puzzle arrays to implement them in the scene
        this.p = [];
    }

    setupArrows() {
        let leftArrow = new Arrow(`left`, 50, height/2-35, images.arrowLeft);
        let rightArrow = new Arrow(`right`, width-50, height/2-35, images.arrowRight);
        let downArrow = new Arrow(`down`, width/2, height-120, images.arrowDown);
        arrows.push(leftArrow, rightArrow, downArrow);
    }
    
    //create all the scenes: their ID, their array of puzzle objects, 
    createScenes() {
        sc1 = new Scene(1, this.p[0], null); //room 1: door, cupboard, painting
        sc2 = new Scene(2, this.p[1], null); //room 2: statue, taxidermy
        sc3 = new Scene(3, this.p[2], null); //room 3: deer, radio dresser
        sc4 = new Scene(4, this.p[3], null); //room 4: window, safe
        sc5 = new Scene(5, this.p[4], sc1); //room 1 zoom door
        sc6 = new Scene(6, this.p[5], sc1); //room 1 zoom bloody cupboard
        sc7 = new Scene(7, this.p[6], sc2); //room 2 zoom statue
        sc8 = new Scene(8, this.p[7], sc3); //room 3 zoom deer
        sc9 = new Scene(9, this.p[8], sc3); //room 3 zoom radio + cupboard
        sc10 = new Scene(10, this.p[9], sc4); //room 4 zoom safe (locked)
        sc11 = new Scene(11, this.p[10], sc4); //room 4 zoom safe (unlocked)
        sc12 = new Scene(12, this.p[11], sc4); //room 4 zoom window
        scenes.push(sc1, sc2, sc3, sc4, sc5, sc6, sc7, sc8, sc9, sc10, sc11, sc12);
        activeScene = sc1;
    }
    
    //create every single thing that extends from class "Puzzle" for each respective scene
    createPuzzles() {
        //room 1
        let sc1Array = [];
        let door1 = new PZoom('door', 190, height/2-92, 234, 384, 'rect', images.door1);
        let cupboard1 = new PZoom('cupboard', width-162, height/2+20, 180, 221, 'rect', images.cupboard1);
        let painting = new PFill('painting', width-162, height/2-200, 141, 125, 'rect', images.painting1, images.painting2);
        sc1Array.push(door1, cupboard1, painting);

        //room 2
        let sc2Array = [];
        let statue = new PStatue(180, height/2-62, 324, 467, 'rect', images.statue1, images.statue2, images.statue3);
        let greencube = new PItem('greencube', 258, height/2+123, 35, 44, 'rect', images.greencube);
        let taxidermy = new Puzzle('taxidermy', width-145, height/2-112, 153, 270, 'rect', images.taxidermy);
        let paper = new PItem('paper', width-68, 89, 45, 57, 'round', images.paper);
        sc2Array.push(statue, greencube, taxidermy, paper);

        //room 3
        let sc3Array = [];
        let deertaxidermy = new PZoom('deertaxidermy', 155, height/2-142, 262, 313, 'rect', images.deertaxidermy);
        let radiodrawer = new PZoom('radiodrawer', width-165, height/2, 251, 257, 'rect', images.radiodrawer1);
        sc3Array.push(deertaxidermy, radiodrawer);
    
        //room 4
        let sc4Array = [];
        safe = new PSafe(180, height/2+72, 123, 124, 'rect', images.safe1);
        let window = new PZoom('window', width-180, height/2-75, 219, 368, 'rect', images.window1);
        sc4Array.push(safe, window);

        //zoom door
        let sc5Array = [];
        let door2 = new Puzzle('door2', 300, 257, 600, 511, 'rect', images.door2);
        let key1 = new PDoorKey(171, 199, 82, 82, 'rect', null, 'bluecube');
        let key2 = new PDoorKey(261, 199, 82, 82, 'rect', null, 'yellowcube');
        let key3 = new PDoorKey(350, 199, 82, 82, 'rect', null, 'redcube');
        let key4 = new PDoorKey(440, 199, 82, 82, 'rect', null, 'greencube');
        keyslots.push(key1, key2, key3, key4);
        sc5Array.push(door2, key1, key2, key3, key4);

        //zoom cupboard
        let sc6Array = [];
        let cupboard2 = new Puzzle('cupboard2', 290, 257, 596, 511, 'rect', images.cupboard2);
        let goldchest = new PReveal('goldchest', width/2+14, height/2+103, 205, 156, 'rect', images.goldchest1, images.goldchest2);
        let knife = new PItem('knife', width/2+3, height/2-94, 280, 54, 'rect', images.knife);
        sc6Array.push(cupboard2, goldchest, knife);

        //zoom statue
        let sc7Array = [];
        hand = new PHand(width/2+64, height/2-32, 156, 332, 'rect', images.placedhand);
        sc7Array.push(statue, hand);

        //zoom deer
        let sc8Array = [];
        let deer = new Puzzle('deer', width/2, 257, 596, 511, 'rect', images.deer);
        let deermouth = new PDeerMouth(width/2-23, height/2+4, 150, 111, 'round', images.deermouth2);
        sc8Array.push(deer, deermouth);

        //zoom radio
        let sc9Array = [];
        let radiodrawer2 = new Puzzle('radiodrawer2', 299, 281, 587, 462, 'rect', images.radiodrawer2);
        let radio = new PReveal('radio', width-198, 47, 164, 31, 'rect', images.radio, images.radioopen);
        let reddrawer = new PReveal('reddrawer', 152, height/2+59, 270, 305, 'rect', images.reddrawer, images.reddraweropen);
        let bluedrawer = new PReveal('bluedrawer', width-152, height/2+59, 270, 305, 'rect', images.bluedrawer, images.bluedraweropen);
        let btn1, btn2, btn3, btn4, btn5;
        btn1 = new PButton(0, 155, 131, null, 1, true);
        btn2 = new PButton(1, 195, 131, 0, 2, false);
        btn3 = new PButton(2, 235, 131, 1, 3, true);
        btn4 = new PButton(3, 275, 131, 2, 4, true);
        btn5 = new PButton(4, 315, 131, 3, null, false);
        buttons.push(btn1, btn2, btn3, btn4, btn5);
        sc9Array.push(radiodrawer2, radio, reddrawer, bluedrawer, btn1, btn2, btn3, btn4, btn5);

        let sc10Array = [];
        let safebg = new Puzzle('safe', width/2, height/2-45, 521, 511, 'rect', images.safe2);
        sc10Array.push(safebg);

        let sc11Array = [];
        let safeopen = new Puzzle('safe', width/2-20, height/2-45, 561, 511, 'rect', images.safeopen);
        let yellowcube = new PItem('yellowcube', width/2+78, height-174, 80, 92, 'rect', images.yellowcube);
        sc11Array.push(safeopen, yellowcube);

        let sc12Array = [];
        let window2 = new Puzzle('window', width/2-34, height/2-46, 532, 509, 'rect', images.window2);
        let deadbird = new PReveal('deadbird', width/2+102, height/2+60, 266, 243, 'rect', images.deadbird1, images.deadbird2);
        sc12Array.push(window2, deadbird);

        this.p.push(sc1Array, sc2Array, sc3Array, sc4Array, sc5Array, sc6Array, sc7Array, sc8Array, sc9Array, sc10Array, sc11Array, sc12Array);
        
        //window1 219x368
        //bird 174x115
    }
    
    //create the lock numbers for the safe
    createLocks() {
        let lock1 = new Lock(3, width/2-135, height/2-26);
        let lock2 = new Lock(7, width/2-75, height/2-26);
        let lock3 = new Lock(1, width/2-15, height/2-26);
        let lock4 = new Lock(9, width/2+45, height/2-26);
        locks.push(lock1, lock2, lock3, lock4);
    }
    
    //create player inventory
    createInventory() {
        let slotX = 150;
        for(let i = 0; i < inventorySize; i++) {
            let newSlot = new InventorySlot(slotX, height-44);
            inventory.push(newSlot);
            slotX += 75;
        }
    }

    //background music - reverbrating Gnossiennes by Erik Satie, with brown noise for radio static effect
    createBGM() {
        reverb = new p5.Reverb();
        noise = new p5.Noise('brown');
        
        bgm.disconnect(); // so we'll only hear reverb...
      
        //connect soundFile to reverb, reverbTime, decayRate
        reverb.process(bgm, 7, 20);
        this.setSound(1);
    }

    //this sets how loud the background music is. to be used when switching from scene to scene
    setSound(drywet) {
        //strength of reverb (this is what will be modified!)
        reverb.amp(1.4-drywet);
        reverb.drywet(drywet);
        noise.amp(0.042-(drywet/20));
    }

    //play bgm when game starts
    playBGM() {
        bgm.play();
        noise.start();
    }
}