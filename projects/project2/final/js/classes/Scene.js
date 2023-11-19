class Scene {
    constructor(id, name, puzzleArray, previous) {
        this.id = id;
        this.name = name; //id purposes
        this.puzzleArray = puzzleArray; //array of all interactable items in that scene
        this.previous = previous; //if scene is within another scene, this leads back to previous. if not, default null
    }

    display() {
        //TD display scene
        switch(this.name) {
            //depending on scene name, display whatever is needed in the background && relevant arrow(s)
            case `room1`: case `room2`: case `room3`: case `room4`:
                push();
                background(100, 100, 210);
                fill(204, 50, 102);
                noStroke();
                rect(width/2, height/2+200, 600, 300);
                pop();

                leftArrow.active = true;
                rightArrow.active = true;
                downArrow.active = false;
            break;
            case `zoomSafe`:
                push();
                background(95, 25, 25);
                pop();

                for(let lock of locks) lock.display();

                leftArrow.active = false;
                rightArrow.active = false;
                downArrow.active = true;
            break;
        }

        for(let puzzle of this.puzzleArray) {
            puzzle.display(); //display all objects in the scene
        }
    }
}