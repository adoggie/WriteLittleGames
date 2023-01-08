let angle = 0;
var x = 0;
var y = 0;
var v1 = null;
var v2 = null;
var isFlying = false;
var v3 = null;
var v4 = null;

var v_base = null;
var v_fly = null;
var speed = 1;

// var off_y = 0 ;

function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height;
  v1 = createVector(0,-10);
  
  angleMode(DEGREES); 
  v_base = createVector(width/2,height);
}

function draw() {
  background(0);

  push();
  x = v_base.x;
  y = v_base.y;
  translate(x,y);

  stroke('white');
  strokeWeight(5);

  if(isFlying == true){
    v2 = p5.Vector.normalize(v1);
    v2.mult(speed);
    v_base.add(v2); 
    speed+=0.03;
    speed = min(speed,5);
  }
    
  line(0,0,v1.x,v1.y);
  pop();
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
      v1.rotate(-15);
  }
  if(keyCode === RIGHT_ARROW){
      // angle += 15;
      v1.rotate(15);
  }
  if(keyCode === 32){
      console.log('press space.');
      isFlying = true;
  }

}