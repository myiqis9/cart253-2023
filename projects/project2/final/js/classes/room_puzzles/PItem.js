class PItem extends Puzzle {
    //interacting with this object adds an item to your inventory

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);
    }

    interact() {
        //depending on which object it is, create and add appropriate item to inventory
        print(`adding ${this.name} to inventory`);
        
        let newItem;
        switch(this.name) {
            case 'greencube':
                newItem = new Item(this.name, 'doorkey3', images.igreencube);
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