class PButton extends Puzzle {
    //radio buttons. players need to turn all buttons red for the puzzle to be solved

    constructor(id, x, y, prev, next, active) {
        super('button', x, y, 23, 47, 'rect', null);

        this.id = id; //id to find other buttons
        //buttons to the left and right of it
        this.prev = prev;
        this.next = next;
        this.active = active;
        this.completed = false;
    }

    //when clicking a button, it changes its own active state and the one to its left and right
    interact() {
        if(!this.completed) {
            this.switch();
            if(this.prev !== null) buttons[this.prev].switch();
            if(this.next !== null) buttons[this.next].switch();
            audio.sfx.click.play(); //click sound
            this.checkAllActive();
        }
    }

    //switch states
    switch() {
        if(this.active) this.active = false;
        else this.active = true;
    }

    //check all button states
    checkAllActive() {
        let solved = true;
    
        //checks if all buttons are active, if any one of them isnt then turn solved to false
        for(let btn of buttons) {
            if(!btn.active) {
                solved = false;
                break;
            }
        }
    
        //if puzzle is solved, make buttons static and reveal key from radio
        if(solved) {
            for(let btn of buttons) btn.completed = true;
            for(let radio of activeScene.puzzleArray) {
                if(radio.name === 'radio') {
                    radio.itemInteracted = true;
                    radio.interact();
                }
            }
        }
    }

    display() {
        if(this.active) image(images.buttonactive, this.x, this.y, this.width, this.height);
        else image(images.buttoninactive, this.x, this.y, this.width, this.height);
    }
}