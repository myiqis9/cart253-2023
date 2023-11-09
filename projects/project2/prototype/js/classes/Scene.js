class Scene {
    constructor(id, name, intArray, previous) {
        this.id = id;
        this.name = name; //id purposes
        this.intArray = intArray; //array of all interactable items in that scene
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
                print(`safe displaying`);
                push();
                background(95, 25, 25);
                pop();

                leftArrow.active = false;
                rightArrow.active = false;
                downArrow.active = true;
            break;
        }

        for(let int of this.intArray) {
            int.display(); //display all interactables in the scene
        }
    }
}