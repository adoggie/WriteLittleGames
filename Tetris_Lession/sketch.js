N=10;
M=20;
SIZE =48 ;
IMAGE_SIZE = 18;
let tiles;
let tile;
var figures = [
    [1, 3, 5, 7], // I
    [2, 4, 5, 7], // Z
    [3, 5, 4, 6], // S
    [3, 5, 4, 7], // T
    [2, 3, 5, 7], // L
    [3, 5, 7, 6], // J
    [2, 3, 4, 5], // O
];
let figure;
let timeBasket = 0;

let figure_show_text = false;

function preload() {
  tiles = loadImage('assets/tiles.png');
}
function setup() {
  createCanvas(N*SIZE, M*SIZE);
  figure = new Figure(N/2-2,M/2-4,int(random(0,7)));
  // figure = new Figure(0,0,3);
}

function mousePressed(){
  if (mouseX > figure.x*SIZE){
    figure.right();
    //print (figure.x);
  }
  if (mouseX < figure.x*SIZE){
    figure.left();
    //print (figure.x);
  }
  
  if (mouseY > figure.y*SIZE){
    figure.down();
    }

    if (mouseY < figure.y*SIZE){
      figure.up();
    }
}

function draw() {
  background(220);
  for (let index = 0;index<=N;index++){
    line(index*SIZE,0,index*SIZE,M*SIZE);
  }
  for (let index = 0;index<=M;index++){
    line(0,index*SIZE,N*SIZE,index*SIZE);
  }
  
  for(let x=0;x<N;x++){
    for(let y=0;y<M;y++){
      let xy = x+","+y;
      w = textWidth(xy);
      let px = x*SIZE + (SIZE-w)/2;
      let py = y*SIZE + (SIZE/2);
      text(xy,px,py);
    }
  }
  
  figure.display();
  timeBasket+=deltaTime/1000;
  if (timeBasket>=1){
    //figure.move();
    timeBasket = 0;
  }
}


class Block{
  constructor(x,y){
    this.x = x;
    this.y = y;
    
  }
}

function keyPressed(){

  if(keyCode == UP_ARROW || keyCode == 50){
    figure.rotate();
  }
  if(keyCode ==49){
    figure_show_text = !figure_show_text;
  }
   
  
}

class Figure{
  constructor(x,y,index){
    this.x = x;
    this.y = y;
    this.index = index;
    this.col = int(random(0,8));
    this.blocks = [];
    for (let i = 0;i<4;i++){
      this.blocks.push(new Block(0,0))
    }
    let f = figures[index];
    for(let n=0;n<4;n++){
      this.blocks[n].x = f[n]%2 + this.x;
      this.blocks[n].y = int(f[n]/2) + this.y;
    }
  }
  
  display(){
    push();
    // fill('white');
    stroke('red');
    strokeWeight(5);
    rect(this.x*SIZE,this.y*SIZE,SIZE * 2,SIZE * 4);
    
    for (let a = 0;a<this.blocks.length;a++){
        image(tiles,this.blocks[a].x*SIZE,this.blocks[a].y*SIZE,SIZE,SIZE,this.col*IMAGE_SIZE,0,IMAGE_SIZE,IMAGE_SIZE);
    }
    
    //绘制figure轮廓
    
    
    // let t = '0\n(0,0)';
    textSize(16);
    stroke('black');
    strokeWeight(1);
    
    line(this.x*SIZE+SIZE,this.y*SIZE,this.x*SIZE+SIZE,this.y*SIZE+SIZE *4);
    line(this.x*SIZE,this.y*SIZE + SIZE, this.x*SIZE+SIZE*2,this.y*SIZE + SIZE);
    line(this.x*SIZE,this.y*SIZE + SIZE*2, this.x*SIZE+SIZE*2,this.y*SIZE + SIZE*2);
    line(this.x*SIZE,this.y*SIZE + SIZE*3, this.x*SIZE+SIZE*2,this.y*SIZE + SIZE*3);
    
    
    if(figure_show_text){
      text('0\n(0,0)',this.x*SIZE + (SIZE - textWidth('0\n(0,0)'))/2,this.y*SIZE+SIZE/2);
      text('1\n(0,1)',this.x*SIZE+SIZE + (SIZE - textWidth('1\n(0,1)'))/2,this.y*SIZE+SIZE/2);

      text('2\n(1,0)',this.x*SIZE + (SIZE - textWidth('2\n(1,0)'))/2,this.y*SIZE+SIZE+SIZE/2);
      text('3\n(1,1)',this.x*SIZE+SIZE + (SIZE - textWidth('1\n(1,1)'))/2,this.y*SIZE+SIZE+SIZE/2);

      text('4\n(2,0)',this.x*SIZE + (SIZE - textWidth('4\n(2,0)'))/2,this.y*SIZE+SIZE*2+SIZE/2);
      text('5\n(2,1)',this.x*SIZE+SIZE + (SIZE - textWidth('5\n(2,1)'))/2,this.y*SIZE+SIZE*2 + SIZE/2);

      text('6\n(3,0)',this.x*SIZE + (SIZE - textWidth('0\n(0,0)'))/2,this.y*SIZE+SIZE*3+SIZE/2);
      text('7\n(3,1)',this.x*SIZE+SIZE + (SIZE - textWidth('1\n(0,1)'))/2,this.y*SIZE+SIZE*3+SIZE/2);

    }
    
    //绘制旋转点
    fill('yellow');
    let x1 = this.blocks[1].x;
    let y1 = this.blocks[1].y ;
    circle(x1*SIZE+SIZE/2,y1*SIZE+SIZE/2,20);
    
    pop();
  }
  
  move(){
    for (let i = 0;i<this.blocks.length;i++){
      if (this.blocks[i].y<=M){
        this.blocks[i].y+=1;
      }
    }
  }
  
  up(){
    this.y-=1;
    for (let i = 0;i<this.blocks.length;i++){
      if (this.blocks[i].y<=M){
        this.blocks[i].y-=1;
      }
    }
  }
  
  down(){
    this.y+=1;
    for (let i = 0;i<this.blocks.length;i++){
      if (this.blocks[i].y<=M){
        this.blocks[i].y+=1;
      }
    }
  }
  
  left(){
    for (let i = 0;i<this.blocks.length;i++){
      this.blocks[i].x-=1;
    }
    this.x-=1;
  }
  
  right(){
    for (let i = 0;i<this.blocks.length;i++){
      this.blocks[i].x+=1;
    }
    this.x+=1;
  }
  
  rotate(){
    //按旋转点逆时针旋转90度
    let p = this.blocks[1];
    for(let n=0;n<this.blocks.length;n++){
      let b = this.blocks[n];
      // print('n:',n,' p.x:',p.x,' p.y',p.y ,' b.x:',b.x,' b.y:',b.y);
      let dx = p.x - ( p.y - b.y);
      let dy = p.y + (p.x - b.x)
      b.x = dx;
      b.y = dy;
      // print('..','b.x:',b.x,' b.y:',b.y);
    }
  }
}