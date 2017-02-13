var b1;
var p1;
var myText;
var isPlaying;

function setup() {
    var cnv = createCanvas(700, 450);
    cnv.parent("sketch-holder");
    b1 = new Ball(100, height/2);
    p1 = new Paddle(width-100, mouseY, 120);
    frameRate(144);
    noCursor();
}

function draw() {
    background(51);
    b1.display();
    b1.move();
    b1.edges();
    p1.display();
    b1.collide(p1);
    p1.move();
    myText = "Score: " + b1.score;
    textAlign(CENTER);
    textSize(32);
    text(myText, width/2, 50);
}

function Ball(x, y){
    this.x = x;
    this.y = y;
    this.r = 16;
    this.xdirection = 1;
    this.ydirection = 1;
    this.xspeed = 8;
    this.yspeed = 6;
    this.score = 0;
    
    this.display = function() {
        fill(255);
        noStroke;
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }
    
    this.move = function() {
        this.x = this.x + (this.xspeed * this.xdirection);
        this.y = this.y + (this.yspeed * this.ydirection);
    }
    
    this.edges = function() {
        if(this.x < 0 + this.r){
            this.xdirection *= -1;
        }
        if(this.y < 0 + this.r || this.y > height - this.r){
            this.ydirection *= -1;
        }
    }
    
    this.collide = function(other){
        if(this.x > width+this.r) {
            this.x = -5000;
        }
        
        if(this.x > other.x - other.w && this.x < other.x + other.w) {
            if(this.y > other.y && this.y < other.y + other.h) {
                this.xdirection *= -1;
                this.x -= 5;
                this.score += 1;
            }
        }
    }
}

function Paddle(x, y, h){
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = h;
    
    this.display = function() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }
    
    this.move = function() {
        this.y = mouseY;
    }
}