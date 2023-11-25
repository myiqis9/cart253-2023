class Scene {
    constructor(id, name, puzzleArray, previous) {
        this.id = id;
        this.name = name; //id purposes
        this.puzzleArray = puzzleArray; //array of all interactable items in that scene
        this.previous = previous; //if scene is within another scene, this leads back to previous. if not, default null
    }

    display() {
        //in order: room1, room2, room3, room4,
        //zoomDoor, zoomCupboard, zoomStatue, zoomDeer, zoomRadio, zoomSafe, zoomSafeOpen, ZoomWindow
        background(70, 50, 50);
        print(`scene ${this.name}`);

        switch(this.name) {
            //display whatever is needed in the background && relevant arrow(s)
            case 'room1': case 'room2': case 'room3': case 'room4':
                push();
                fill(25);
                stroke(10);
                strokeWeight(5);
                rect(width/2, height/2+250, 600, 300);
                fill(70, 50, 50);
                quad(-5, 510, 28, 400, 28, -5, -5, -5);
                quad(width+5, 510, width-28, 400, width-28, -5, width+5, -5);
                pop();

                for(let puzzle of this.puzzleArray) puzzle.display(); //display all objects in scene

                leftArrow.active = true;
                rightArrow.active = true;
                downArrow.active = false;
            break;
            case 'zoomDoor': case 'zoomCupboard': case 'zoomStatue': case 'zoomDeer': case 'zoomSafeOpen': case 'zoomWindow':
                for(let puzzle of this.puzzleArray) puzzle.display();
                
                leftArrow.active = false;
                rightArrow.active = false;
                downArrow.active = true;
            break;
            case 'zoomSafe':
                for(let puzzle of this.puzzleArray) puzzle.display();
                for(let lock of locks) lock.display(); //locks must be displayed after puzzles

                leftArrow.active = false;
                rightArrow.active = false;
                downArrow.active = true;
            break;
        }

        for(let puzzle of this.puzzleArray) puzzle.display(); //display all objects in scene
    }
}