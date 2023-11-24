class Lock {
    constructor(target, x, y) {
        this.target = target;
        this.x = x;
        this.y = y;
        this.num = 0;
        this.size = 70;

        //values for the arrows that move values up or down
        this.arrowDownY = this.y+54;
        this.arrowUpY = this.y-54;
        this.arrowSize = 50;
        this.direction = null; 
    }

    checkHover() {
        let dDown = dist(mouseX, mouseY, this.x, this.arrowDownY);
        let dUp = dist(mouseX, mouseY, this.x, this.arrowUpY);
        if(dUp < this.arrowSize / 2) return 'up';
        else if(dDown < this.arrowSize / 2) return 'down';
        else return null;
    }

    checkMousePressed() {
        this.direction = this.checkHover();
        if(this.direction !== null) this.clicked();
    }

    clicked() {
        if(this.direction === `up`) this.num++;
        else if(this.direction === `down`) this.num--;
        if(this.num > 9) this.num = 0;
        if(this.num < 0) this.num = 9;

        checkLockCombination();
    }

    display() {
        push();
        fill(255);
        noStroke();
        rect(this.x, this.y, this.size-10, this.size);

        triangle(this.x-15, this.arrowDownY-14, this.x, this.arrowDownY+14, this.x+15, this.arrowDownY-14);
        triangle(this.x-15, this.arrowUpY+14, this.x, this.arrowUpY-14, this.x+15, this.arrowUpY+14);

        fill(0);
        textSize(60);
        text(this.num, this.x, this.y);
        pop();
    }
}