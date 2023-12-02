class GameState {
    constructor() {
        this.state = 'title';
    }

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

    opening() {
        rectMode(CENTER);
        imageMode(CENTER);
    
        canClick = false;
        activeScene.display();
        this.displayInventoryMenu();
    
        push();
        fill(0, 0, 0, alpha);
        noStroke();
        rect(width/2, height/2, width, height);
        pop();
    
        //counter text animation!
        push();
        textAlign(CENTER, CENTER);
        textFont(noto);
        textSize(28);
    
        if(counter == 1 || counter == 15) fill(80);
        if(counter >= 2 && counter < 15) fill(255);
        if(counter >= 1 && counter < 16) text('Where am I...?', width/2, height/2-100);
    
        if(counter == 5 || counter == 15) fill(80);
        if(counter >= 6 && counter < 15) fill(255);
        if(counter >= 5 && counter < 16) text('What is this place?', width/2, height/2-30);
    
        if(counter == 9 || counter == 15) fill(80);
        if(counter >= 10 && counter < 15) fill(255);
        if(counter >= 9 && counter < 16) {
            text('Something tells me...', width/2, height/2+40);
            text('I need to find a way out.', width/2, height/2+75);
            text('And quickly...', width/2, height/2+110);
        }
        pop();
    
        if(counter == 16) alpha = 200;
        if(counter == 17) alpha = 125;
        if(counter == 18) alpha = 65;
        if(counter == 19) {
            canClick = true;
            this.state = 'game';
            counter = 0;
            clearInterval(interval);
        }
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
    
    ending() {
        print('YOU WON!!!!!!!!!!!!!');
    }
}