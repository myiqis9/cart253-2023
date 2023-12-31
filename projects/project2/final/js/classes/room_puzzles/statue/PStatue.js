class PStatue extends Puzzle {
    //unique class for statue, since it changes its look once the hand is interacted with!

    constructor(x, y, w, h, shape, img, img2, img3) {
        super('statue', x, y, w, h, shape, img);
        this.img2 = img2;
        this.img3 = img3;
    }

    //zoom to the other statue if in the main room
    interact() {
        if(activeScene.id === 2) activeScene = sc7;
    }

    //if room 2 display statue depending on if the blood spilled or not
    //if in zoom display zoom statue
    display() {
        if(activeScene.id === 2) {
            if(hand.displayHand) image(this.img2, this.x, this.y, this.width, this.height);
            else image(this.img, this.x, this.y, this.width, this.height);
        }
        else if(activeScene.id === 7) {
            image(this.img3, 300, 257, 600, 511);
        }
    }
}