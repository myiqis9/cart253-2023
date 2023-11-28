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
                newItem = new Item(this.name, 'doorkey', images.igreencube);
                newItem.addToInventory();
                break;
            case 'bluecube':
                newItem = new Item(this.name, 'doorkey', images.ibluecube);
                newItem.addToInventory();
                break;
            case 'yellowcube':
                newItem = new Item(this.name, 'doorkey', images.iyellowcube);
                newItem.addToInventory();
                break;
            case 'emptycube':
                newItem = new Item(this.name, 'blood', images.iemptycube);
                newItem.addToInventory();
                break;
            case 'paper':
                newItem = new Item(this.name, 'painting', images.ipaper);
                newItem.addToInventory();
                break;
            case 'goldkey':
                newItem = new Item(this.name, 'goldchest', images.igoldkey);
                newItem.addToInventory();
                break;
            case 'knife': 
                newItem = new Item(this.name, 'deadbird', images.iknife);
                newItem.addToInventory();
                break;
        }

        //remove interactible object from scene
        for(let i = 0; i < activeScene.puzzleArray.length; i++) {
            if(activeScene.puzzleArray[i].name === this.name) 
            activeScene.puzzleArray.splice(i, 1);
        }
    }
}