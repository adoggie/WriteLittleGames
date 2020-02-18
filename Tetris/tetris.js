var M = 20;
var N = 10;

TILE_SIZE = 18;
SCREEN_BLOCK_SIZE = 64;


class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

//整个游戏区域由 M x N 个网格块构成
var field = new Array(M);
//每个field[n] 存放的颜色编号 1 －7  ， 0 表示未占据色块
//以下初始化网格
for (let m = 0; m < M; m++) {
  field[m] = new Array(N);
  for (let n = 0; n < N; n++) {
    field[m][n] = 0; // 未占据图块
  }
}

// a,b 为当前移动的图块数组
var a = new Array(4);
var b = new Array(4);

for (let i = 0; i < 4; i++) {
  a[i] = new Point();
  b[i] = new Point();
}

//形状
var figures = [
  [1, 3, 5, 7], // I
  [2, 4, 5, 7], // Z
  [3, 5, 4, 6], // S
  [3, 5, 4, 7], // T
  [2, 3, 5, 7], // L
  [3, 5, 7, 6], // J
  [2, 3, 4, 5], // O
];

var dx = 0; //左右移动单位
var rotate = 0; //是否旋转单位
var colorNum = 1; // tile 颜色块的编号
var timer = 0;
var delay = .8;
//delay=1;
var paused = false;

function check() {
  for (i = 0; i < 4; i++) {
    if (a[i].x < 0 || a[i].x >= N || a[i].y >= M) // 是否超越屏幕
      return false;
    else if (field[a[i].y][a[i].x]) //地图网格这个(x,y)是否已被占据
      return false;
  }
  return true;
}

let tiles;

function preload() {
  tiles = loadImage('assets/tiles.png');
  soundFormats('mp3', 'ogg');
  bgsnd = loadSound('assets/bg.mp3');
}


// function preload() {
//   soundFormats('mp3', 'ogg');
//   bgsnd = loadSound('assets/bg.ogg');
// }
function setup() {
  s1 = int(window.innerHeight / M);
  s2 = int(window.innerWidth / N);
  SCREEN_BLOCK_SIZE = s1 < s2 ? s1 : s2;
  createCanvas(N * SCREEN_BLOCK_SIZE, M * SCREEN_BLOCK_SIZE);
  bgsnd.setLoop(true);
  bgsnd.play();
  // alert(field[0].length);
  newFigure();
}

function newFigure() {
  colorNum = 1 + random([0, 1, 2, 3, 4, 5, 6]);
  // n = rand() % 7; //随机出一个图案花色
  n = random([0, 1, 2, 3, 4, 5, 6]); //随机出一个图案花色
  off_x =  int(random(0,N-2));
  off_y = 0;
  for (i = 0; i < 4; i++) { // 计算每个块的xy坐标
    a[i].x = figures[n][i] % 2;
    a[i].y = int(figures[n][i] / 2);
    a[i].x += off_x;
  }
  delay = .8;
}


function mouseClicked() {
  // alert(mouseX);
  if (mouseY > height / 10 * 9 && mouseX > width / 3 && mouseX < width / 3 * 2) {
    delay = 0.01;
    return;
  }

  if (mouseX < width / 3) {
    dx--;
  } else if (mouseX > width / 3 * 2) {
    dx++;
  } else {
    rotate = 1;
  }

  if (mouseX < width / 3 && mouseY < 50) {
    if (!paused) {
      paused = true;
    } else {
      paused = false;
    }
  }
}
//
// function doubleClicked() {
//     delay = 0.01;
// }

