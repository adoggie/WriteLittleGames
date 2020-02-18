class Box{
  constructor(x,y){
    this.x = x
    this.y = y
  }
  
  display(){
    rectMode(CENTER);
    fill(255,255,0,200);
    rect(this.x*L+L/2,this.y*T+T/2,L,T)    
  }
  
  move(direction,step){
    if (direction == 'up'){
      this.y-=step;
    }
    if (direction == 'down'){
      this.y+=step;
    }
    if (direction == 'left'){
      this.x-=step;
    }
    if (direction == 'right'){
      this.x+=step;
    }
  }
}