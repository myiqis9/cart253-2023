class Ball {
    constructor(x, y, reverse) {
        this.x = x;
        this.y = y;
        this.reverse = reverse;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.maxSpeed = 10;
        this.size = 50;
        this.active = true;
        this.firstBounce = true;
    }

    gravity(force) {
        if(this.reverse) this.ay -= force;
        else this.ay += force;
    }

    move() {
        if(this.reverse) {
            this.vx -= this.ax;
            this.vy -= this.ay;
    
            this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
            this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    
            this.x -= this.vx;
            this.y -= this.vy;
    
            if(this.y - this.size/2 < 0) this.active = false;
        }
        else {
            this.vx += this.ax;
            this.vy += this.ay;
    
            this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
            this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    
            this.x += this.vx;
            this.y += this.vy;
    
            if(this.y - this.size/2 > height) this.active = false;
        }
    }

    bounce(paddle) {
        if(this.x > paddle.x - paddle.width/2 && this.x < paddle.x + paddle.width/2
        && this.y + this.size/2 > paddle.y - paddle.height/2 && this.y - this.size/2 < paddle.y + paddle.height/2) {
            let dx = this.x - paddle.x;

            if(this.reverse) this.vx -= map(dx, paddle.width/2, -paddle.width/2, AIdifficulty, -AIdifficulty);
            else this.vx += map(dx, -paddle.width/2, paddle.width/2, -2, 2);

            this.vy = -this.vy;
            this.ay = 0;
        }

        if(this.reverse) {
            if(this.x >= width - this.size/2 && this.y > paddle.y 
            || this.x <= this.size/2 && this.y > paddle.y ) {
                this.vx = -this.vx;
                this.ax = 0;
                print(`bounces off wall`);
            }
        }
        else {
            if(this.x >= width - this.size/2 && this.y < paddle.y  
            || this.x <= this.size/2 && this.y < paddle.y ) {
                this.vx = -this.vx;
                this.ax = 0;
                print(`bounces off wall`);
            }
        }
    }

    display() {
        push();
        fill(250, 150, 150);
        stroke(0);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.size);
        pop();
    }
}