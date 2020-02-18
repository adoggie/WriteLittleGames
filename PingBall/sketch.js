BRICK_WIDTH = 42;
BRICK_HEIGHT = 20;

SCREEN_WIDTH = 600;
SCREEN_HEIGHT = 600;

let img_bricks = [];
let img_pad;
let img_ball;
let bricks = [];
let colnum = 10;
let rownum = 6;

let brick_margin= 10;

let paddle;
let ball ;

function preload() {
  img_bricks[0] = loadImage('assets/block01.png');
  img_bricks[1] = loadImage('assets/block02.png');
  img_bricks[2] = loadImage('assets/block03.png');
  img_bricks[3] = loadImage('assets/block04.png');
  img_bricks[4] = loadImage('assets/block05.png');
  img_pad = loadImage('assets/paddle.png');
  img_ball = loadImage('assets/ball.png');
  
  soundFormats('mp3', 'ogg');
  hitsnd = loadSound('assets/brick1.mp3');
  boundsnd = loadSound('assets/brick.mp3');
}


function setup() {
  SCREEN_HEIGHT = window.innerHeight;
  SCREEN_WIDTH = window.innerWidth ;
  
  
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  let top = 50;
  
  let w = BRICK_WIDTH;
  let h = BRICK_HEIGHT;
  w +=4;
  h +=4;
  
  colnum = (SCREEN_WIDTH -40 ) / (BRICK_WIDTH+4); 
  rownum = (SCREEN_HEIGHT -50) / (BRICK_HEIGHT+4) ;
  rownum = 10;
  for (let c = 0; c < colnum; c++) {
    for (let r = 0; r < rownum; r++) {
      let x = (width - colnum * w) / 2 + c * w + w / 2 ;
      let y = top + r * h + h / 2;
      
      let brick = new Brick(x, y);
      bricks.push(brick);
    }
  }
  
  paddle = new Paddle(width/2,height-100);
  ball = new Ball(width/2-30,paddle.y-200);
}

function draw() {
  

  imageMode(CENTER);


  background(250,250,200);
  
  textSize(16);
  text("PingBall V1.0 zyc@2020",10,20);

  
  circle(width / 2, height / 2, 5);
  
  for(let n=0;n<bricks.length;n++){
    let brick = bricks[n];
    brick.draw();
  }
  
  paddle.draw();
  ball.draw();
  
  if(ball.x >= paddle.x-paddle.get_size().w/2 
     && ball.x <= paddle.x+ paddle.get_size().w/2
     && ball.y >= paddle.y - paddle.get_size().h/2
     && ball.y <= paddle.y + paddle.get_size().h/2){
    
    let r = (ball.x - ( paddle.x - paddle.get_size().w/2)) / paddle.get_size().w;
    // 两端反弹越大
    if( r > 0.5 ){
      ball.dx =ball.dx + r*5;
    }else{
      r = 0.5 - abs(r);
      ball.dx = ball.dx - r*5;
    }
    ball.dy = -ball.dy;
    boundsnd.play();
  }
  
  
  
}


class Paddle{
  
  constructor(x,y){
    this.x = x;
    this.y = y;
  
  }
  
  get_size(){
    return {w:90,h:9};
  }
  
  draw(){
    image(img_pad,this.x,this.y);
    this.x = mouseX;
  }
}

class Brick {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color_idx = int(random(0,5));
  }

  draw() {
    image(img_bricks[this.color_idx], this.x, this.y);
    
  }
}

class Ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 3;
    this.speed = 0;
    
    this.last_x =0;
    this.last_y = 0;
  }

  draw() {
    this.x+=this.dx;
    this.y+=this.dy;
    this.x+=this.speed;
    this.y+=this.speed;
    image(img_ball, this.x, this.y);
    
    if(this.x >= SCREEN_WIDTH || this.x <=0){
      this.dx = -this.dx;
      boundsnd.play();
    }
    
    if(this.y >= SCREEN_HEIGHT || this.y <=0){
      this.dy = -this.dy;
      boundsnd.play();
    }
    
    
    let remove = [];
    for(let n=0;n< bricks.length;n++){
      let b = bricks[n];
      if( this.x >= b.x - BRICK_WIDTH/2 
         && this.x <= b.x + BRICK_WIDTH/2
         && this.y >= b.y - BRICK_HEIGHT/2
         && this.y <= b.y + BRICK_HEIGHT/2){
        remove.push(b);
        hitsnd.play();
        
        //四个方向撞击
        if(this.last_x < b.x - BRICK_WIDTH/2 ){
          //从左侧撞击
          this.dx = -this.dx;
        }
        if(this.last_x > b.x + BRICK_WIDTH/2){
          //从右侧撞击
          this.dx = -this.dx;
        }
        
        if(this.last_y < b.y - BRICK_HEIGHT/2){
          //从上部撞击
          this.dy = -this.dy;
        }
        
        if(this.last_y > b.y + BRICK_HEIGHT/2){
          //底部撞击
          this.dy = -this.dy;
        }
        
      }
    }
    
    for(let n=0;n<remove.length;n++){
      let idx = bricks.indexOf(remove[n]);
      bricks.splice(idx,1);
    }
    
    this.last_x = this.x;
    this.last_y = this.y;
  }
  
  
}

