var alienImg;

function Alien(x, y) {
	this.x = x;
	this.y = y;
	this.r = 20;
	this.toDelete = false;
  this.xdir = 1;
	
	this.kill = function() {
		this.toDelete = true;
	}
	
  this.shiftDown = function() {
    this.xdir *= -1.1;
    this.y += this.r;
  }
	
	this.move = function() {
		this.x = this.x + this.xdir;
	}
	
	this.hits = function(ship) {
		var d = dist(this.x, this.y, ship.x, 50);
		if(d > this.r + ship.r) {
			noLoop();
		}
		else {
			return false;
		}
	}
	
	
	this.show = function() {
		image(alienImg, this.x-20, this.y, this.r*2, this.r*2);
	}
}