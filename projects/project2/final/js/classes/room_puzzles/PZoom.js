class PZoom extends Puzzle {
    //interacting with this object moves you to another scene

    constructor(name, x, y, w, h, shape, img) {
        super(name, x, y, w, h, shape, img);
    }

    //sets activeScene to what scene the object zooms to
    interact() {
        switch(this.name) {
            case 'door':
                activeScene = sc5;
                break;
            case 'cupboard':
                activeScene = sc6;
                break;
            case 'statue':
                activeScene = sc7;
                break;
            case 'deertaxidermy':
                activeScene = sc8;
                break;
            case 'radiodrawer':
                activeScene = sc9;
                break;
            case 'window':
                activeScene = sc12;
                break;
        }
    }
}