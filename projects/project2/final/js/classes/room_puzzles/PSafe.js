class PSafe extends Puzzle {
    //unique class for safe, since it has a unique zoom

    constructor(x, y, w, h, shape, img) {
        super('safe', x, y, w, h, shape, img);
        this.open = false;
    }

    //if safe is open, display the open safe scene (without the lock numbers)
    interact() {
        if(this.open) {
            activeScene = sc11;
        }
        else activeScene = sc10;
    }
}