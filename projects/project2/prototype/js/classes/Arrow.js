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
        print(`clicked ${this.position}`);
        let newScene;

        switch(this.position) {
            case `left`:
                if(activeScene.name === `room1`) {
                    for(let scene of scenes) if(scene.name === `room4`) newScene = scene;
                }
                if(activeScene.name === `room2`) {
                    for(let scene of scenes) if(scene.name === `room1`) newScene = scene;
                }
                if(activeScene.name === `room3`) {
                    for(let scene of scenes) if(scene.name === `room2`) newScene = scene;
                }
                if(activeScene.name === `room4`) {
                    for(let scene of scenes) if(scene.name === `room3`) newScene = scene;
                }
            break;
            case `right`: 
            if(activeScene.name === `room1`) {
                for(let scene of scenes) if(scene.name === `room2`) newScene = scene;
            }
            if(activeScene.name === `room2`) {
                for(let scene of scenes) if(scene.name === `room3`) newScene = scene;
            }
            if(activeScene.name === `room3`) {
                for(let scene of scenes) if(scene.name === `room4`) newScene = scene;
            }
            if(activeScene.name === `room4`) {
                for(let scene of scenes) if(scene.name === `room1`) newScene = scene;
            }
            break;
            case `down`: newScene = activeScene.previous;
            break;
        }
        activeScene = newScene;
    }

    display() {
        push();
        image(this.img, this.x, this.y);
        pop();
    }
}