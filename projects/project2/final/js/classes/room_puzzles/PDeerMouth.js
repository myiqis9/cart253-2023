class PDeerMouth extends Puzzle {
    //separate class because it has a little timer before revealing the cube
    //interact reveals item then creates timer to reveal another item, similar to statue hand

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);

        this.itemInteracted = false;
        this.timeout = null; //settimeout
    }

    interact() {
        if(this.itemInteracted) {
            canClick = false;
            //play sound?
            this.timeout = setTimeout(() => {
                let emptycube = new PItem('emptycube', width/2-23, height/2+16, 84, 41, 'rect', images.emptycube)
                activeScene.puzzleArray.push(emptycube);
                canClick = true;
            }, 1000);
        }
    }

    display() {
        if(this.itemInteracted) image(this.img, this.x, this.y, this.width, this.height);
    }
}