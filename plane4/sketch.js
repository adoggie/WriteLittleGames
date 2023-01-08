let img_bg;

let img_plane1;
let img_plane2;

let img_plane_another1;
let img_plane_another2;

let protect;

let img_enemy;
let img_enemy1;
let img_enemy2;
let img_enemy3;
let img_enemy4;
let img_bigone1;
let img_bigone2;
let img_bigone_hit;
let img_bigone_down1;
let img_bigone_down2;
let img_bigone_down3;

let img_bullet1;
let img_bullet2;
let bg_music;
let shoot_music;
let dead_music;
let dead_music2;
let time_index = 0;
var bullets = [];
let bullet_timer = 0;
let bullet_type = 1;//1代表初始子弹，2代表大子弹
let enemies = [];
let scores = 0;

let enemy_timer = 0;
let big_born_timer = 0;
let big_timer = 0;
let speed = 10;

var float_bonus_maker;

function preload() {
  soundFormats('mp3', 'ogg');
  img_bg = loadImage('assets/09.png');
  img_plane1 = loadImage('assets/plane.png');
  img_plane2 = loadImage('assets/plane2.png');
  img_plane_another1 = loadImage('assets/plane_another1.png');
  img_plane_another2 = loadImage('assets/plane_another2.png');
  
  protect = loadImage('assets/Protection_cover.png');
  img_enemy = loadImage('assets/enemy1.png');
  img_enemy1 = loadImage('assets/enemy1_down1.png');
  img_enemy2 = loadImage('assets/enemy1_down2.png');
  img_enemy3 = loadImage('assets/enemy1_down3.png');
  img_enemy4 = loadImage('assets/enemy1_down4.png');
  img_bigone1 = loadImage('assets/enemy3_n1.png');
  img_bigone2 = loadImage('assets/enemy3_n2.png');
  img_bigone_hit = loadImage('assets/enemy3_hit.png');
  img_bigone_down1 = loadImage('assets/enemy3_down1.png');
  img_bigone_down2 = loadImage('assets/enemy3_down4.png');
  img_bigone_down3 = loadImage('assets/enemy3_down5.png');
  
  img_bullet1= loadImage('assets/bullet1.png');
  img_bullet2= loadImage('assets/bullet5.png');
  bg_music = loadSound('assets/BOSS.mp3');
  dead_music = loadSound('assets/boom2.ogg');
  dead_music2 = loadSound('assets/boom2.mp3');
  shoot_music = loadSound('assets/bullet.ogg');
}

let Difficult ={
  easy:{
    small_health:10,
    big_health:700,
    bullet_damage_1: 35,
    bullet_damage_2: 50,
    
  },
  medium:{
    small_health:100,
    big_health:1200,
    bullet_damage_1: 55,
    bullet_damage_2: 70,
  }
};

let GameControll ={
  show_small_enemy:true,
  diff_current: Difficult.easy
}

/////////////////

function setup() {
  createCanvas(480, 700);
  bg_music.setLoop(true);
  bg_music.play();
  plane = new Plane(random(width-102),height-126,img_plane1,img_plane2);
  //float_bonus_maker = new FloatBonusMaker();
}

function make_bullet(){
  bullet_timer+=deltaTime/1000;
  if (bullet_timer>.1){
    if (bullet_type == 1){
      bullet = new Bullet(plane.x,plane.y-62,img_bullet1);
      shoot_music.play();
      bullets.push(bullet);
    }else{
      bullet2 = new Bullet2(plane.x,plane.y-62,img_bullet2);
      shoot_music.play();
      bullets.push(bullet2);
    }
    bullet_timer = 0;
  }
}


function make_small_enemies(){
  enemy_timer += 1;
  if (enemy_timer>10){
    enemy = new Enemy(random(width-71),-21,img_enemy,img_enemy3);
    enemies.push(enemy);
    enemy_timer = 0;
  }
}

