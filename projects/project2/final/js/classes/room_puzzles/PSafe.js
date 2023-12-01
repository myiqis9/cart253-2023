class PSafe extends Puzzle {
    //unique class for safe, since it has two images and a zoom

    constructor(x, y, w, h, shape, img) {
        super('safe', x, y, w, h, shape, img);
        this.open = false;
    }

    interact() {
        if(this.open) {
            activeScene = sc11;
        }
        else activeScene = sc10;
    }
}