class Lock {
    constructor(target, x, y) {
        this.target = target;
        this.x = x;
        this.y = y;
        this.num = 0;
        this.size = 70;

        //values for the arrows that move values up or down
        this.arrowDownY = this.y+40;
        this.arrowUpY = this.y-40;
        this.arrowSize = 60;
        this.direction = null; 
    }

    checkMousePressed() {
        //TD
    }

    clicked() {
        if(this.direction === `up`) this.num++;
        else if(this.direction === `down`) this.num--;
        if(this.num > 9) this.num = 0;
        if(this.num < 0) this.num = 9;
    }

    display() {
        push();
        fill(255);
        noStroke();
        rect(this.x, this.y, this.size-10, this.size);

        triangle(this.x-15, this.arrowDownY, this.x, this.arrowDownY+25, this.x+15, this.arrowDownY);
        triangle(this.x-15, this.arrowUpY, this.x, this.arrowUpY-25, this.x+15, this.arrowUpY);

        fill(0);
        textSize(60);
        text(this.num, this.x, this.y);
        pop();
    }
}