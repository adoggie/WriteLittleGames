let bg;
let dd;
let pf;
let platforms = [];
function preload() {
  // bg = loadImage('assets/background.png');
  // dd = loadImage('assets/doodle.png');
  // pf = loadImage('assets/platform.png');
  jumpSound = loadSound('assets/jump3.mp3');
}

function setup(){
  createCanvas(400,533);
  jumpSound.play();
}


function draw(){
  background(0);
  
}

class Doodle{
  constructor(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  
  display(){
    image(dd, this.x, this.y);
  }
  
  move(){
    this.speed += 0.2;
    this.y+=this.speed;
    if (this.y >= height-75){
      this.speed = -10;
      jumpSound.play();
    }
    
  }
}

class Platform{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    image(pf,this.x,this.y)
  }

}