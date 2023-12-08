class GameState {
    constructor() {
        this.state = 'title';
        this.alpha = 255; //for fade ins/outs
    }

    //check game state - this gets called in draw()
    checkState() {
        switch(this.state) {
            case 'title': this.title();
            break;
            case 'opening': this.opening();
            break;
            case 'game': this.game();
            break;
            case 'ending': this.ending();
        }
    }

    //title screen
    title() {
        push();
        fill(255);
        textSize(46);
        textFont(notoita);
        textAlign(CENTER, CENTER);
        text('Escape the room...', width/2, height/2-65);
        textSize(28);
        textFont(noto);
        text('Interact with your surroundings', width/2, height/2+10);
        text('and find a way out!', width/2, height/2+40);
        text('Click anywhere to start.', width/2, height/2+85);
        pop();
    }

    //opening cutscene - cutscene() will be played in interval as this happens, setting the counter
    opening() {
        //display game (to be seen when game fades in)
        this.displayGame();

        //set alpha
        if(counter == 16) this.alpha = 200;
        if(counter == 17) this.alpha = 125;
        if(counter == 18) this.alpha = 65;
        if(counter == 19) {
            this.alpha = 0;
            canClick = true;
            this.state = 'game';
            counter = 0;
            clearInterval(interval);
        }
    
        //display black background fade
        push();
        fill(0, 0, 0, this.alpha);
        noStroke();
        rect(width/2, height/2, width, height);
        pop();
    
        //counter text animation!
        push();
        textAlign(CENTER, CENTER);
        textFont(noto);
        textSize(28);
    
        //sets text color to be 'fading in' one counter before fully displaying
        if(counter == 1 || counter == 15) fill(80);
        if(counter >= 2 && counter < 15) fill(255);
        if(counter >= 1 && counter < 16) text('Where am I...?', width/2, height/2-110);
    
        if(counter == 5 || counter == 15) fill(80);
        if(counter >= 6 && counter < 15) fill(255);
        if(counter >= 5 && counter < 16) text('What is this place?', width/2, height/2-35);
    
        if(counter == 9 || counter == 15) fill(80);
        if(counter >= 10 && counter < 15) fill(255);
        if(counter >= 9 && counter < 16) {
            text('Something tells me...', width/2, height/2+40);
            text('I need to find a way out.', width/2, height/2+75);
            text('And quickly...', width/2, height/2+110);
        }
        pop();
    }

    game() {
        if(activeItem !== null) activeItem.checkInteraction();
        checkHover();
        checkDragging();
        this.displayGame();
    }

    displayGame() {
        rectMode(CENTER);
        imageMode(CENTER);
        textAlign(CENTER, CENTER);
    
        //display active scene and interactables
        activeScene.display();
    
        //display arrows
        for(let arrow of arrows) if(arrow.active) arrow.display();
    
        //inventory background
        this.displayInventoryMenu();
    
        //display inventory & player items (separately, otherwise items won't print on top of other slots when dragged1)
        for(let slot of inventory) slot.display();
        for(let slot of inventory) if(slot.hasItem) slot.item.display();
    }
    
    displayInventoryMenu() {
        push();
        fill(255);
        noStroke();
        rect(width/2, height-40, 600, 96);
        fill(0);
        stroke(70, 20, 15);
        strokeWeight(2);
        rect(width/2, height-44, 390, 86);
        pop();
    }
    
    //ending cutscene - cutscene() will be played in interval as this happens, setting the counter
    ending() { 
        //display game (to be seen while game is fading out)
        this.displayGame();

        //set background alpha
        if(counter == 1) this.alpha = 65;
        if(counter == 2) this.alpha = 125;
        if(counter == 3) this.alpha = 200;
        if(counter == 4) this.alpha = 255;
    
        //display black background fade
        push();
        fill(0, 0, 0, this.alpha);
        noStroke();
        rect(width/2, height/2, width, height);
        pop();
    
        //counter text animation!
        push();
        textAlign(CENTER, CENTER);
        textFont(noto);
        textSize(28);
    
        //sets text color to be 'fading in' one counter before fully displaying
        if(counter == 5 || counter == 18) fill(80);
        if(counter >= 6 && counter < 18) fill(255);
        if(counter >= 5 && counter <= 18) {
            text('As I opened the door,', width/2, height/2-110);
            text('I felt a cool wind brush', width/2, height/2-75);
            text('against my face.', width/2, height/2-40);
        }
    
        if(counter == 9 || counter == 18) fill(80);
        if(counter >= 10 && counter < 18) fill(255);
        if(counter >= 9 && counter <= 18) text('And for a moment...', width/2, height/2+35);

        if(counter == 13 || counter == 18) fill(80);
        if(counter >= 14 && counter < 18) fill(255);
        if(counter >= 13 && counter <= 18) text('... Dread turned to hope.', width/2, height/2+110);
    
        if(counter == 20) fill(80);
        if(counter >= 21) fill(255);
        if(counter >= 20) {
            text('Click anywhere to restart.', width/2, height/2);
            canClick = true;
        }
        pop();
    }
}