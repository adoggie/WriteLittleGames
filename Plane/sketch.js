
var plane1 = new MyPlane(200,200);

var speed = 3;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/jungle.ogg');
}

function setup() {
  createCanvas(600, 600);
  background(153);
   // mySound.setVolume(0.1);
  mySound.play();
}

function draw(){
  
  background(255);
  //draw_snow();
  hill_sun_down();
  plane1.draw();
  
}


function hill_sun_down(){
// background(204);  
    push();
    translate(0,height-120);
    // 绘制一个太阳
    fill(255,0,0,180)
    stroke(255, 255, 0)
    strokeWeight(6)
    ellipse(350, 100, 100, 100)
    // 开始绘制山的图形
    // 设置颜色为灰色
    fill(45,45,45,250)
    stroke(0, 0, 0)
    strokeWeight(1)
    beginShape()
    vertex(0,120)
    vertex(10, 40)
    vertex(40, 100)
    vertex(80, 20)
    vertex(110, 80)
    vertex(260, 50)
    vertex(360, 110)
    vertex(400, 10)
    vertex(480, 90)
    vertex(580, 10)
    vertex(580, 120)
    // 结束绘制图形
    endShape()
    
  pop();
}


let snowflakes = []; // array to hold snowflake objects

// function setup() {
//   createCanvas(400, 600);
//   fill(240);
//   noStroke();
// }

function draw_snow() {
  background('brown');
  noStroke();
  let t = frameCount / 60; // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 5);

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5);

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}


