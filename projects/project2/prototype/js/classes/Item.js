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
            if(slot.hasItem && slot.item.name === this.name) slot.empty();
        }
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }

    addToInventory() {
        for(let slot of inventory) {
            if(!slot.hasItem) {
                slot.add(this);
                break;
            }
        }
    }

    checkInteraction() {
        for(let int of activeScene.puzzleArray) {
            let d = dist(int.x, int.y, this.x, this.y);
        
            if (d < this.size / 2 && this.interactsWith === int.name) {
                int.interact();
                this.interacted();
                activeItem = null;
                break;
            }
        }
    }

    checkMouseReleased() {
        let tempSlot;
        for(let slot of inventory) {
            if(slot.item === this) {
                tempSlot = slot;
                break;
            }
        }
    
        //if activeItem is dropped onto another slot, swap slots
        //else drop it back to its original slot
        for(let dropSlot of inventory) {
            if(dropSlot.mouseHover) {
                tempSlot.swap(dropSlot);
                break;
            }
            else tempSlot.add(this);
        }
        activeItem = null;
    }
}