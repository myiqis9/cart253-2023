class Arrow {

    constructor(direction, x, y) {
      this.direction = direction;
      this.x = x;
      this.y = y;
      this.size = 30;
      this.fill = 255;
      this.hover = false;
    }

    checkDist() {
      let d = dist(mouseX, mouseY, this.x, this.y);
      if(d < this.size/2) {
        this.hover = true; 
        print('hi');
      }
      else this.hover = false;
    }

    move() {
      if(this.direction == 'right') {
        room++;
        if(room > 4) room = 1;
      }
      else if(this.direction == 'left') {
        room--;
        if(room < 1) room = 4;
      }
      checkRoom();
    }
  
    display() {
      push();
      ellipseMode(CENTER);
      noStroke();
      fill(this.fill);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }