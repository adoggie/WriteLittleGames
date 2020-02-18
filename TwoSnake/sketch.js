var w = 10;
var h = 10;
let img;
function preload() {
  img = loadImage('assets/apple.jpg');
  eatSound = loadSound('assets/eatApple.mp3');
}


function setup() {
  map = new Map(20,20,30,false);
  createCanvas(map.w*map.size,map.h*map.size);
  snake1 = new Snake(4,3,2,200,255);
  snake2 = new Snake(7,3,2,255,200);
  apple = new Apple(int(random(map.w)),int(random(map.h)));
}

function draw() {
  background(247);
  // image(img, 0, 0);
  map.display();
  snake1.display();
  snake2.display();
  apple.display();
  if (snake1.head.x == apple.x && snake1.head.y == apple.y){
    apple.x = int(random(map.w-1));
    apple.y = int(random(map.h-1));
    eatSound.play();
    snake1.add_tail();
  }
  if (snake2.head.x == apple.x && snake2.head.y == apple.y){
    apple.x = int(random(map.w-1));
    apple.y = int(random(map.h-1));
    eatSound.play();
    snake2.add_tail();
  }
}


function keyPressed(){
  if (keyCode == LEFT_ARROW){
    snake1.move('left',1);
  }
  if (keyCode == RIGHT_ARROW){
    snake1.move('right',1);
  }
  if (keyCode == UP_ARROW){
    snake1.move('up',1);
  }
  if (keyCode == DOWN_ARROW){
    snake1.move('down',1);
  }
  if (keyCode == 65){
    snake2.move('left',1);
  }
  if (keyCode == 68){
    snake2.move('right',1);
  }
  if (keyCode == 87){
    snake2.move('up',1);
  }
  if (keyCode == 83){
    snake2.move('down',1);
  }
  if (keyCode == 49){
    map.show = true;
    print(keyCode);
  }
  if (keyCode == 50){
    map.show = false;
  }
}
