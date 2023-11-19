class PItem extends Puzzle {
    //interacting with this object adds an item to your inventory

    constructor(name, x, y, w, h, img, imgInteracted) {
        super(name, x, y, w, h, img, imgInteracted);
    }

    interact() {
        super.interact();
        this.addItem();
    }

    addItem() {
        //depending on which object it is, create and add appropriate item to inventory
        print(`adding ${this.name} to inventory`);
        
        let newItem;
        switch(this.name) {
            case `bluekey`:
                newItem = new Item(this.name, `r3box`, this.img);
                newItem.addToInventory();
                break;
            case `redkey`:
                newItem = new Item(this.name, null, this.img);
                newItem.addToInventory();
                break;
            case `goldkey`:
                newItem = new Item(this.name, null, this.img);
                newItem.addToInventory();
            break;
        }

        //remove interactible object from scene
        for(let i = 0; i < activeScene.puzzleArray.length; i++) {
            if(activeScene.puzzleArray[i].name === this.name) 
            activeScene.puzzleArray.splice(i, 1);
        }
    }

    display() {
        super.display();
    }
}