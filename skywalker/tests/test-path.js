
let enemy = null;
function preload(){
  enemy = loadImage('enemy1.png');
}


let path = [];  //  贝塞尔曲线取点
let cur_idx = 0, pre_idx = 0 ;
let timer = 0;

function setup(){
  createCanvas(500,600);

  x1 = width/3;
  x2 = 40;
  x2 = random(40,width/2);
  x3 = random(190,width);
  x4 = random(width);
  y1 = height/10;
  y2 = random(50,height/2);
  y3 = height/2+100 ;
  y4 = height-10;

  let steps = 70; // 曲线上取n个点
  for (let i = 0; i <= steps; i++) {
    let t = i / steps;
    let x = bezierPoint(x1, x2, x3, x4, t);
    let y = bezierPoint(y1, y2, y3, y4, t);
    path.push([x,y]);
  }
}


function draw(){

  background('#E0E0E0');
  push();

  noFill();
  stroke('red');

  bezier(x1, y1, x2, y2, x3, y3, x4, y4); //绘制曲线

  circle(x1,y1,5);  // 绘制控制点
  circle(x2,y2,5);
  circle(x3,y3,5);
  circle(x4,y4,5);

  stroke('blue');
  line(x1,y1,x2,y2);
  line(x3,y3,x4,y4);


  fill('red');

  timer+=deltaTime/1000;
  if(timer > 0.02){
    if(cur_idx >= path.length){
      cur_idx = 0;
      pre_idx = -1;
      return
    }

    //计算两个点的向量的夹角

    let pt = path[cur_idx];
    ellipse(pt[0],pt[1], 15, 15);

    if(pre_idx >= 0) {
      let pre_pt = path[pre_idx];

      let v1 = createVector(0, 1);
      let v2 = createVector(pt[0]-pre_pt[0], pt[1]-pre_pt[1]);
      let angle = degrees(v1.angleBetween(v2));
      textSize(18);
      text("angle:"+angle.toFixed(2),10,20);

      translate(pt[0],pt[1]);
      rotate(radians(angle));
      imageMode(CENTER);
      image(enemy,0,0);

    }

    timer = 0;

    pre_idx = cur_idx;
    cur_idx+=1;
  }

  pop();

  noFill();
  stroke('#00BB00')
  for(let n=0;n<path.length;n++){
    let pt = path[n];
    circle(pt[0],pt[1],3);
  }

}