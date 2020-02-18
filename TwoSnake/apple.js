class Apple{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  
  display(){
    fill(255,0,0);
    rectMode(CENTER);
    //rect(this.x*map.size+map.size/2,this.y*map.size+map.size/2,map.size,map.size);
    image(img, this.x*map.size, this.y*map.size,map.size,map.size);
  }
}