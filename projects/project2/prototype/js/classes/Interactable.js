class Interactable {
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

    interact() {
        //object is interacted with
        if(this.imgInteracted !== null && this.img !== this.imgInteracted) this.img = this.imgInteracted;
        if(this.revealsObject) this.revealObject();
        if(this.movesScenes) this.moveScene();
        if(this.addsItem) this.addItem();
    }

    addItem() {
        let newItem;
        switch(this.name) {
            //TD depending on which interactible it is, create and add appropriate item to inventory
            //newItem = new Item();
            //addItemToInventory(newItem);
        }

        //remove interactible object from scene
        for(let i = 0; i < activeScene.intArray.length; i++) {
            if(activeScene.intArray[i].name === this.name) 
            activeScene.intArray.splice(i, 1);
        }
    }

    moveScene() {
        switch(this.name) {
            //TD move to another scene
        }
    }

    revealObject() {
        switch(this.name) {
            //TD depending on which interactible it is, add appropriate hidden interactible to activeScene int array
            //activeScene.intArray.push(int10);
            //set revealsObject as false so it doesn't repeat this next time it's interacted with
            //revealsObject = false;
        }
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}