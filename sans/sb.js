



class Bullet{
  constructor(x,y,v){
    this.pos = createVector(x,y);
    this.n_v = p5.Vector.normalize(v);
    this.acc = 0;
  }

  move(){
    this.acc+=0.1;
    let new_v = p5.Vector.mult(this.n_v,this.acc);
    this.pos.add(new_v);
  }

  show(){
    push();
    fill('red');
    ellipse(this.pos.x,this.pos.y,10,10);
    pop();
  }

}



















let x = 0;
let y = 0;
let director = null;
var bullet = null;

function setup() {
  createCanvas(400,400);
  angleMode(DEGREES);
  director = createVector(x,-75);

}

function draw() {

  background(0);

  push();

  translate(width/2,height);
  
  stroke('white');
  strokeWeight(5);

  line(0,0,director.x,director.y);
  if (bullet){
    bullet.move();
    bullet.show();
  }
  
  pop();
}


function keyPressed(){
  if(keyCode == LEFT_ARROW){
    director.rotate(-5);
  }

  if(keyCode == RIGHT_ARROW){
    director.rotate(5);
  }

  if(keyCode == 32){
    bullet = new Bullet(director.x,director.y,director);

  }
}