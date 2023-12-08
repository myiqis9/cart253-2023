class Arrow {
    constructor(position, x, y, img) {
        this.position = position;
        this.x = x;
        this.y = y;
        this.active = false;
        this.mouseHover = false;
        this.img = img;
        this.size = 55;
    }

    checkMousePressed() {
        if(this.mouseHover && this.active && canClick) {
            this.clicked();
            cooldown();
        }
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
        print(`clicked ${this.position} newID: ${newScene.id}`);
        this.checkBGM(newScene.id);
        activeScene = newScene;
    }

    checkBGM(room) {
        let drywet;
      
        switch(room) {
          case 1: drywet = 1;
          break;
          case 2: case 4: drywet = 0.55;
          break;
          case 3: drywet = 0.25;
          break;
        }
        audio.setSound(drywet);
    }

    display() {
        push();
        image(this.img, this.x, this.y, this.size, this.size);
        pop();
    }
}