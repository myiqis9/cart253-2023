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
                print(`${this.name} displaying`);

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
            case `zoom1`:
                print(`zoom 1 displaying`);

            break;
            case `zoom2`:
                print(`zoom 2 displaying`);

            break;
            case `zoom3`:
                print(`zoom 3 displaying`);

            break;
            case `zoom4`:
                print(`zoom 4 displaying`);

            break;
            case `zoom5`:
                print(`zoom 5 displaying`);

            break;
        }

        for(let int of this.intArray) {
            int.display(); //display all interactables in the scene
        }
    }
}