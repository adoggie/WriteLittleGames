

let bg;
let dd;
let pf;
let platforms = [];
let bubble_list = [];
let score = 0;
function preload() {
  bg = loadImage('assets/background.png');
  dd = loadImage('assets/doodle.png');
  pf = loadImage('assets/platform.png');
  dd = loadImage('assets/ssj.png');
  jumpSound = loadSound('assets/jump3.mp3');
  for(var i = 0 ; i < 1000 ;i += 1){
    var bubble = new Bubble();
    bubble_list.push(bubble);
  }
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
  for (let a = 0;a<platforms.length;a++){
    platform = platforms[a];
    platform.display();
    if (doodle.x+60 >= platform.x && doodle.x+20 <=platform.x+68 && doodle.y+80>=platform.y && doodle.y+80<=platform.y+14&& doodle.speed>=0){
      doodle.speed = -10;
      jumpSound.play();
      score+=1;
      
      if (true){ //(doodle.y<=200){
        isScroll = true;
        scrollValue = 100;
        if(doodle.y <250){
          scrollValue = doodle.y;
        }
      }
    }
  }
  for (var e = 0 ; e<bubble_list.length ; e += 1){
    var babble = bubble_list[e];
    //babble.move();
    //babble.display();
  }
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
  
  
  fill(0);
  textSize(25);
  text('SJ Jump!', 10, 30);
  fill(0);
  textSize(15);
  text('by zyc    v.2.0    2020.1.29', 10, 531);
  fill(0);
  textSize(25);
  text('score:'+score, 300, 30);
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
    this.rad = 1;
  }
  
  display(){
    push();
    translate(this.x+40,this.y+40);
    this.rad +=0.1
   
    rotate(this.rad);
    image(dd, -40 ,-40,80,80,0,0,48,60);
    //image(dd, this.x, this.y,80,80,0,0,48,60);
    pop();
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

class Bubble{
  constructor(){
    this.x = random(width);
    this.y = random(height);
  }

  move(){
    this.x += random(-10,10);
    this.y += random(-10,10);
  }

  display(){
    noStroke()
    fill(255,10);
    circle(this.x,this.y,random(0,width),random(0,height));
  }
}
