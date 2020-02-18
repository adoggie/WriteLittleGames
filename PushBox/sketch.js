let w = 400;
let h = 400;
let L = 40;
let T = 40;
let boxes = [];



function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('sound/water-drop.mp3');
}

function setup() {
  createCanvas(w, h);
  snake = new Snake(int(random(w/L)),int(random(h/T)));
  door = new Door(int(random(w/L)),int(random(h/T)));
  create_boxes(5);

}

function create_boxes(num){
  for (let index = 0;index<num;index++){
    let a = int(random(w/L));
    let b = int(random(h/T));
    if (a == 0){
      a++;
    }
    if (a == w/L-1){
      a--;
    }
    if (b == 0){
      b++;
    }
    if (b == h/T-1){
      b--;
    }
    let bb = new Box(a,b);
    boxes.push(bb);
  }
}


function draw() {
  background(220);
  door.display();
 
  for (let i =0;i<=w;i+=L){
    line(0,i,h,i);
  }
  for (let a =0;a<=h;a+=T){
    line(a,0,a,w);
  }
  for (let x = 0;x<=w/L;x+=1){
    for (let y = 0;y<=h/T;y+=1){
      fill(255)
      circle(x*L+L/2,y*T+T/2,10)
    }
  }
  snake.display();
  for (let invex = 0;invex<boxes.length;invex++){
    let b = boxes[invex];
    // print('---',b);
    b.display();
  }
  //box.move();

}

function keyPressed(){
  print(keyCode);
  if (keyCode == UP_ARROW){
    snake.move('up',1);
    for (let q= 0;q<boxes.length;q++){
      box = boxes[q];
      if (snake.x == box.x && snake.y == box.y){
        box.move('up',1);
        if (box.x == door.x && box.y == door.y){
          boxes.splice(q,1);
          mySound.play();
        }
        break;
      }
    }
  }
  if (keyCode == DOWN_ARROW){
    snake.move('down',1);
    for (let q=0;q<boxes.length;q++){
      box = boxes[q];
      if (snake.x == box.x && snake.y == box.y){
        box.move('down',1);
        if (box.x == door.x && box.y == door.y){
          boxes.splice(q,1);
          mySound.play();
        }
        break;
      }
    }
  }
  if (keyCode == LEFT_ARROW){
    snake.move('left',1);
    for (let q=0;q<boxes.length;q++){
      box = boxes[q];
      if (snake.x == box.x && snake.y == box.y){
        box.move('left',1);
        if (box.x == door.x && box.y == door.y){
          boxes.splice(q,1);
          mySound.play();
        }
        break;
      }
    }
  }
  if (keyCode == RIGHT_ARROW){
    snake.move('right',1);
    for (let q=0;q<boxes.length;q++){
      box = boxes[q];
      if (snake.x == box.x && snake.y == box.y){
        box.move('right',1);
        if (box.x == door.x && box.y == door.y){
          boxes.splice(q,1);
          mySound.play();
        }
        break;
      }
    }
  }
}

function keyTyped(){
  print(key);
  
}





