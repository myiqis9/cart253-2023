class PButton extends Puzzle {
    //radio buttons. players need to turn all buttons red for the puzzle to be solved

    constructor(x, y, prev, next) {
        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;

        //buttons to the left and right of it
        this.prev = prev;
        this.next = next;
        this.active = false;
        this.completed = false;
    }

    interact() {
        if(canClick && !this.completed) {
            this.switch();
            if(prev !== null) this.prev.switch();
            if(next !== null) this.next.switch();
        }
    }

    switch() {
        if(this.active) this.active = false;
        else this.active = true;
        this.checkAllActive();
    }

    checkAllActive() {
        let solved = true;
    
        //checks if all buttons are active, if any one of them isnt then turn solved to false
        for(let btn of buttons) {
            if(!btn.active) {
                solved = false;
                break;
            }
        }
    
        //if puzzle is solved, make it static and reveal key from radio
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
}