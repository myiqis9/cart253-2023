class PFill extends Puzzle {
    //this object needs an item to be interacted with

    constructor(name, x, y, w, h, shape, img, imgInteracted) {
        super(name, x, y, w, h, shape, img);
        this.imgInteracted = imgInteracted;
        this.itemInteracted = false;
    }

    interact() {
        if(this.itemInteracted && this.img != this.imgInteracted) this.img = this.imgInteracted; 
    }

    display() {
        super.display();
    }
}