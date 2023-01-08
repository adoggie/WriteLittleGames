let angle=0;
let r = 0;

function setup() {
  createCanvas(400,400);

  r = 250;

}

function draw() {
  background(0,10);
  push();
  translate(200,200);
  noFill();
  stroke('stroke');
  //ellipse(0,0,r,r);

  fill('white');
  //ellipse(0,0,10,10);
  //line(0,0,r/2,0);

  angle+=0.01;
  r-=0.1;

  let x = cos(angle)*r/2
  let y = sin(angle)*r/2

  ellipse(x,y,20,20)

}