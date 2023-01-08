

class BlockIndex{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
// 游戏块
class Block{
  constructor(x,y){
    this.x = x;
    this.y = y;

    this.layout = GameBoard.instance.layout;
    this.border_color = 'blue';
  }


  draw(){
  }
}

UNKNOWN = 0;
OPEN = 2;
CLOSE = 1;
// TRACE = 3; //已经是轨迹点了

class PathBlock extends Block{
  constructor(x,y){
    super(x,y);
    this.reset();
    this.prev_trace = null; // 寻路过程中关联轨迹上前一个块


  }

  reset(){
    this.type = UNKNOWN;
    this.border_color = 'green';
    this.trace = false;
    this.F = 0;
    this.G = 0;
    this.H = 0;
    //F（方块的和值）：左上角
    // G（从A点到方块的移动量）：左下角
    // H（从方块到B点的估算移动量): 右下角
    this.target = null;
    this.is_path = false; // 是否是最短路径上的点
  }

  setTarget(block){
    this.target = block;
  }

  distanceManhattan(x,y){
    let dist = abs(x - this.x) + abs(y - this.y);
    return dist;
  }

  update(){
    this.H = this.distanceManhattan(target.x,target.y);
    // this.G = this.distanceManhattan(player.start_x,player.start_y);
    this.F = this.H + this.G;
  }

  draw(){
    if(this.type == UNKNOWN){
      return;
    }
    push();
    noFill();
    rectMode(CENTER);
    if( this.type == CLOSE){
      this.border_color = 'grey';
    }else{
      this.border_color = 'green';
    }
    stroke(this.border_color);
    // strokeWeight(3);
    let x = this.layout.cell_size * this.x + this.layout.cell_size/2;
    let y = this.layout.cell_size * this.y + this.layout.cell_size/2;
    rect(x,y,this.layout.cell_size-4,this.layout.cell_size-4);
    if( this.trace) {
      fill('red');
      circle(x, y, 10);
    }
    if( this.is_path ){
        fill('green');
        circle(x, y, 20);
    }
    textSize(8);
    stroke('grey');
    fill('grey');
    text(""+this.F,x+5 - this.layout.cell_size/2,y);
    text(""+this.G,x+5 - this.layout.cell_size/2,y+this.layout.cell_size/2 - 5);
    text(""+this.H,x+5 ,y+this.layout.cell_size/2 -5) ;
    pop();
  }
}

//砖块，障碍
class Brick extends Block{
  constructor(x,y){
    super(x,y);
  }

  draw(){
    push();
    fill('black');
    rectMode(CENTER);
    let x = this.layout.cell_size * this.x + this.layout.cell_size/2;
    let y = this.layout.cell_size * this.y + this.layout.cell_size/2;
    rect(x,y,this.layout.cell_size-4,this.layout.cell_size-4);
    pop();
  }
}

class IconBlock extends PathBlock{
  constructor(x,y){
    super(x,y);
    this.color = 'red';
    this.border_color = 'red';
  }

  draw(){
    super.draw();
    push();
    stroke(this.color);
    fill(this.color);
    let x = this.layout.cell_size * this.x + this.layout.cell_size/2;
    let y = this.layout.cell_size * this.y + this.layout.cell_size/2;
    circle(x,y,20);
    pop();
  }
}
