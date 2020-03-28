
// hanoi 汉诺塔游戏

timer = 0;

running = false;
RING_NUM = 9;
timer = 0;
freqs = 0.5;

RING_HEIGHT = 15;
COLORS = ['aqua','black','blue','fuchsia','gray','green','lime','maroon','navy','olive','purple','red','silver','teal','yellow'];
COLORS = ['aqua','blue','green','olive','purple','red','silver','teal','yellow'];


class Ring{
  constructor(id,color,w,h){
    this.id = id;
    this.color = color ;
    this.x = 0;
    this.y = 0 ;
    this.w = w;
    this.h = h;
    this.tower = null;
  }

  draw(){
    fill(this.color);
    noStroke();
    rect(this.x,this.y,this.w,this.h);
    // stroke('black');

    // text(this.id,this.x,this.y);
  }
}

class Tower{
    constructor(id,x,y){
        this.id = id;
        this.x = x; // 0,0 is 塔基中点
        this.y = y;
        this.w = width/3-40;
        this.h = 200;
        this.rings = [];
    }

    draw(){
      push();
      translate(this.x,this.y);
      applyMatrix(1,0,0,-1,0,0);
      rectMode(CENTER);

      rect(0,0,this.w,4);
      rect(0,this.h/2,4,this.h);
      for(let _ =0;_< this.rings.length;_++){
        let ring = this.rings[_];
        ring.draw();
      }


      pop();
    }

    reset(n){
      this.rings = [];
      for(let _ = n;_ > 0 ;_--){
        let ring = new Ring(_,COLORS[_-1], (this.w-20) / n * _ , RING_HEIGHT );
        this.put_in(ring);
      }
    }

    put_in(ring){
      this.rings.splice(0,0,ring);   // insert to first
      ring.tower = this;
      ring.x = 0;
      ring.y = (RING_HEIGHT+4) * this.rings.length - (RING_HEIGHT+4)/2;
    }

    get_out(){
      if(this.rings.length == 0){
        return;
      }
      let ring = this.rings[0];
      this.rings.splice(0,1);
      ring.tower = null;

      return ring;
    }



}

var tower_a = null;
var tower_b = null;
var tower_c = null;

var steps = [];

 function hanoi( n,  A,  B,  C) {
        if (n == 1) {
            move(A, C);
        } else {
            hanoi(n - 1, A, C, B);//将n-1个盘子由A经过C移动到B
            move(A, C);             //执行最大盘子n移动
            hanoi(n - 1, B, A, C);//剩下的n-1盘子，由B经过A移动到C
        }
    }

function move( A,  C) {//执行最大盘子n的从A-C的移动
     // print(count," move:" + A + "->" + C);
    count+=1;
    steps.push([A,C]);

}


//初始化游戏
function init_game(n){
  tower_a.reset( RING_NUM);
  tower_b.reset( );
  tower_c.reset( );
}

function draw_scene(){
  tower_a.draw();
  tower_b.draw();
  tower_c.draw();

}


count = 0;

function start() {
  // hanoi(16, tower_a, tower_b, tower_c);
  steps = [];
  hanoi(RING_NUM, tower_a, tower_b, tower_c);
}

let step_n = 0;
function play_step(){
  if(step_n >= steps.length){
    return;
  }
  let step = steps[step_n];
  let t1 = step[0];
  let t2 = step[1];

  let ring = t1.get_out();
  t2.put_in(ring);

  step_n +=1;
}


let gui;

function setup() {

  createCanvas(600,400);
  gui = createGui();
  slider = createSlider("速度", 10, 60, 120, 32, 1,100);
  slider.val = 50;

  slider_ring_num = createSlider("高度", 150, 60, 120, 32, 3,9);
  slider_ring_num.isInteger = true;
  slider_ring_num.val = RING_NUM;

  btn_start = createButton("start", 300, 60);

  tower_a = new Tower('a',width/6*1  ,height -50);
  tower_b = new Tower('b',width/6*3,height -50);
  tower_c = new Tower('c',width/6*5,height -50);
  init_game();
  start();
}

function draw() {
  background('#F0F0F0');
  textSize(14);
  text("汉诺塔 hanoi @2020 github.com/adoggie ",10,20);
  text("移动次数: N^2-1  " + step_n + ":"+ (2**RING_NUM-1) ,10,40);

  draw_scene();


  timer += deltaTime /1000;
  if( timer > freqs){
    play_step();
    timer = 0;
  }
  drawGui();
  if (slider.isChanged) {
      freqs = slider.val *0.01;
  }

  if( slider_ring_num.isChanged){
    RING_NUM = slider_ring_num.val;
    restart();
  }

  if(btn_start.isPressed) {
    restart();
  }
}

function restart(){
  init_game();
  start();
  step_n = 0;
}


