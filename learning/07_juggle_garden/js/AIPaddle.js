class AIPaddle {
    constructor() {
        this.width = 100;
        this.height = 25;
        this.x = width/2;
        this.y = this.height/2;
        this.vx = 0;
        this.speed = 2;
    }

    move(ball) {
      //AI paddle follows active ball
      let dx = this.x - ball.x;
      //print(`distance from paddle to ball: ${dx}`);

      if(dx < 0.98 && dx > -0.98) this.vx = 0;
      else if(dx < 0) this.vx = this.speed;
      else this.vx = -this.speed;

      this.x += this.vx;
    }

    display() {
      push();
      rectMode(CENTER);
      fill(255, 255, 255);
      stroke(255, 0, 0);
      strokeWeight(2);
      rect(this.x, this.y, this.width, this.height);
      pop();
    }
}