let bg;
let dd;
let pf;
let platforms = [];
function preload() {
  bg = loadImage('assets/background.png');
  dd = loadImage('assets/doodle.png');
  pf = loadImage('assets/platform.png');
  jumpSound = loadSound('assets/jump3.mp3');
}

function setup(){
  createCanvas(400,533);
  //doodle = new Doodle(random(0,width-80),random(0,height-80),5);
  doodle = new Doodle(90,200,5);
  for (let i = 0;i<10;i++){
    platforms[i] = new Platform(random(0,width),random(0,height));
  }
}


function draw(){
  background(0);
  image(bg, 0, 0);
  doodle.display();
  doodle.move();
  isScroll = false;
  scrollValue = 0;
  H= 200;
  
  if(doodle.y < H ){
    doodle.y = H;
    for (let a = 0;a<platforms.length;a++){
      platform = platforms[a];
      platform.y-=doodle.speed;
      if (platform.y>=height){
        platform.x = random(0,width);
        platform.y = random(0,100)
      }
    }
  }
  
  
  for (let a = 0;a<platforms.length;a++){
    platform = platforms[a];
    platform.display();
    if (doodle.x+60 >= platform.x && doodle.x+20 <=platform.x+68 && doodle.y+80>=platform.y && doodle.y+80<=platform.y+14&& doodle.speed>=0){
      doodle.speed = -10;
      jumpSound.play();
      
      if (true){ //(doodle.y<=200){
        isScroll = true;
        scrollValue = 100;
        if(doodle.y <250){
          scrollValue = doodle.y;
        }
        //doodle.y+=0;
        //scrollValue = doodle.y;
      }
    }
  }
  // if (isScroll == true){
  //   for (let a = 0;a<platforms.length;a++){
  //     platform = platforms[a];
  //     platform.y+=100;
  //     if (platform.y>=height){
  //       platform.x = random(0,width);
  //       platform.y = random(0,100)
  //     }
  //   }
  // }
  
  if (mouseIsPressed && mouseX<=doodle.x){
    doodle.x-=5
  }
  if (mouseIsPressed && mouseX>=doodle.x){
    doodle.x+=5
  }
}

class Doodle{
  constructor(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
  }
  
  display(){
    image(dd, this.x, this.y);
  }
  
  move(){
    this.speed += 0.2;
    this.y+=this.speed;
    if (this.y >= height-75){
      this.speed = -10;
      jumpSound.play();
    }
    
  }
}

class Platform{
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    image(pf,this.x,this.y)
  }

}