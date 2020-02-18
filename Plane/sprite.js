class Sprite{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
    this.visible = true;
  } 
  
  draw(){}
  
  move(x,y){
    this.x = x;
    this.y = y;
  }
  
  hide(){
    this.visible = false;
  }
  
  show(){
    this.visible = true;
  }
  
}