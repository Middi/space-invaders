var ship;
var aliens = [];
var bullets = [];
var score = 0;


function preload() {
  alienImg = loadImage('../img/alien.png');
	shipImg = loadImage('../img/ship.png');
}

function setup() {
    var cnv = createCanvas(500, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;

    cnv.position(x, y);
	ship = new Ship();
	alienArray();
}

function draw() {
  background(200);
	fill(50);
	rectMode(CENTER);
	rect(width/2, height/2, 500, 400);
	
	bulletFunc();
	ship.move();
	ship.show();
	alienFunc();
	scoreFunc();
	endScreen();	
}


// Create array of aliens with dimensions
function alienArray() {
	var count = 0;
	for (var i = 0; i < 3; i++) {
		for(var j = 0; j < 7; j++) {
			aliens[count] = new Alien(j*60 + 40, 20 - i*60);
			count++;
		}
	}
}


//================
// Function World
//================

function bulletFunc() {
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].show();
		bullets[i].move();

		// Hit?
		for (var j = 0; j < aliens.length; j++) {
			if(bullets[i].hits(aliens[j])) {
				aliens[j].kill();
				bullets[i].kill();
			}
		}
		
		if(bullets[i].toDelete) {
			bullets.splice(i, 1);	
		}
	}
}


function alienFunc() {
	var edge = false;
	for (var i = 0; i < aliens.length; i++) {
			aliens[i].move();
			aliens[i].show();
		
		// Detect edge
		if (aliens[i].x > width-15 || aliens[i].x < 15) {
			edge = true;
		}
		
		// remove alien
		if(aliens[i].toDelete) {
			aliens.splice(i, 1);
		}	
	}
	
	// Shift Down
	if(edge) {
		for (var i = 0; i < aliens.length; i++) {
			aliens[i].shiftDown();
		}
	}
}


function scoreFunc() {
	strokeWeight(6);
	stroke(50);
	fill(255);
	textSize(20);
	text(score, 20, 30);
	noStroke();
}


function endScreen() {
	if(!aliens.length) {
		textSize(90);
		fill(255);
		textAlign(CENTER, CENTER);
		text('YOU WIN', width/2, height/2);
	}
}


//============
// KEY WORLD
//============

function keyPressed() {
	if (keyCode === RIGHT_ARROW) {
		ship.direction.right = true;
	}
	else if (keyCode === LEFT_ARROW) {
		ship.direction.left = true;
	}
	else if (keyCode == 32) {
		var bullet = new Bullet();
		bullets.push(bullet);
	}
}

function keyReleased() {
	if (keyCode === RIGHT_ARROW) {
		ship.direction.right = false;
	}
	else if (keyCode === LEFT_ARROW) {
		ship.direction.left = false;
	}
}