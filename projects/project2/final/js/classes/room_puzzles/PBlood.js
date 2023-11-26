class PBlood extends Puzzle {
    //unique because it takes an item and gives you an item and thats it

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);
    }

    interact() {
        //depending on which object it is, create and add appropriate item to inventory
        print(`adding ${this.name} to inventory`);

        let redCube = new Item('redcube', 'doorkey2', images.iredcube);
        redCube.addToInventory();
    }

    display() {
        super.display();
    }
}