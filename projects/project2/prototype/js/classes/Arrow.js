class Arrow {
    constructor(position, x, y) {
        this.position = position;
        this.x = x;
        this.y = y;
        this.active = false;
        this.image = null;
    }

    clicked(position) {
        switch(position) {
            case `left`:
                if(activeScene === 0) activeScene = 3;
                else activeScene--;
            break;
            case `right`: 
                if(activeScene === 3) activeScene = 0;
                else activeScene++;
            break;
            case `down`:
                let newScene = scenes[activeScene].previous; //TD CHANGE THIS ITS PLACEHOLDER IT WONT WORK!
                activeScene = newScene;
            break;
        }
    }

    display() {
        push();

        pop();
    }
}