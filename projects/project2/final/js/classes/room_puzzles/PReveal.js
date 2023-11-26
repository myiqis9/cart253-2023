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
                //add key
            break;
        }
        //activeScene.puzzleArray.push();

        //set itemInteracted false so this doesn't repeat
        this.itemInteracted = false;
    }

    display() {
        super.display();
    }
}