class Puzzle {
    constructor(name, x, y, w, h, addsItem, needsItem, revealsObject, movesScenes, img, imgInteracted) {
        this.name = name; //id purposes. r0-r1-r2-r3 designation for objects in room, z0-z1-z2-z3-z4-z5 objects in zoomed areas
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.size = (w+h)/2;

        //a bunch of booleans for identification
        this.addsItem = addsItem; //does interacting with this object add an item to your inventory?
        this.needsItem = needsItem; //does this object require an item to be interacted with?
        this.revealsObject = revealsObject; //does this object reveal another hidden object underneath?
        this.movesScenes = movesScenes; //does interacting with this object move you to another scene?

        //interaction
        this.mouseHover = false; //is mouse on object?
        this.img = img; //image
        this.imgInteracted = imgInteracted; //if object changes when interacted with, otherwise keep null
    }

    checkMousePressed() {
        if(this.mouseHover) {
            if(!this.needsItem) this.interact();
        }
    }

    interact() {
        //object is interacted with
        if(this.imgInteracted !== null && this.img !== this.imgInteracted) this.img = this.imgInteracted;
        if(this.revealsObject) this.revealObject();
        if(this.movesScenes) this.moveScene();
        if(this.addsItem) this.addItem();
    }

    addItem() {
        //depending on which interactible it is, create and add appropriate item to inventory
        print(`adding ${this.name} to inventory`);
        
        let newItem;
        switch(this.name) {
            case `r1bluekey`:
                newItem = new Item(this.name, `r3box`, this.img);
                newItem.addToInventory();
                break;
            case `r2redkey`:
                newItem = new Item(this.name, null, this.img);
                newItem.addToInventory();
                break;
            case `r3goldkey`:
                newItem = new Item(this.name, null, this.img);
                newItem.addToInventory();
            break;
        }

        //remove interactible object from scene
        for(let i = 0; i < activeScene.intArray.length; i++) {
            if(activeScene.intArray[i].name === this.name) 
            activeScene.intArray.splice(i, 1);
        }
    }

    moveScene() {
        switch(this.name) {
            case `r4safe`:
                activeScene = sc5;
            break;
        }
    }

    revealObject() {
        let newInt;
        //depending on which interactible it is, add appropriate hidden interactible to current scene
        switch(this.name) {
            case `r3box`:
                newInt = new Puzzle(`r3goldkey`, this.x, this.y-25, 50, 50, 
                true, false, false, false, images.goldkey, null);
                activeScene.intArray.push(newInt);
            break;
        }
        //set revealsObject as false so it doesn't repeat this next time it's interacted with
        this.revealsObject = false;
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}