function make_big_enemies(){
  big_born_timer += 1;
  if (big_born_timer>500){
    big_enemy = new Bigone(random(169/2,width-169/2),-258,img_bigone1,img_bigone2,img_bigone_hit,img_bigone_down2,img_bigone_down3,3);
    enemies.push(big_enemy);
    big_born_timer = 0;
  }
}


function is_rect_interect(rect1,rect2){
  if(is_point_in_rect(rect2,{x:rect1.x,y:rect1.y}) == true){
    return true;
  }
  if(is_point_in_rect(rect2,{x:rect1.x+rect1.w,y:rect1.y}) == true){
    return true;
  }
  if(is_point_in_rect(rect2,{x:rect1.x,y:rect1.y+rect1.h}) == true){
    return true;
  }
  if(is_point_in_rect(rect2,{x:rect1.x+rect1.w,y:rect1.y+rect1.h}) == true){
    return true;
  }
  
  
  if(is_point_in_rect(rect1,{x:rect2.x,y:rect2.y}) == true){
    return true;
  }
  if(is_point_in_rect(rect1,{x:rect2.x+rect2.w,y:rect2.y}) == true){
    return true;
  }
  if(is_point_in_rect(rect1,{x:rect2.x,y:rect2.y+rect2.h}) == true){
    return true;
  }
  if(is_point_in_rect(rect1,{x:rect2.x+rect2.w,y:rect2.y+rect2.h}) == true){
    return true;
  }
  return false;
}

function is_point_in_rect(rect,point){
  if(point.x>=rect.x 
     && point.x<=rect.x+rect.w 
     && point.y>=rect.y 
     && point.y<=rect.y+rect.h){
    return true;
  }
  return false;
}

let remove_enemies = [];

function destroy_enemy(enemy){
  // print('destroy id:',enemy.id);
  remove_enemies.push(enemy);
}

function draw() {
  background(220);
  big_timer+=1;
  image(img_bg,0,time_index-1024);
  image(img_bg,0,time_index);
  time_index+=2;
  if (time_index>=1024){
    time_index = 0;
    image(img_bg,0,time_index-1024);
  }
  plane.display();
  plane.move();
  
  for (let i = 0;i<enemies.length;i++){
    enemy = enemies[i];
    enemy.display();
    enemy.move();
    
    
    if (enemy.y>height+enemy.get_size().h ){
     remove_enemies.push(enemy);
    }
  }

  let remove_bullets = []
  for (let i = 0;i<bullets.length;i++){
    bullet = bullets[i];
    bullet.display();
    bullet.move();
    for (let i = 0;i<enemies.length;i++){
      enemy = enemies[i];
      if( enemy.hit(bullet) == true){
        remove_bullets.push(bullet);
        // if (enemy.health<=0){
        //   if( enemy.type == "small"){
        //     remove_enemies.push(enemy); 
        //   }
        // }
        break;
      }
      

    }
    
    if (bullet.y<=0){
      remove_bullets.push(bullet);
    }
  }
  
  
  make_bullet();
  if( GameControll.show_small_enemy == true){
    make_small_enemies();
  }
  

  make_big_enemies();
  
  
  for (let i = 0;i<remove_enemies.length;i++){
    let ivx = enemies.indexOf(remove_enemies[i]);
    enemies.splice(ivx,1);
    // print(remove_enemies[i].id);
  }
  
  remove_enemies = [];

  for (let i = 0;i<remove_bullets.length;i++){
    let idx = bullets.indexOf(remove_bullets[i]);
    bullets.splice(idx,1);
  }
  
  //float_bonus_maker.run();
}

function keyPressed(){
  // if(keyCode == 32){
  //   bullet = new Bullet(plane.x,plane.y-62,img_bullet1);
  //   bullet_music.play();
  //   bullets.push(bullet);
  // }
  if (keyCode == 49){
    if(bullet_type == 1){
      bullet_type = 2;
    }else{
      bullet_type = 1;
    }
    
  }
}


