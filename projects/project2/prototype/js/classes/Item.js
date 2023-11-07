class Item {
    constructor(name, x, y, interactsWith) {
        this.name = name; //id purposes
        this.x = x;
        this.y = y;
        this.interactsWith = interactsWith; //string of interactable that item interacts with
        this.isDragged = false; //is item being dragged?
        this.img = null; //image
        this.size = 50;
    }

    interacted() {
        for(let slot of inventory) {
            if(slot.item.name === this.name) slot.empty(this);
        }
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}