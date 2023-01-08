let birds = [];
let remove_bullets = [];
let bullet_list = [];
let bird_1;
let bird_2;
let bird_3;
let bird_4;
let scores = 0;
let bird_timer = 0;
let remove_birds = [];
function preload() {
  bird_1 = loadImage('assets/1.png');
  bird_2 = loadImage('assets/2.png');
  bird_3 = loadImage('assets/3.png');
  bird_4 = loadImage('assets/4.png');
}
function setup() {
  createCanvas(600, 400);
  cannon = new Cannon(300,400);
  bird = new Bird(-85,random(0,200),bird_1,bird_2,bird_3,bird_4);
  // make_birds();
  
}

function make_birds(){
  
  bird_timer += 1;
  if (bird_timer>50){
    bird = new Bird(-85,random(0,200),bird_1,bird_2,bird_3,bird_4);
    birds.push(bird);
    bird_timer = 0;
  }
}


function draw_bullets(){
  for(let n=0;n<bullet_list.length;n++){
    let b = bullet_list[n];
    b.draw();
  }
}

function draw() {
  make_birds();
  //背景绘制开始
  background(0,200,255);
  
  push();
  noStroke();
  fill(255);
  ellipse(100,100,100,40)
  fill(255);
  ellipse(120,80,100,40)
  fill(255);
  ellipse(140,100,100,40)
  
  fill(255);
  ellipse(450,140,100,40)
  fill(255);
  ellipse(470,120,100,40)
  fill(255);
  ellipse(490,140,100,40)
  
  fill(255,0,0);
  circle(600,0,200)
  fill(150);
  rect(120,290,5,180)
  fill('#D19275');
  rect(480,300,10,100);
  fill('#228B22');
  ellipse(480,240,50,70);
  fill('#32CD32');
  ellipse(540,370,250,100)
  fill('#ADFF2F');
  ellipse(200,400,500,100);
  
  fill(150)
  translate(width * 0.2, height * 0.5);
  rotate(frameCount / 200.0);
  star(0, 0, 5, 70, 3);
  
  pop();
  
  
  fill(255);
  textSize(25);
  text('Shoot Birds!', 10, 30);
  fill(255);
  textSize(25);
  text('score:'+scores, 450, 30);
  
  //背景绘制结束
  
  cannon.display();
  
  if(keyIsDown(39)){
    cannon.x+=3;
  }
  if(keyIsDown(37)){
    cannon.x-=3;
  }
  if(cannon.x<-75){
    cannon.x=675;
  }
  if(cannon.x>675){
    cannon.x=-75;
  }
  
  for (let i = 0;i<birds.length;i++){
    bird = birds[i];
    bird.display();
    bird.move();
  
    if(bird.x>=width+30){
      remove_birds.push(bird);
    }
  
    for(let i = 0;i<bullet_list.length;i+=1){
      b = bullet_list[i];
      if(b.y<=-10){
        remove_bullets.push(b);
      }
      if(sqrt((bird.x-b.x)**2+(bird.y-b.y)**2)<100){
        remove_birds.push(bird);
        scores+=100;
        remove_bullets.push(b);
        
      }
    }
  }
  for (let i = 0;i<remove_bullets.length;i++){
    let idx = bullet_list.indexOf(remove_bullets[i]);
    bullet_list.splice(idx,1);
  }
  
  
  for (let i = 0;i<remove_birds.length;i++){
    let idx = birds.indexOf(remove_birds[i]);
    birds.splice(idx,1);
  }
  remove_bullets = [];
  remove_birds = [];
  //print(bullet_list.length);
  draw_bullets();
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function keyPressed(){
  if( keyCode == 32){
    cannon.fire();
  }
}