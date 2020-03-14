
timer = 0;

function setup() {
  GameBoard.instance.setup();
  player =  new Player(4,4);
  target =  new IconBlock(12,12);
  target.color = 'blue';
  player.findPath();
}

function draw() {
  background('white');
  GameBoard.instance.draw();
  timer+=deltaTime/1000;
  if(timer > 0.1){
    player.findPath();
    timer = 0;
  }

  player.draw();
  target.draw();
}

//邻居块
class Neighbors{
  constructor(owner){
    this.owner = owner;
  }

  //返回所有邻居块
  blocks(){
  }

  openBlocks(){
  }

  closeBlcoks(){
  }

  bricks(){

  }
}

class Layout{
  constructor(){
    this.cols = 14;
    this.rows = 14 ;
    this.cell_size = 32; // 网格单元大小
    this.bricks = [];

    this.blocks = [];
  }

  draw(){
    push();
    stroke('grey');
    for(let r=0;r<=this.rows;r++){
      line(0,r*this.cell_size,this.cols*this.cell_size,r*this.cell_size);
    }
    for(let c=0;c<=this.cols;c++){
      line(c*this.cell_size,0,c*this.cell_size,this.cell_size*this.rows);
    }

    //网格编号
    for(let c = 0; c< this.cols;c++){
      for(let r = 0; r< this.rows;r++){
        let x = r * this.cell_size ; //+ this.cell_size/2;
        let y = c * this.cell_size + this.cell_size/2;
        // text(r+','+c,x,y);
      }
    }
    pop();

    for(let c=0;c< this.cols ; c++){
      for(let r=0;r<this.rows ; r++){
        let block  = this.cells[c][r];
        //if(block!= undefined) {
          block.draw();
        //}
          if( block instanceof Player){
            print('player draw..');
          }
      }

    }
  }

  init(){
    this.cells = new Array(this.cols);
    for(let n=0;n<this.cols;n++){
      this.cells[n] = new Array(this.rows);
      for(let m=0;m< this.rows;m++){
        this.cells[n][m] = new PathBlock(n,m);

      }
    }
    // 一圈围墙
    for(let x=0;x < this.cols;x++){
      this.cells[x][0] = new Brick(x,0); // top
       this.cells[x][this.rows-1] = new Brick(x,this.rows-1); // bottom
    }
    //
    for(let y=0;y < this.rows;y++){
      this.cells[0][y] = new Brick(0,y);
      this.cells[this.cols-1][y] = new Brick(this.cols-1,y);
    }
    //
    // 中间一道竖隔墙
     for(let y=4;y < this.rows-4;y++){
      this.cells[this.cols/2][y] = new Brick(this.cols/2,y);
    }

    for(let y=4;y < this.rows;y++){
      this.cells[this.cols/2][y] = new Brick(this.cols/2,y);
    }
  }

  addBlock(block){
    this.cells[block.y][block.x] = block;
  }
}

//游戏网格盘
class GameBoard{
  constructor(cfgs) {
    this.cfgs = cfgs;
    this.blocks = [];
  }
  init(){
    return this;
  }

  addBlock(block){
    this.layout.addBlock(block);
    return block;
  }

  loadLayout(layout){
    this.layout = layout;
    layout.init();
  }

  setup(){
    let w,h;
    w = this.layout.cols * this.layout.cell_size;
    h = this.layout.rows * this.layout.cell_size;
    createCanvas(w,h);
  }

  draw(){
    this.layout.draw();

  }
}


// 游戏块
class Block{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.nb = new Neighbors(this);
    // GameBoard.instance.blocks.push(this);
    this.layout = GameBoard.instance.layout;
    this.border_color = 'blue';
  }

  neighbors(){
    return this.nb;
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
    this.G = this.distanceManhattan(player.x,player.y);
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
    textSize(10);
    stroke('grey');
    text(": "+this.F,x+5 - this.layout.cell_size/2,y);
    text(": "+this.G,x+5 - this.layout.cell_size/2,y+this.layout.cell_size/2 - 5);
    text(": "+this.H,x+5 ,y+this.layout.cell_size/2 -5) ;
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

GameBoard.instance = new GameBoard().init();
GameBoard.instance.loadLayout(new Layout());

class BlockIndex{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  equal(other){
    return this.x == other.x && this.y == other.y;
  }
}

class Player extends IconBlock{
  constructor(x,y){
    super(x,y);
    this.open = []; // 开路
    this.close = [] ; // 碰撞或已走过的路
    // this.move(x,y);
    this.target = null;
    this.move(x,y);
  }

  addCloseList(block){
     for(let n=0;n< this.close.length;n++){
      let _ = this.close[n];
      if( _ == block){
        return;
      }
    }
    this.close.push(block);
  }

  removeCloseList(block){
    for(let n=0;n< this.close.length;n++){
      let _ = this.close[n];
      if( _ == block){
        this.close.splice(n,1);
        return;
      }
    }
  }

  move(x,y){
    let block = this.layout.cells[x][y];
    this.removeOpenList(block);
    this.addCloseList(block);
    block.type = CLOSE;
    block.trace = true;
    this.x = x;
    this.y = y;
  }

  findPath(){
    // 计算 close, open
    // this.addCloseList(this);
    this.availableBlock();
    let block = this.getNearestBlockWithTarget();

    this.move(block.x,block.y);

  }

  getNearestBlockWithTarget(){
    // 在open找个 H 最小的block
    this.open.sort(function (a,b) {
      return a.H - b.H;
    });
    return this.open[0];
  }

  addOpenList(block){
    for(let n=0;n< this.open.length;n++){
      let _ = this.open[n];
      if( _ ==  block){
        return;
      }
    }

    this.open.push(block);
  }

  removeOpenList(block){
    for(let n=0;n< this.open.length;n++){
      let _ = this.open[n];
      if( _ == block ){
        this.open.splice(n,1);
        return;
      }
    }
  }

  availableBlock(){
    //查找附近可走的block,
    let up = this.layout.cells[this.x][this.y-1];
    let left = this.layout.cells[this.x-1][this.y];
    let right = this.layout.cells[this.x+1][this.y];
    let down = this.layout.cells[this.x][this.y+1];

   this.verifyBlock(up);
   this.verifyBlock(left);
   this.verifyBlock(right);
   this.verifyBlock(down);

  }

  verifyBlock(block){
    if( block instanceof Brick){
      this.addCloseList(block);
      block.type = OPEN;
      // block.update();
    }
    if( block.type == UNKNOWN){
      block.type = OPEN;
      this.addOpenList(block);
      block.update();
    }
  }



}