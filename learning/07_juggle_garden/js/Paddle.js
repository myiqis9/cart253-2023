class Paddle {
    constructor() {
        this.width = 80;
        this.height = 25;
        this.x = 0;
        this.y = (height - this.height/2);
        this.poweredup = false;
        this.color = 255;
    }

    move() {
        this.x = mouseX; //user controlled paddle follows mouse
    }

    display() {
        push();
        rectMode(CENTER);
        fill(this.color, this.color, 255);
        stroke(255);
        rect(this.x, this.y, this.width, this.height);
        pop();
    }

    powerup() {
        canPowerUp = false;
        this.poweredup = true;
        this.width = 125;
        this.color = 150;
        powerCount = 5;
        powerTimer = setInterval(powerupTimer, 1000);
    }

    nopower() {
        this.poweredup = false;
        this.width = 80;
        this.color = 255;
        cooldown = 10;
        coolTimer = setInterval(cooldownTimer, 1000);
    }
}