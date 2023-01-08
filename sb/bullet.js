class Bullet{
  constructor(x,y,v,speed){
    this.x = x;
    this.y = y;
    this.r = 10;
    this.v = v;
    this.speed = speed;
  }
  
  draw(){
    push();
    fill(255);
    stroke('red');
    circle(this.x,this.y,this.r);
    pop();
    
    
    this.v.normalize();
    this.v.mult(this.speed);
    let new_x = this.v.x + this.x ;
    let new_y = this.v.y + this.y;
    this.move(new_x,new_y);
  }
  
  move(x,y){
    this.x = x;
    this.y = y;
  }
}