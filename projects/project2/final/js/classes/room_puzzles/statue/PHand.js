class PHand extends Puzzle {
    //where hand will be placed on statue to start the flow of blood

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);

        this.itemInteracted = false; //has hand been placed?
        this.counter = 0; //interval counter
        this.bloodpour = null; //setinterval
        
        //these are all images that will be cached for the statue
        this.blood1 = images.blood1;
        this.blood2 = images.blood2;
        this.blood3 = images.blood3;
    }

    interact() {
        if(this.itemInteracted) {
            //start interval for the blood to pour
            canClick = false;
            this.bloodpour = setInterval(blood, 1500);
        }
    }

    blood() {
        //every tick of the counter, add next image from the animation
        if(counter === 1) image(this.blood1, null, null, null, null);
        if(counter === 2) image(this.blood2, null, null, null, null);
        if(counter === 3) {
            let blood = new PBlood(); //TD
            activeScene.puzzleArray.push(blood);
            canClick = true;
            clearInterval(this.bloodpour);
        }
        counter++;
    }

    display() {
        //only display hand once its added
        if(this.itemInteracted) image(this.img, this.x, this.y, this.width, this.height);
    }
}