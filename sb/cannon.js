class Cannon{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.cannon_width = 10;
    this.cannon_height = 80;
    
    this.angle = 0;
    
  }
  
  display(){
    push();
    translate(this.x, this.y);
    rotate(PI/180*this.angle);  // -50  ~ +50
    fill("#696969");
    rectMode(CENTER);
    rect(0,-this.cannon_height/2,this.cannon_width-5,this.cannon_height+40);
    rect(0,-this.cannon_height/2,this.cannon_width,this.cannon_height);
    pop();
    
    fill("#DAA520");
    ellipse(this.x,this.y,100,90);
    fill("#F0E68C");
    rectMode(CENTER);
    rect(this.x,this.y,150,30);
    if(this.angle>=-50 && this.angle<=50){
      //print('ss',this.angle);
      if(keyIsDown(65)){
        this.angle-=2;
        if(this.angle <= -50){
          this.angle = -50;
        }
      }
      if(keyIsDown(68)){
        this.angle+=2;
        if(this.angle >= 50){
          this.angle = 50;
        }
      }
    }
    
    
    
    circle(this.x,this.y,10);
  }
  
  fire(){ 
    let v1 = createVector(0, -(this.cannon_height+20));
    v1.rotate( PI/180*this.angle);
    // print('v1:',this.v1.x,this.v1.y );
    
    let b = new Bullet(v1.x + this.x,v1.y + this.y,v1,3);
    bullet_list.push(b);
  }
}
