//constant variables for this game
//define enemy display area  boundary
//top left corner
var ENEMY_AREA_BOUNDARY_LEFT_X = 0;
var ENEMY_AREA_BOUNDARY_LEFT_Y = 50;
//right bottom corner
var ENEMY_AREA_BOUNDARY_RIGHT_X = 505;
var ENEMY_AREA_BOUNDARY_RIGHT_Y = 230;
//Enemy moving speed range
var ENEMY_SPEED_LOWEST = 50;
var ENEMY_SPEED_HIGHEST = 500;
//Define how many enemies generate every batch
var ENEMY_NUMBER = 4;

//Player's inital position
var PLAYER_INIT_X = 200;
var PLAYER_INIT_Y = 400;

//Player moving area
var PLAYER_AREA_BOUNDARY_LEFT_X = 5;
var PLAYER_AREA_BOUNDARY_LEFT_Y =5;
var PLAYER_AREA_BOUNDARY_RIGHT_X = 405;
var PLAYER_AREA_BOUNDARY_RIGHT_Y = 400;

//Define moving distance for one key press
var PLAYER_MOVING_DISTANCE = 50;

//Use edge of the river as end line
var PLAYER_END_LINE = 20;

//Define the collision radius
var COLLISION_RADIUS = 40;



// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = ENEMY_AREA_BOUNDARY_LEFT_X;
    //generate the random start position of enemy: y between 50 and 230
    this.y = generateRandomNumber(ENEMY_AREA_BOUNDARY_LEFT_Y , ENEMY_AREA_BOUNDARY_RIGHT_Y);

    //generate a random speed of enemy
    this.speed = generateRandomNumber(ENEMY_SPEED_LOWEST, ENEMY_SPEED_HIGHEST);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x = this.speed * dt + this.x;

    //move back enemy to start line when it reaches endline
    if (this.x >= ENEMY_AREA_BOUNDARY_RIGHT_X){
        this.x = ENEMY_AREA_BOUNDARY_LEFT_X;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){

    this.sprite = 'images/char-boy.png';
    this.x = PLAYER_INIT_X;
    this.y = PLAYER_INIT_Y;

};

Player.prototype.update = function(dt){
    //reset game when user reach the river
    if (this.y <= PLAYER_END_LINE)
    {
        alert("You WIN!");
        newGame();
    };

    //stop moving when user reach the edge
    if (this.x <= PLAYER_AREA_BOUNDARY_LEFT_X){
        this.x = PLAYER_AREA_BOUNDARY_LEFT_X;
    };

    if (this.y <= PLAYER_AREA_BOUNDARY_LEFT_Y ){
        this.y= PLAYER_AREA_BOUNDARY_LEFT_Y;
    };

    if (this.x >= PLAYER_AREA_BOUNDARY_RIGHT_X){
        this.x = PLAYER_AREA_BOUNDARY_RIGHT_X;
    };

    if (this.y >= PLAYER_AREA_BOUNDARY_RIGHT_Y){
        this.y = PLAYER_AREA_BOUNDARY_RIGHT_Y;
    };

    //lose game if collision happens
    if (checkCollisions(allEnemies,this)){
        alert("You lose!");
        newGame();
    };

};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    switch (key) {
        case "left":
            this.x = this.x - PLAYER_MOVING_DISTANCE;
            break;
        case "right":
            this.x = this.x + PLAYER_MOVING_DISTANCE;
            break;
        case "up":
            this.y = this.y - PLAYER_MOVING_DISTANCE;
            break;
        case "down":
            this.y = this.y + PLAYER_MOVING_DISTANCE;
            break;
    };

};

var generateRandomNumber = function (start, end){
    return Math.floor(Math.random() * (end - start + 1)) + start;
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player;
var generateEnymies = function (number){
    for(var i = 0; i < number; i++){
        var newEnemy = new Enemy();
        allEnemies.push(newEnemy);
    };
};

var isCollided = function(obj1, obj2){

    var distanceX = Math.abs(obj1.x - obj2.x);
    var distanceY = Math.abs(obj1.y - obj2.y);

    if ((distanceX <= COLLISION_RADIUS) && (distanceY <= COLLISION_RADIUS)) {
        return true;
    };
};

var checkCollisions = function(enemies, player){
    var enemyNumber = enemies.length;

    for (var i = 0 ; i < enemyNumber; i++){
        if (isCollided(enemies[i],player)) {
            return true;
        };
    };
};

var newGame = function(){
    allEnemies = [];
    generateEnymies(ENEMY_NUMBER);
    player  = new Player();
};

newGame();




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
