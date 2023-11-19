class InventorySlot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hasItem = false; //does this slot have an item?
        this.item = null; //item inside slot
        this.mouseHover = false; //is mouse hovering slot?
        this.size = 65;
    }

    checkMousePressed() {
        if(this.mouseHover && this.hasItem) {
            activeItem = this.item;
            activeItem.isDragged = true;
            checkDragging();
        }
    }

    add(item) {
        //adds item to slot
        this.hasItem = true;
        this.item = item;
        item.x = this.x;
        item.y = this.y;
    }

    empty() {
        //empty a slot of an item
        this.hasItem = false;
        this.item = null;
    }

    swap(drop) {
        if(drop.hasItem) {
            this.add(drop.item);
            drop.add(activeItem);
            print(`swapped items`);
        }
        else {
            this.empty();
            drop.add(activeItem);
            print(`moved item`);
        }
    }

    display() {
        push();
        fill(75, 15, 10);
        stroke(95, 25, 25);
        strokeWeight(2);
        rect(this.x, this.y, this.size);
        pop();
    }
}