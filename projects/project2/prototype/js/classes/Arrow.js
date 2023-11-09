class Arrow {
    constructor(position, x, y, img) {
        this.position = position;
        this.x = x;
        this.y = y;
        this.active = false;
        this.mouseHover = false;
        this.img = img;
        this.size = 50;
    }

    clicked() {
        let newID = activeScene.id;
        let newScene;

        switch(this.position) {
            case `left`:
                newID--;
                if(newID < 1) newID = 4;
                for(let scene of scenes) if(scene.id === newID) newScene = scene;
            break;
            case `right`: 
                newID++;
                if(newID > 4) newID = 1;
                for(let scene of scenes) if(scene.id === newID) newScene = scene;
            break;
            case `down`: newScene = activeScene.previous;
            break;
        }
        print(`clicked ${this.position} newID: ${newID}`);
        activeScene = newScene;
    }

    display() {
        push();
        image(this.img, this.x, this.y);
        pop();
    }
}