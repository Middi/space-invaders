function Bullet() {
    this.x = ship.x;
    this.y = height - 30;
    this.r = 3;
    this.toDelete = false;

    this.show = function () {
        rectMode(CENTER);
        fill(255);
        rect(this.x, this.y, this.r * 2, this.r * 2);
    }

    this.hits = function (alien) {
        var d = dist(this.x, this.y, alien.x, alien.y);
        if (d < this.r + alien.r) {
            score += 1;
            if(score > highScore){
                highScore = score;
            }
            return true;
        }
        else {
            return false;
        }
    }

    this.kill = function () {
        this.toDelete = true;
    }

    this.move = function () {
        this.y = this.y - 2;
    }
}