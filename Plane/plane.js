//matrix 
// https://blog.csdn.net/iteye_19583/article/details/82568148

class MyPlane extends Sprite{

  constructor(x,y){
    super(x,y);
    this.color = 'red';
    this.speed = 3;
    this.width = 40;
    this.height = 60;
  }
  
  getRect(){
    return {x:this.x,y:this.y,w:this.width,h:this.height};
  }
  
  draw(){
    // translate(0, 100);
  //translate(p5.Vector.fromAngle(millis() / 1000, 140));
    
    push();
  
  
    
    
    stroke('red');
    applyMatrix(1, 0, 0, -1, this.x, this.y);
    
    this.drawBody();

    pop();
    
    this.keyDown();
  }
  
  drawBody(){
    fill(0,222,255,200)
    stroke(0, 0, 0,200)
    strokeWeight(3)
    beginShape()
    vertex(0,0)
    vertex(-this.width/2, -this.height+7)
    vertex(-this.width/2+10, -this.height)
    
    vertex(0, -this.height+7 )
    vertex(this.width/2-10, -this.height)
    vertex(this.width/2, -this.height+7)
    vertex(0,0)
    endShape()
  }
  
  keyDown(key){
    if(keyIsDown(LEFT_ARROW)){
      this.x-=speed;
    }
    if(keyIsDown(RIGHT_ARROW)){
      this.x+=speed;
    }
    if(keyIsDown(UP_ARROW)){
      this.y-=speed;
    }
    if(keyIsDown(DOWN_ARROW)){
      this.y+=speed;
    }    
    
  }
  
}