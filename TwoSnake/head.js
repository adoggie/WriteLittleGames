class Head{
  constructor(snake,x,y){
    this.x = x;
    this.y = y;
    this.snake = snake;
  }
  display(){
    fill(0,this.snake.headCol,0);
    strokeWeight(3)
    rectMode(CENTER);
      rect(this.x*map.size+map.size/2,this.y*map.size+map.size/2,map.size,map.size);
    fill(255,0,0);
    circle(this.x*map.size+map.size/2,this.y*map.size+map.size/2,map.size/2)
  }
  
  move(x,y){
    this.x = x;
    this.y = y;
  }
}
