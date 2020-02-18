class Snake{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.d = '';
    this.head = new Head();
  }
  
  move(direction,step){
    if (direction == 'up'){
      if(this.y - step >= 0 ){
       this.y-=step;
      }
      
    }
    if (direction == 'down'){
        if (this.y+step < h/T ){
          this.y+=step;
      }
    }
    if (direction == 'left'){
        if (this.x-step >= 0){
          this.x-=step;
      }
    }
    if (direction == 'right'){
      if (this.x+step < w/L){
        this.x+=step;
      }
    }
  
  }
  display(){
    this.head.display(this.x,this.y);
  }
}

class Head{
  constructor(){}
  display(x,y){
    rectMode(CENTER);
    fill(0,255,0);
    rect(x*L+L/2,y*T+T/2,L,T);
    fill(255,0,0);
    circle(x*L+L/2,y*T+T/2,10);
  }
}
