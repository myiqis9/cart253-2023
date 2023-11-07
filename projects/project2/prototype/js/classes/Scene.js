class Scene {
    constructor(name, intArray, previous) {
        this.name = name; //id purposes
        this.intArray = intArray; //array of all interactable items in that scene
        this.previous = previous; //if scene is within another scene, this leads back to previous. if not, default null
    }

    display() {
        //TD display scene
        switch(this.name) {
            //depending on scene name, display whatever is needed in the background && relevant arrow(s)
        }

        for(let int of this.intArray) {
            int.display(); //display all interactables in the scene
        }
    }
}