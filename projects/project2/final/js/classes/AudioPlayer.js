class AudioPlayer {
    constructor() {
        //bgm and radio effects
        this.bgm = null;
        this.reverb = null;
        this.noise = null;

        //sound effects
        this.sfx = {};
        this.sounds = ['clang', //by daboy291 on freesound.org
        'click', //by thewilliamsounds on freesound.org
        'creak', 'pour', //by inspectorj on freesound.org
        'unlock', //by ubehag on freesound.org
        'radio', //by thegoose09 on freesound.org
        'tear', //by richerlandtv on freesound.org
        'beep', //by splicesound on freesound.org
        'door' ]; //by angelkunev on freesound.org
    }

    preload() {
        //load sounds
        this.bgm = loadSound('assets/sounds/satie.mp3'); //Gnossienne 1, 2, 3, 4 by Erik Satie

        //preload all sounds by adding them to sound array
        for(let sound of this.sounds) {
            this.sfx[sound] = loadSound(`assets/sounds/${sound}.mp3`);
        } //thanks again Pippin :)
    }

    //background music - reverbrating Gnossiennes by Erik Satie, with brown noise for radio static effect
    createBGM() {
        this.reverb = new p5.Reverb();
        this.noise = new p5.Noise('brown');
        
        this.bgm.disconnect(); // so we'll only hear reverb...
      
        //connect soundFile to reverb, reverbTime, decayRate
        this.reverb.process(this.bgm, 7, 20);
        this.setSound(1);
    }

    //this sets how loud the background music is. to be used when switching from scene to scene
    setSound(drywet) {
        //strength of reverb (this is what will be modified!)
        this.reverb.amp(1.4-drywet);
        this.reverb.drywet(drywet);
        this.noise.amp(0.042-(drywet/20));
    }

    //play bgm when game starts
    playBGM() {
        this.bgm.play();
        this.noise.start();
    }
}