class Item {
    constructor(name, interactsWith, img) {
        this.name = name; //id purposes
        this.x = null;
        this.y = null;
        this.interactsWith = interactsWith; //string of interactable that item interacts with
        this.isDragged = false; //is item being dragged?
        this.img = img; //image
        this.size = 60;
    }

    interacted() {
        for(let slot of inventory) {
            if(slot.hasItem && slot.item.name === this.name) slot.empty(this);
        }
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}