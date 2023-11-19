class Puzzle {
    constructor(name, x, y, w, h, img, imgInteracted) {
        this.name = name; //id purposes
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.size = (w+h)/2;

        //this.revealsObject = revealsObject; //does this object reveal another hidden object underneath?

        //interaction
        this.mouseHover = false; //is mouse on object?
        this.img = img; //image
        this.imgInteracted = imgInteracted; //if object changes when interacted with, otherwise keep null
    }

    checkMousePressed() {
        if(this.mouseHover) this.interact();
    }

    interact() {
        //object is interacted with
        if(this.imgInteracted !== null && this.img !== this.imgInteracted) this.img = this.imgInteracted;
        //if(this.revealsObject) this.revealObject();
        if(this.movesScenes) this.moveScene();
    }

    revealObject() {
        let newInt;
        //depending on which interactible it is, add appropriate hidden interactible to current scene
        switch(this.name) {
            case `box`:
                newInt = new Puzzle(`goldkey`, this.x, this.y-25, 50, 50, 
                true, false, false, false, images.goldkey, null);
            break;
        }
        //set revealsObject as false so it doesn't repeat this next time it's interacted with
        activeScene.puzzleArray.push(newInt);
        this.revealsObject = false;
    }

    display() {
        print("displaying");
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}