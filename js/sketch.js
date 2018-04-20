var ship;
var aliens = [];
var bullets = [];
var score = 0;
var start = true;
var bg;
var blinkingMenu = true;
var dead = false;
var gamestart = false;
var highScore = 0;
var playAgain = false;


function preload() {
    bg = loadImage('../img/start.png');
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
    rect(width / 2, height / 2, 500, 400);

    startScreen();

    if (!start && !dead) {
        startUp();
    }
    else if (dead) {
        runDead();
    }
}


// Create array of aliens with dimensions
function alienArray() {
    var count = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 7; j++) {
            aliens[count] = new Alien(j * 60 + 40, 20 - i * 60);
            count++;
        }
    }
}


//================
// Function World
//================

function startScreen() {
    if (start) {
        image(bg, 0, 0, width, height);
        fill(255, 255, 255);
        textSize(15);
        textAlign(CENTER, BASELINE);
        textStyle(BOLD);

        if (frameCount % 30 == 0) {
            if (blinkingMenu) {
                blinkingMenu = false;
            } else {
                blinkingMenu = true;
            }
        }

        if (blinkingMenu) {
            text('PRESS SPACE TO START', width / 2, 300);
        }
        startGame();
    }
}

function startUp() {
    bulletFunc();
    ship.move();
    ship.show();
    alienFunc();
    scoreFunc();
    endScreen();
}

function runDead() {
    alienFunc();
    scoreFunc();
    endScreen();
}


function bulletFunc() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].show();
        bullets[i].move();

        // Hit?
        for (var j = 0; j < aliens.length; j++) {
            if (bullets[i].hits(aliens[j])) {
                aliens[j].kill();
                bullets[i].kill();
            }
        }

        if (bullets[i].toDelete) {
            bullets.splice(i, 1);
        }
    }
}


function alienFunc() {
    var edge = false;
    for (var i = 0; i < aliens.length; i++) {
        // Hit?
        if (aliens[i].hits(ship)) {
            dead = true;
        }

        aliens[i].move();
        aliens[i].show();

        // Detect edge
        if (aliens[i].x > width - 15 || aliens[i].x < 15) {
            edge = true;
        }

        // remove alien
        if (aliens[i].toDelete) {
            aliens.splice(i, 1);
        }
    }

    // Shift Down
    if (edge) {
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
    text(highScore, width -20, 30);
    noStroke();
}


function endScreen() {
    textSize(90);
    fill(255);
    textAlign(CENTER, CENTER);
    if (!aliens.length) {
        playAgain = true;
        text('YOU WIN!', width / 2, height / 3);textSize(30);
        textStyle(NORMAL);
        text('Click To Restart', width / 2, height / 1.7);
}
    else if (dead) {
        playAgain = true;
        text('YOU LOSE!', width / 2, height / 3);
        textSize(30);
        textStyle(NORMAL);
        text('Click To Restart', width / 2, height / 1.7);
    }
    
}

function reset() {
    aliens = [];
    bullets = [];
    score = 0;
    dead = false;
    start = true;
    blinkingMenu = true;
    alienArray();
    gamestart = false;
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
    else if (keyCode == 32 && !start) {
        var bullet = new Bullet();
        bullets.push(bullet);
    } else if (keyCode == 32 && start) {
        gamestart = true;
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

function startGame() {
    if (gamestart) {
        start = false;
    }
}

function mousePressed() {
    if(playAgain){
        reset();
        playAgain = false;
    }
}