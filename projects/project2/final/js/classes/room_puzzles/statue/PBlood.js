class PBlood extends Puzzle {
    //unique because it takes an item and gives you an item and thats it

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);
    }

    interact() {
        //turns the empty cube red when interacted with!
        let redCube = new Item('redcube', 'doorkey3', images.iredcube);
        redCube.addToInventory();
    }

    display() {
        super.display();
    }
}