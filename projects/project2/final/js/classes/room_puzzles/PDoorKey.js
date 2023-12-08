class PDoorKey extends Puzzle {
    //separate class for the door, since it has a lot going on, and is also the endgame
    //it basically can hold an item that you can take back by clicking on it again
    //it also needs a target item to get to final combination right

    constructor(x, y, w, h, shape, img, target) {
        super('doorkey', x, y, w, h, shape, img);
        this.target = target;
        this.hasTarget = false;
        this.itemInteracted = false; //only set true when item interacts - clicking does nothing
        this.item = null;
    }

    //
    interact() {
        if(this.itemInteracted) {
            this.insertCube();
            this.itemInteracted = false;
            this.checkDoorCombination();
        }
    }

    insertCube() {
        if(this.item != null) {
            let added;
            added = this.item.addToInventory();
            if(added) this.item = activeItem;
        }
        else this.item = activeItem;
    }

    checkMousePressed() {
        if(this.mouseHover && canClick && this.item != null) {
            let added = false;
            added = this.item.addToInventory();
            if(added) this.item = null;
        }
    }

    checkDoorCombination() {
        let solved = true;

        for(let key of keyslots) {
            if(key.item == null || key.item.name !== key.target) {
                solved = false;
                break;
            }
        }
        if(solved) {
            canClick = false;
            interval = setInterval(cutscene, 300);
            audio.sfx.door.play(); //door open sound
            manager.state = 'ending';
        }
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