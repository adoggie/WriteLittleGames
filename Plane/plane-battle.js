class PlaneScene extends Scene{
  constructor(){
    super('plane');
    this.myplane = new MyPlane(200,200);
    this.speed = 3;
  }
  
  init(){

    
  }
  
  draw(){
    this.hill_sun_down();
    this.myplane.draw();
  }
  
  hill_sun_down(){
    background(204);  
    push();
    translate(0,height-120);
    // 绘制一个太阳
    fill(255,0,0,180)
    stroke(255, 255, 0)
    strokeWeight(6)
    ellipse(360, 110, 100, 100)
    // 开始绘制山的图形
    // 设置颜色为灰色
    fill(45,45,45,250)
    stroke(0, 0, 0)
    strokeWeight(1)
    beginShape()
    vertex(0,120)
    vertex(10, 40)
    vertex(40, 100)
    vertex(80, 20)
    vertex(110, 80)
    vertex(260, 50)
    vertex(360, 110)
    vertex(400, 10)
    vertex(480, 120)
    // 结束绘制图形
    endShape()
    
  pop();
}
  
}

function main(){
  stage.addScene(new PlaneScene());
  stage.init();
}

