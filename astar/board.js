class Layout{
  constructor(){
    this.cols = 14;
    this.rows = 14 ;
    this.cell_size = 38; // 网格单元大小
    this.bricks = [];

    this.blocks = [];
  }

  getSize(){
    return {w:this.cols* this.cell_size,h:this.rows * this.cell_size};

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
      // this.cells[this.cols/2][y] = new Brick(this.cols/2,y);
    }
  }

  reset(){
  // 清除 PathBlock的属性值
    for(let n=0;n<this.cols;n++){

      for(let m=0;m< this.rows;m++){
        let block = this.cells[n][m] ;
        if( block instanceof PathBlock){
            block.reset();
        }

      }
    }

  }


  addBlock(block){
    this.cells[block.y][block.x] = block;
  }

  addBrick(x,y){
    this.cells[x][y] = new Brick(x,y);
  }

  removeBrick(x,y){
    this.cells[x][y] = new PathBlock(x,y);
  }

  addOrRemoveBrick(x,y){
    let block =  this.cells[x][y] ;
    if( block instanceof PathBlock){
      this.addBrick(x,y);
    }
    if(block instanceof Brick){
      this.removeBrick(x,y);
    }
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

GameBoard.instance = new GameBoard().init();
GameBoard.instance.loadLayout(new Layout());
