

// https://www.cnblogs.com/zhoug2020/p/3468167.html

timer = 0;

running = false;

function start() {
  GameBoard.instance.layout.reset();
  target =  new IconBlock(12,12);
  target.color = 'blue';
  player =  new Player(4,4);


  // player.findPath();
}

function setup() {
  GameBoard.instance.setup();
  start();
}

function draw() {
  background('white');
  GameBoard.instance.draw();

  player.draw();
  target.draw();

    if(!running) {
        return ;
      }
  //到达终点
  if(player.x == target.x && player.y == target.y){
        running = false;
        //开始回溯，标记出最短轨迹
        trace_back();
    }


  timer+=deltaTime/1000;
  if(timer > .1){
      player.findPath();

    timer = 0;
  }

}

function trace_back() {
   let block = GameBoard.instance.layout.cells[target.x][target.y];
   while(block.prev_trace != null){
    print(block.x+':'+block.y);
    block = block.prev_trace;
    block.is_path = true;
   }
}

function  keyPressed() {
    if ( keyCode == 32){
      running = !running;
    }

    //'s' 输出layout
    if (keyCode == 83) {
    }

  //'r' 重置
    if (keyCode == 82) {
      start();
    }
}

function mousePressed() {
  let size = GameBoard.instance.layout.getSize();
  let x = int(mouseX / GameBoard.instance.layout.cell_size);
  let y = int(mouseY / GameBoard.instance.layout.cell_size);
  print(x+':'+y);
  GameBoard.instance.layout.addOrRemoveBrick(x,y);
  // 'a' 添加brick
    if (keyCode == 65) {
      GameBoard.instance.layout.addBrick(x,y);
    }

    // 'b' 删除brick
    if (keyCode == 66) {
      GameBoard.instance.layout.removeBrick(x,y);
    }
}

