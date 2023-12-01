class Lock {
    constructor(target, x, y) {
        this.target = target;
        this.x = x;
        this.y = y;
        this.num = 0;
        this.size = 45;

        //values for the arrows that move values up or down
        this.arrowDownY = this.y+40;
        this.arrowUpY = this.y-40;
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
        if(this.direction !== null && canClick) {
            this.clicked();
            cooldown();
        }
    }

    clicked() {
        if(this.direction === `up`) this.num++;
        else if(this.direction === `down`) this.num--;
        if(this.num > 9) this.num = 0;
        if(this.num < 0) this.num = 9;

        this.checkLockCombination();
    }

    //correct combination: 3719
    checkLockCombination() {
        let solved = true;
    
        //checks if all locks are correct, if any one of them isnt then turn solved to false
        for(let lock of locks) {
            if(lock.num !== lock.target) {
                solved = false;
                break;
            }
        }
    
        if(solved) {
            safe.open = true;
            safe.interact();
            //play sound?
        }
    }

    display() {
        push();
        fill(255);
        noStroke();
        rect(this.x, this.y, this.size-7, this.size, 5);

        triangle(this.x-12, this.arrowDownY-10, this.x, this.arrowDownY+10, this.x+12, this.arrowDownY-10);
        triangle(this.x-12, this.arrowUpY+10, this.x, this.arrowUpY-10, this.x+12, this.arrowUpY+10);

        fill(0);
        textSize(22);
        textFont(lcd);
        text(this.num, this.x+2, this.y+8);
        pop();
    }
}