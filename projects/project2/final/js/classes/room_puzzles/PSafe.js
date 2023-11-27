class PSafe extends Puzzle {
    //unique class for safe, since it has two images and a zoom

    constructor(name, x, y, w, h, shape, img, imgInteracted) {
        super(name, x, y, w, h, shape, img);
        this.imgInteracted = imgInteracted;
        this.open = false;
    }

    interact() {
        if(this.open) {
            if(this.img !== this.imgInteracted) this.img = this.imgInteracted;
            activeScene = sc11;
        }
        else activeScene = sc10;
    }
}