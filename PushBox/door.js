class Door{
  constructor(x,y){
    this.x = x
    this.y = y
  }
  
  display(){
    rectMode(CENTER);
    fill(0);
    rect(this.x*L+L/2,this.y*T+T/2,L,T)    
  }
}