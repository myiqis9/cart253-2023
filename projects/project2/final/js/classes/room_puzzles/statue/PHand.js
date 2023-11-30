class PHand extends Puzzle {
    //where hand will be placed on statue to start the flow of blood

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);

        this.itemInteracted = false; //has hand been placed?
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
            this.interval = setInterval(this.bloodpour, 1500);
        }
    }

    bloodpour() {
        this.count++;
        print(this.count);

        if(this.count === 3) {
            let blood = new PBlood('blood', this.x, this.y, 167, 366, 'rect', images.blood3);
            activeScene.puzzleArray.push(blood);
            canClick = true;
            clearInterval(this.bloodpour);
        }
    }

    display() {
        //every tick of the counter, add next image from the animation
        if(this.count === 1) image(this.blood1, this.x, this.y, 83, 122);
        if(this.count === 2) image(this.blood2, this.x, this.y, 92, 216);

        //only display hand once its added
        if(this.itemInteracted) image(this.img, this.x, this.y, this.width, this.height);
    }
}