// 延时执行
class TimerDelay{
  constructor(delay,callback,userdata){
    this.delay = delay;        //时间 mils
    this.callback = callback;   //回调函数
    this.userdata = userdata;
    this.timeEllapsed = 0 ;
  }
  
  run(){
    this.timeEllapsed += deltaTime/1000;
    if(this.timeEllapsed >= this.delay){
      this.callback(this.userdata);
      this.timeEllapsed = 0;
    }
  }
}

// 延时执行
class TimerDelayForClassFunc{
  constructor(delay,callback,instance,userdata){
    this.delay = delay;        //时间 mils
    this.callback = callback;   //回调函数
    this.userdata = userdata;
    this.instance = instance;
    this.timeEllapsed = 0 ;
  }

  run(){
    this.timeEllapsed += deltaTime/1000;
    if(this.timeEllapsed >= this.delay){
      // print(this.timeEllapsed);
      this.callback.bind(this.instance)(this.userdata);
      this.timeEllapsed = 0;
    }
  }

  reset(){
    this.timeEllapsed = 0 ;
  }
}


//控制面板
class ControllPad{

  constructor(cfgs){
    this.cfgs = cfgs;
    this.x =  this.cfgs.x;
    this.y = StageManager.instance.get().getSize().h+this.cfgs.y;
    // this.y = StageManager.instance.get().getSize().h * this.cfgs.off_y;
    this.dx = 0;
    this.dy = 0;


    this.touch_start_xy = null;

    this.reset();
  }

  reset(){
    this.dx = 0;
    this.dy = 0;
    this.touch_start_xy = null;
    this.key_up = false;
    this.key_left = false;
    this.key_right = false;
    this.key_down = false;
  }

  draw(){
    push();
    noStroke();
    fill( this.cfgs.color[0],this.cfgs.color[1],this.cfgs.color[2],this.cfgs.color[3]);
    // print(this.y,this.dx,StageManager.instance.get().getSize().h);
    circle(this.x+ this.dx,this.y+this.dy,this.cfgs.r);
    pop();

    this.keyCheck();
    if( this.key_up || this.key_down || this.key_left || this.key_right){

    }else {
        if (mouseIsPressed) {
            if (this.touch_start_xy == null) {
                this.touch_started();
            } else {
                this.touch_moved();
            }
        } else {
            // print('mouse free');
            if (this.touch_start_xy != null) {
                this.touch_ended();
            }
        }
    }


  }

  keyCheck(){
    this.key_up = false;
    this.key_left = false;
    this.key_right = false;
    this.key_down = false;

    if( keyIsDown(LEFT_ARROW)){
        this.key_left = true;
    }
    if(keyIsDown(RIGHT_ARROW)){
        this.key_right = true;
    }
    if(keyIsDown(UP_ARROW)){
        this.key_up = true;
    }
    if(keyIsDown(DOWN_ARROW)){
        this.key_down = true;
    }
  }


  dragged(){
    // print ('dragged');
    this.touch_moved();
  }

  touch_started(){
    let pt = {x:mouseX,y:mouseY};
    if(collidePointCircle(mouseX,mouseY,
        this.x, this.y,this.cfgs.r)){
      print('hit');
      this.touch_start_xy = pt;
    }
    // this.touch_start_xy = pt;
  }

  touch_moved(){
    // print ('touch move');
    if( this.touch_start_xy == null){
      return;
    }

    this.key_up = false;
    this.key_left = false;
    this.key_right = false;
    this.key_down = false;

    this.dx = mouseX - this.touch_start_xy.x;
    this.dy = mouseY - this.touch_start_xy.y;



    if(this.dx < 0 && abs(this.dx) >5 ){
      this.key_left = true;
    }


    if(this.dx >0 && abs(this.dx) >5){
      this.key_right = true;
    }


    if(this.dy <0  && abs(this.dy) >5){
      this.key_up = true;
    }

    if(this.dy > 0 && abs(this.dy) >5){
      this.key_down = true;
    }

    // print(this.dx,this.dy,'up',this.key_up,'down',this.key_down,'left',this.key_left,'right',this.key_right);

  }

  touch_ended(){

    // print('touch end');
    this.reset();
  }

  keyIsDown(key) {
    if (key == LEFT_ARROW) {
      return this.key_left;
    }

    if (key == RIGHT_ARROW) {
      return this.key_right;
    }

    if(key == UP_ARROW){
      return this.key_up;
    }
    if(key == DOWN_ARROW){
      return this.key_down;
    }

  }
}

function mouseDragged() {
  // ControllPad.instance.dragged();
}

function  touchStarted() {
  // ControllPad.instance.touch_started();
}

function  touchMoved() {
  // ControllPad.instance.touch_moved();
}

function touchEnded() {
  // ControllPad.instance.touch_ended();
}

function mouseReleased() {
  // print('mouse release')
}


// 血条对象
class BloodBar{


  constructor(cfgs,gameobject){
    this.cfgs = cfgs;
    this.gameobject = gameobject;
    this.x =0;
    this.y = 0; // 游戏对象的中心点坐标
  }


  draw(){
    if(! this.cfgs.draw){
      return ;
    }

    push();
    rectMode(CENTER);
    let x = this.cfgs.x * this.gameobject.getSize().w;
    let y = this.cfgs.y * this.gameobject.getSize().h;
    let w = this.cfgs.w;
    let h = this.cfgs.h;
    x = this.x - (x - this.gameobject.getSize().w/2 );
    y = this.y - this.gameobject.getSize().h/2 + y/2;

    stroke(this.cfgs.stroke);
    noFill();
    rect(x,y,w,h);

    rectMode(CORNER);
    x= x - this.cfgs.w /2 ; // * this.gameobject.getSize().w /2 ;
    y= y - this.cfgs.y * this.gameobject.getSize().h /2;
    w-=2;
    h-=2;
    w = this.cfgs.w / this.gameobject.cfgs.health * this.gameobject.health ;
    noStroke();
    fill(this.cfgs.fill);
    rect(x,y,w,h);
    pop();

  }
  move(x,y){
    this.x =x;
    this.y = y;
  }
}