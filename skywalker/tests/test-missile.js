
let enemy = null;
function preload(){
  enemy = loadImage('enemy1.png');
}


let bullet_pos = null;
let bullet_size = [20,40];

let target=[50,50];


let fly_timer = 0;
let angle = 0;
function setup(){
  createCanvas(500,600);
  bullet_pos = [width/2,height];
  fly_v = createVector(0,-1); //

}


function draw(){

  background('#E0E0E0');
  push();

  textSize(18);
  text("Missile 跟踪测试",10,20);
  noFill();
  stroke('red');

  target[0] = mouseX;
  target[1] = mouseY;


  imageMode(CENTER);
  image(enemy,target[0],target[1]);
  circle(target[0],target[1],10); // 飞行目标点

  stroke('blue');
  rectMode(CENTER);

  fly_timer += deltaTime/1000;


  if(fly_timer > 0.08) {
    v2 = createVector(target[0] - bullet_pos[0], target[1] - bullet_pos[1]);
    v2.normalize();
    v2 = v2.mult(5) ; // 求得步长

    bullet_pos[0] += v2.x;
    bullet_pos[1] += v2.y ;
    //求夹角
    let v1 = createVector(0, 1);
     v2 = createVector(bullet_pos[0]- target[0],  bullet_pos[1] - target[1]);
     angle = degrees(v1.angleBetween(v2));
    fly_timer = 0 ;
  }

  translate(bullet_pos[0],bullet_pos[1]);
   rotate(radians(angle));
  rectMode(CENTER);
  strokeWeight(3)
  rect(0,0, bullet_size[0], bullet_size[1]);

  stroke('red');
  // circle(bullet_size[0]/2,0,5);
  circle(0,-bullet_size[1]/2,10);

  pop();

}