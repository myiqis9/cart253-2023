class AIPaddle {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.x = 0;
        this.y = this.height/2;
    }

    move() {
        //AI paddle follows active ball
        this.x = mouseX;
    }

    display() {
        push();
        rectMode(CENTER);
        fill(255);
        stroke(255, 0, 0);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }
}