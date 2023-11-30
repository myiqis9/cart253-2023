class PReveal extends Puzzle {
    //this object needs an item to be interacted with AND reveals objects once interacted

    constructor(name, x, y, w, h, shape, img, imgInteracted) {
        super(name, x, y, w, h, shape, img);
        this.imgInteracted = imgInteracted;
        this.itemInteracted = false;
    }

    interact() {
        if(this.itemInteracted) {
            this.img = this.imgInteracted;
            this.revealItem();
        } 
    }

    revealItem() {
        //depending on what it is, add appropriate hidden object to current scene
        switch(this.name) {
            case 'goldchest':
                let redkey = new PItem('redkey', width/2+10, height/2+130, 70, 26, 'rect', images.redkey);
                activeScene.puzzleArray.push(redkey);
                break;
            case 'radio':
                let goldkey = new PItem('goldkey', this.x, this.y+8, 71, 12, 'rect', images.goldkey);
                activeScene.puzzleArray.push(goldkey);
                break;
            case 'reddrawer':
                let bluecube = new PItem('bluecube', this.x-10, this.y-16, 57, 55, 'rect', images.bluecube);
                let deermouth = new PItem('deermouth', this.x+55, this.y-2, 119, 50, 'rect', images.deermouth1);
                activeScene.puzzleArray.push(bluecube, deermouth);
                break;
            case 'bluedrawer':
                let hand = new PItem('hand', this.x-27, this.y+84, 207, 75, 'rect', images.hand);
                activeScene.puzzleArray.push(hand);
                break;
        }
        //set itemInteracted false so this doesn't repeat
        this.itemInteracted = false;
    }
}