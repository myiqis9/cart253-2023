class PHand extends Puzzle {
    //where hand will be placed on statue to start the flow of blood

    constructor(x, y, w, h, shape, img) {
        super('hand', x, y, w, h, shape, img);

        this.itemInteracted = false; //has hand been placed?
        this.displayHand = false; //is hand displaying?
        
        //all images that will be cached for the statue animation
        this.blood1 = images.blood1;
        this.blood2 = images.blood2;
        this.blood3 = images.blood3;
    }

    interact() {
        if(this.itemInteracted) {
            //start interval for the blood to pour
            canClick = false;
            this.displayHand = true;
            audio.sfx.pour.play(); //play pour sound
            interval = setInterval(this.bloodpour.bind(this), 1000);
        }
    }

    //blood pouring animation
    bloodpour() {
        counter++;
        print(counter);

        //final counter adds the blood puzzle that player can react with and ends animation
        if(counter === 3) {
            let blood = new PBlood(289, height/2+28, 169, 369, 'rect', images.blood3);
            activeScene.puzzleArray.push(blood);
            canClick = true;
            this.itemInteracted = false;
            counter = 0;
            clearInterval(interval);
        }
    }

    display() {
        //only display hand once its added
        if(this.displayHand) image(this.img, this.x, this.y, this.width, this.height);

        //every tick of the counter, add next image from the animation
        if(counter === 1) image(this.blood1, 289, height/2+28, 169, 369);
        if(counter === 2) image(this.blood2, 289, height/2+28, 169, 369);
    }
}