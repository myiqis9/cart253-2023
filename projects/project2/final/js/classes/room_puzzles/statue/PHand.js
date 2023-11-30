class PHand extends Puzzle {
    //where hand will be placed on statue to start the flow of blood

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);

        this.itemInteracted = true; //has hand been placed?
        this.displayHand = false;
        this.interval = null; //setinterval
        this.count = 0; //interval counter
        
        //these are all images that will be cached for the statue
        this.blood1 = images.blood1;
        this.blood2 = images.blood2;
        this.blood3 = images.blood3;
    }

    interact() {
        if(this.itemInteracted) {
            //start interval for the blood to pour
            canClick = false;
            this.displayHand = true;
            this.interval = setInterval(this.bloodpour.bind(this), 1500)
        }
    }

    bloodpour() {
        this.count++;
        print(this.count);

        if(this.count === 3) {
            let blood = new PBlood('blood', 290, height/2-62, 169, 369, 'rect', images.blood3);
            activeScene.puzzleArray.push(blood);
            canClick = true;
            this.itemInteracted = false;
            clearInterval(this.interval);
        }
    }

    display() {
        //only display hand once its added
        if(this.displayHand) image(this.img, this.x, this.y, this.width, this.height);

        //every tick of the counter, add next image from the animation
        if(this.count === 1) image(this.blood1, 290, height/2-62, 169, 369);
        if(this.count === 2) image(this.blood2, 290, height/2-62, 169, 369);
    }
}