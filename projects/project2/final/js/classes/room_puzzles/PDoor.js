class PDoor extends Puzzle {
    //separate class for the door, since it has a lot going on, and is also the endgame

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);
        this.open = false;
    }
}