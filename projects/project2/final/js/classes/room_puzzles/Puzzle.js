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

    interact() {}

    display() {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}