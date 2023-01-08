class Player extends IconBlock{
  constructor(x,y){
    super(x,y);
    this.open = []; // 开路
    this.close = [] ; // 碰撞或已走过的路
    // this.move(x,y);
    this.target = null;

    this.start_x = x; //开始的 x,y 位置
    this.start_y = y;
    this.steps = 0 ;

    this.init();
  }

  init(){
    this.move(this.x,this.y);
    this.availableBlock();
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

    this.steps +=1;
    // block.G = this.steps;
    // block.update();


  }

  getNearestBlockWithTarget(){
    // 在open找个 H 最小的block
    this.open.sort(function (a,b) {
      return a.F - b.F;
      //return a.F ;
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

      let b = this.layout.cells[this.x][this.y];
      block.G = b.G+1;

      let cur = this.layout.cells[this.x][this.y];
      block.prev_trace = cur; // 与当前块关联

      block.update();

    }
  }



}
