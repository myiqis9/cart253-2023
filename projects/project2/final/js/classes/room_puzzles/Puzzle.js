class Puzzle {
    constructor(name, x, y, w, h, shape, img) {
        this.name = name; //id purposes
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.shape = shape; //'rect' = rectangular, 'round' = circle;
        this.size = (w+h)/2;

        //this.revealsObject = revealsObject; //does this object reveal another hidden object underneath?

        //interaction
        this.mouseHover = false; //is mouse on object?
        this.img = img; //image
    }

    checkMousePressed() {
        if(this.mouseHover) this.interact();
    }

    revealObject() {
        let newInt;
        //depending on which interactible it is, add appropriate hidden interactible to current scene
        switch(this.name) {
            case 'box':
                newInt = new Puzzle('goldkey', this.x, this.y-25, 50, 50, 'round', images.goldkey, null);
            break;
        }
        //set revealsObject as false so it doesn't repeat this next time it's interacted with
        activeScene.puzzleArray.push(newInt);
        this.revealsObject = false;
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}