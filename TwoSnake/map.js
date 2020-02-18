class Map{
  constructor(w,h,size,show){
    this.w = w;//网格的横向格子的数量
    this.h = h;//网格的纵向格子的数量
    this.size = size;//网格的格子的边长
    this.show = show;//网格的格子是否显示
  }
  
  display(){
    if (this.show == false){
      return;
    }
    for (let index = 0;index<=this.w;index++){
      strokeWeight(0.8);
      line(index*this.size,0,index*this.size,this.h*this.size);
    }
    for (let invex = 0;invex<=this.h;invex++){
      strokeWeight(0.8);
      line(0,invex*this.size,this.w*this.size,invex*this.size);
    }
    for (let x = 0;x<this.w;x++){
      for (let y = 0;y<this.h;y++){
        fill(255);
        strokeWeight(1);
        circle(x*this.size+this.size/2,y*this.size+this.size/2,10);
      }
    }
  }
}