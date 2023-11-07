class Interactable {
    constructor(name, x, y, w, h, scene, addsItem, needsItem, movesScenes) {
        this.name = name; //id purposes
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.scene = scene; //integer of which scene it is part of, for id purposes
        this.addsItem = addsItem; //does interacting with this object add an item to your inventory?
        this.needsItem = needsItem; //does this object require an item to be interacted with?
        this.movesScenes = movesScenes; //does interacting with this object move you to another scene?
        this.interacted = false; //set to true when interacted with. for some items might change the way they look
        this.mouseHover = false; //is mouse on object?
        this.img = null; //image
        this.imgInteracted = null; //if object changes when interacted with, otherwise keep null
    }

    interact() {
        //object is interacted with
        this.interacted = true;
        if(this.imgInteracted != null) this.img = this.imgInteracted;
        if(this.movesScenes) this.moveScene();
        if(this.addsItem) this.removeFromScene();
    }

    removeFromScene() {
        //if it was an item holder that disappears after interacted, remove it from array it was in
        for(let i = 0; i < activeScene.intArray.length; i++) {
            if(activeScene.intArray[i].name === this.name) 
            activeScene.intArray.splice(i, 1);
        }
    }

    moveScene() {
        //TD move to another scene
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}