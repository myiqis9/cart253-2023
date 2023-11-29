class PDoorKey extends Puzzle {
    //separate class for the door, since it has a lot going on, and is also the endgame
    //it basically can hold an item that you can take back by clicking on it again
    //it also needs a target item to get to final combination right

    constructor(name, x, y, w, h, shape, img, target) {
        super(name, x, y, w, h, shape, img);
        this.target = target;
        this.hasTarget = false;
        this.itemInteracted = false;
        this.item = null;
    }

    interact() {
        if(this.itemInteracted) {
            this.item = activeItem;
            this.itemInteracted = false;
            this.checkDoorCombination();
        }
    }

    checkMousePressed() {
        if(this.item != null) {
            let added = false;
            added = this.item.addToInventory();
            if(added) this.item = null;
        }
    }

    checkDoorCombination() {
        let solved = true;

        for(let key of keyslots) {
            if(key.item === null || key.item.name !== this.target) {
                solved = false;
                break;
            }
        }

        if(solved) ending(); //GAME WON WOO
    }

    display() {
        if(this.item != null) {
            switch(this.item.name) {
                case 'redcube': image(images.redin, this.x, this.y);
                break;
                case 'bluecube': image(images.bluein, this.x, this.y);
                break;
                case 'yellowcube': image(images.yellowin, this.x, this.y);
                break;
                case 'greencube': image(images.greenin, this.x, this.y);
                break;
            }
        }
    }
}