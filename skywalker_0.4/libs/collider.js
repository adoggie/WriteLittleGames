import {ConfigManager,Constants} from "./config.js";
// import {collideRectRect} from './p5.collide2d.min.js';

export class CollideRect{

  constructor(cfgs){
    this.id = cfgs.id;
    this.x = cfgs.x;
    this.y = cfgs.y;
    this.w = cfgs.w ;
    this.h = cfgs.h;
    this.cx = 0;
    this.cy = 0;
  }

  draw(){
    if( ConfigManager.instance.root.collider.draw == false){
      return;
    }
    push();
    stroke(ConfigManager.instance.root.collider.color);
    strokeWeight(1);
    noFill();
    rectMode(CENTER);
    rect(this.cx,this.cy,this.w,this.h);
    // print(this.w,this.y);
    // rect(100,100,this.w,this.y);

    // rect(100,100,100,100);
    pop();
  }

  move(x,y){
    // this.cx = x - this.w /2 + this.x; // top-left + x
    // this.cy = y - this.h /2 + this.y; // top-left + y
    this.cx = x;
    this.cy = y;
    this.x = x - this.w/2;
    this.y = y - this.h/2;
  }

  getRect(){
    return {x:this.x,y:this.y,w:this.w,h:this.h};
  }

  isCollided(other){ // 是否碰撞
    if( other instanceof CollideRect){
      // 矩形相交判断
      return collideRectRect(this.x,this.y,this.w,this.h,other.x,other.y,other.w,other.h);
    }
    return false;
  }
}

// 碰撞器
export class Collider{
  constructor(cfgs){
    this.shape_list=[];
    this.cfgs = [];
    this.cfgs = cfgs;
    this.init();
  }

  init(){
    for(let n=0;n< this.cfgs.length;n++){
      let _ = this.cfgs[0];
      let cls = _.cls;
      let obj = new cls(_);
      this.shape_list.push(obj);
    }
  }

  move(x,y){
    for(let n=0;n< this.shape_list.length;n++){
      let _ = this.shape_list[n];
      _.move(x,y);
    }
  }

  draw(){
    for(let n=0;n< this.shape_list.length;n++){
      let _ = this.shape_list[n];
      _.draw();
    }
  }

  isCollided(other){ // 是否碰撞
    let collised = false;
    for(let n=0;n< this.shape_list.length;n++){
      let a = this.shape_list[n];
      for(let m=0;m< other.shape_list.length;m++){
        let b = other.shape_list[m];
        if( a.isCollided(b)){
          collised = true;
          return collised;
        }
      }
    }
    return collised;
  }
}