class PZoom extends Puzzle {
    //interacting with this object moves you to another scene

    constructor(name, x, y, w, h, shape, img, imgInteracted) {
        super(name, x, y, w, h, shape, img, imgInteracted);
    }

    interact() {
        super.interact();
        this.moveScene();
    }

    moveScene() {
        switch(this.name) {
            case `safe`:
                activeScene = sc10;
            break;
        }
    }

    display() {
        super.display();
    }
}