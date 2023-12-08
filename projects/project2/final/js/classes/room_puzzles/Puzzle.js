class Puzzle {
    //universal class for all puzzles

    constructor(name, x, y, w, h, shape, img) {
        this.name = name; //id purposes
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.shape = shape; //'rect' = rectangular, 'round' = circle;
        this.size = (w+h)/2;
        this.mouseHover = false; //is mouse on object?
        this.img = img; //image
    }

    //for all puzzle objects: checking is mouse was clicked makes their interact() happen, then sets a small cooldown
    checkMousePressed() {
        if(this.mouseHover && canClick) {
            this.interact();
            cooldown();
        }
    }

    interact() {} //placeholder for other extended classes to use


    //universal display for puzzle objects
    display() {
        push();
        image(this.img, this.x, this.y, this.width, this.height);
        pop();
    }
}