class InventorySlot {
    constructor(x, y) {
        this.id = slotID; //id purposes? might not be needed
        this.x = x;
        this.y = y;
        this.hasItem = false; //does this slot have an item?
        this.item = null; //item inside slot
        this.mouseHover = false; //is mouse hovering slot?
        this.size = 65;
    }

    add(item) {
        //adds item to slot
        this.hasItem = true;
        this.item = item;
        item.x = this.x;
        item.y = this.y;
    }

    empty(item) {
        //empty a slot of an item
        this.hasItem = false;
        this.item = null;
        item.x = 0;
        item.y = 0;
    }

    display() {
        push();
        fill(255);
        noStroke();
        rect(this.x, this.y, this.size);
        pop();
    }
}