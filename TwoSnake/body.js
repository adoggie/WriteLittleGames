class BodyBlock{
  constructor(snake,x,y,num){
    this.x = x;
    this.y = y;
    this.num = num;
    this.snake = snake;
  }
  
  display(){
    fill(200,this.snake.bodyCol,0);       
    rect(this.x*map.size+map.size/2,this.y*map.size+map.size/2,map.size,map.size);
    //fill(255,0,0);
    //text(this.num,this.x*map.size,this.y*map.size,map.size,map.size);
  }
}