function draw() {
  background(0, 0, 0, 200);
  textSize(20);
  text("俄罗斯方块 V1.0 zyc",0,20);
  stroke('white');
  line(width / 3, 0, width / 3, height);
  line(width / 3 * 2, 0, width / 3 * 2, height);
  line(0, height / 10 * 9, width, height / 10 * 9);

  // strokeWeight(5);
  textSize(28);
  text("Left", 0, height / 2);
  text("Right", width / 3 * 2, height / 2);
  text("Rotate", width / 3, height / 2);
  text("AccDown", width / 3 * 1, height / 20 * 19);
  // return ;

  // text( (millis()/1000).toFixed(2),10,50);
  // timer+= (millis()/1000).toFixed(2);
  timer += deltaTime / 1000;
  // return ;
  key_check();

  //// <- Move -> ///
  for (i = 0; i < 4; i++) {
    b[i].x = a[i].x; // 先保存当前位置
    b[i].y = a[i].y;
    a[i].x += dx; // 左右移动一下
  }
  // 越界了，还原 b->a 位置
  if (!check()) {
    for (i = 0; i < 4; i++) {
      a[i].x = b[i].x;
      a[i].y = b[i].y;
    }
  }

  //////Rotate//////
  if (rotate == 1) { //第二个点是旋转点
    let p = a[1]; //center of rotation
    for (i = 0; i < 4; i++) {
      x = a[i].y - p.y;
      y = a[i].x - p.x;
      a[i].x = p.x - x;
      a[i].y = p.y + y;
    }
    if (!check()) { // 碰撞了，还原
      for (i = 0; i < 4; i++) {
        a[i].x = b[i].x;
        a[i].y = b[i].y;
      }
    }
  }

  ///////Tick//////
  if (timer > delay) { //时间触发一次移动


    for (i = 0; i < 4; i++) {
      b[i].x = a[i].x; // 赋值一份
      b[i].y = a[i].y; // 赋值一份
      if (!paused) {
        a[i].y += 1; // 下降一行
      }

    }

    if (!check()) { // 有碰撞或无效了,此刻生成新的块图案
      for (i = 0; i < 4; i++) {
        field[b[i].y][b[i].x] = colorNum; //到达底部行
      }

      newFigure();
      // colorNum = 1 + random([0, 1, 2, 3, 4, 5, 6]);
      // // n = rand() % 7; //随机出一个图案花色
      // n = random([0, 1, 2, 3, 4, 5, 6]); //随机出一个图案花色
      // for (i = 0; i < 4; i++) { // 计算每个块的xy坐标
      //   a[i].x = figures[n][i] % 2;
      //   a[i].y = int(figures[n][i] / 2);
      // }
      // delay = 0.3;
    }
    timer = 0; // 计数器清零
  }

  ///////check lines//////////
  k = M - 1;
  for (i = M - 1; i > 0; i--) {
    count = 0;
    for (j = 0; j < N; j++) { // 自下而上扫描非空的单元
      if (field[i][j] != 0) { // 如果单元格有颜色值
        count++;
      }
      field[k][j] = field[i][j]; //消除一行
    }
    if (count < N) k--; // 一行未全部占据,检查行k往上移动一行
  }

  dx = 0;
  rotate = 0;
  // delay = 0.3;

  for (i = 0; i < M; i++)
    for (j = 0; j < N; j++) {
      if (field[i][j] == 0) continue; //无颜色块，忽略
      // s.setTextureRect(IntRect(field[i][j] * 18, 0, 18, 18)); //图像 width:18,heigh:18

      image(tiles, j * SCREEN_BLOCK_SIZE, i * SCREEN_BLOCK_SIZE, SCREEN_BLOCK_SIZE, SCREEN_BLOCK_SIZE, field[i][j] * 18, 0, 18, 18);

      // s.setPosition(j * 18, i * 18);
      // s.move(28, 31); //offset
      // window.draw(s);
    }

  for (i = 0; i < 4; i++) {
    // s.setTextureRect(IntRect(colorNum * 18, 0, 18, 18));
    // s.setPosition(a[i].x * 18, a[i].y * 18);
    // s.move(28, 31); //offset
    // window.draw(s);

    image(tiles, a[i].x * SCREEN_BLOCK_SIZE, a[i].y * SCREEN_BLOCK_SIZE, SCREEN_BLOCK_SIZE, SCREEN_BLOCK_SIZE, colorNum * 18, 0, 18, 18);
  }

}

function key_check() {
  if (keyIsDown(LEFT_ARROW)) {
    dx -= 1;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    dx += 1;
  }
  if (keyIsDown(UP_ARROW)) {
    rotate = 1;
  }
}

function keyPressed() {

}