class PBlood extends Puzzle {
    //unique because it takes an item and gives you an item and thats it

    constructor(x, y, w, h, shape, img) {
        super('blood', x, y, w, h, shape, img);
        this.itemInteracted = false; //has cube?
    }

    interact() {
        if(this.itemInteracted) {
            //turns the empty cube red when interacted with!
            let redCube = new Item('redcube', 'doorkey', images.iredcube);
            redCube.addToInventory();
            this.itemInteracted = false;
        }
    }
}