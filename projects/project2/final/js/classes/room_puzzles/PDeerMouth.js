class PDeerMouth extends Puzzle {
    //separate class because it has a little timer before revealing the cube
    //interact reveals item then creates timer to reveal another item, similar to statue hand

    constructor(x, y, w, h, shape, img) {
        super('deermouth', x, y, w, h, shape, img);

        this.itemInteracted = false;
        this.hasMouth = false;
        this.timeout = null; //settimeout
    }

    interact() {
        if(this.itemInteracted && !this.hasMouth) {
            canClick = false;
            audio.sfx.clang.play(); //clang sound
            this.timeout = setTimeout(() => {
                let emptycube = new PItem('emptycube', width/2-23, height/2+16, 84, 41, 'rect', images.emptycube)
                activeScene.puzzleArray.push(emptycube);
                this.hasMouth = true;
                canClick = true;
            }, 1000);
        }
    }

    display() {
        if(this.itemInteracted) image(this.img, this.x, this.y, this.width, this.height);
    }
}