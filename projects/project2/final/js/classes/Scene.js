class Scene {
    constructor(id, puzzleArray, previous) {
        this.id = id;
        this.puzzleArray = puzzleArray; //array of all interactable items in that scene
        this.previous = previous; //if scene is within another scene, this leads back to previous. if not, default null
    }

    display() {
        //in order: room1, room2, room3, room4,
        //zoomDoor, zoomCupboard, zoomStatue, zoomDeer, zoomRadio, zoomSafe, zoomSafeOpen, ZoomWindow
        background(70, 50, 50);

        switch(this.id) {
            //display whatever is needed in the background && relevant arrow(s)
            case 1: case 2: case 3: case 4:
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

                arrows[0].active = true;
                arrows[1].active = true;
                arrows[2].active = false;
                break;
            case 5: case 6: case 7: case 8: case 11: case 12:
                for(let puzzle of this.puzzleArray) puzzle.display();
                
                arrows[0].active = false;
                arrows[1].active = false;
                arrows[2].active = true;
                break;
            case 9: 
                //radio TD
                break;
            case 10:
                for(let puzzle of this.puzzleArray) puzzle.display();
                for(let lock of locks) lock.display(); //locks must be displayed after puzzles

                arrows[0].active = false;
                arrows[1].active = false;
                arrows[2].active = true;
                break;
        }
    }
}