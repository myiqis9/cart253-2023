class PFill extends Puzzle {
    //this object needs an item to be interacted with

    constructor(name, x, y, w, h, shape, img, imgInteracted) {
        super(name, x, y, w, h, shape, img);
        this.imgInteracted = imgInteracted;
    }

    interact() {}
}