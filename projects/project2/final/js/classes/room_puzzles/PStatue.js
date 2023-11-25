class Statue extends Puzzle {
    //unique class for statue, since it has a lot going on

    constructor(name, x, y, w, h, shape, img, img2, img3, hand, blood1, blood2, blood3) {
        super(name, x, y, w, h, shape, img);
        this.img2 = img2;
        this.img3 = img3;
        this.hand = hand;
        this.blood1 = blood1;
        this.blood2 = blood2;
        this.blood3 = blood3;
        //these are all images that will be cached for the statue

        this.itemInteracted = false; //true if arm interacts;
        this.armX = null; //where player needs to interact for arm / where arm will be placed
        this.armY = null;
        this.counter = 0;
        this.bloodpour = null; //setinterval
    }

    interact() {
        if(activeScene.id === 2) activeScene = sc7;
        else if(activeScene.id === 7) this.zoomed();
    }

    zoomed() {
        if(this.itemInteracted) {
            //add arm to statue
            let placedHand = new Puzzle('placedHand', armX, armY, 146, 322, 'rect', hand);
            sc7Array.push(placedHand);

            //start interval for the blood to pour
            this.bloodpour = setInterval(blood, 1500);
        }
    }

    blood() {
        counter++;
        //this starts the counter at 1, so do nothing until 2
        if(counter === 2) image(this.blood1, null, null, null, null);
        if(counter === 3) image(this.blood2, null, null, null, null);
        if(counter === 4) {
            let blood = new PBlood(); //TD create class
            sc7Array.push(blood);
        }
        if(counter === 5) image(this.blood1, null, null, null, null);
    }

    display() {
        if(activeScene.id === 2) {
            if(this.iteminteracted) image(this.img2, this.x, this.y, this.width, this.height);
            else image(this.img, this.x, this.y, this.width, this.height);
        }
        else if(activeScene.id === 7) {
            image(this.img3, 300, 257, 600, 511);
        }
    }
}