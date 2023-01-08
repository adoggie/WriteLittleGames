SCREEN_WIDTH= 480;
SCREEN_HEIGHT= 700;
SPEED = 4;

let bg1_y = 0;
let bg2_y = 0;
let timer_bg = 0;
let bg_scroll_speed = 1;

let img_plane1;
let img_plane2;
let plane;
let enemy_list = [];
let img_enemy1;
let img_bullet1;
let img_down1;
let img_down2;
let img_down3;
let img_down4;

let new_enemy_timer = 0;

let dead_enemy_num = 0;

//柏拉图： 世界上只有一种声音的话，那只有是谎言

function preload(){
  img_bg = loadImage('assets/background.png');
  img_plane1 = loadImage('assets/plane.png');
  img_plane2 = loadImage('assets/plane2.png');
  img_enemy1 = loadImage('assets/enemy1.png');
  img_bullet1 = loadImage('assets/bullet1.png');
  
  img_down1 = loadImage('assets/enemy1_down1.png');
  img_down2 = loadImage('assets/enemy1_down2.png');
  img_down3 = loadImage('assets/enemy1_down3.png');
  img_down4 = loadImage('assets/enemy1_down4.png');
  
  soundFormats('mp3', 'ogg');
  bgsnd = loadSound('assets/bg.ogg');
  bulletsnd = loadSound('assets/bullet.ogg');
  sndboom = loadSound('assets/boom3.mp3');
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  plane = new Plane( img_plane1,img_plane2);
  bgsnd.play();
}

function draw() {
  // background(220);
  scroll_bg();
  textSize(20);
  text("Plane Battle V1.0 zyc",0,20);
  text("You Killed : "+dead_enemy_num,0,SCREEN_HEIGHT-10);
  
  plane.draw();
  
  new_enemy_timer += deltaTime/1000;
  if(new_enemy_timer > .5){     
    make_enemy();
    new_enemy_timer = 0;
  }
  show_enemy();
}

function make_enemy(){
  // for(let n=20 ; n >=enemy_list.length+1;n-- ){
  let num = int(random(3));
  while(num-->0)
    enemy_list.push(new Enemy(img_enemy1 , new StraightPath()));
  // }
}

function show_enemy(){
  let remove_list = [];
  for(let n=0;n<enemy_list.length;n++){
    enemy_list[n].draw();
    if( enemy_list[n].is_visible() == false){
      remove_list.push(enemy_list[n]);
    }
  }
  
  for(let n=0;n<remove_list.length;n++){
    let idx = enemy_list.indexOf( remove_list[n] );
    enemy_list.splice(idx,1);
  }
  
  
  
  
}

function draw_bg(){
  image(img_bg,0,bg1_y,SCREEN_WIDTH,SCREEN_HEIGHT);
  image(img_bg,0,bg2_y);  
  bg1_y += bg_scroll_speed;
  bg2_y = bg1_y - SCREEN_HEIGHT;
  if(bg1_y == SCREEN_HEIGHT){
    bg1_y = 0;
  } 
  
 
}

function scroll_bg(){
  timer_bg += deltaTime / 1000;
  if( timer_bg > 0.01){
    draw_bg();
    timer_bg = 0;
  }
}