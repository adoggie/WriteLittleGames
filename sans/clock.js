let second = 0;
let minute = 0;
let hour = 0;
var rotated_v1 = null;
var rotated_v2 = null;
var rotated_v3 = null;

var rotated_v4 = null;
var rotated_v5 = null;

var rotated_v6 = null;
var rotated_v7 = null;

let x = 0;
let y = 0;
let big_circle_size = 0;
//let angle = 0;


function setup() {
  createCanvas(400,400);
  big_circle_size = 100;
  // second = second();
  // minute = minute();
  // hour = hour();
  angleMode(DEGREES); 
  v1 = createVector(0,-(big_circle_size-5));
  v2 = createVector(0,-(big_circle_size-20));
  v3 = createVector(0,-(big_circle_size-40));

  v4 = createVector(0,-(big_circle_size));
  v5 = createVector(0,-(big_circle_size-10));

  v6 = createVector(0,-(big_circle_size));
  v7 = createVector(0,-(big_circle_size-2));

  x = 200;
  y = 120;
}

function draw() {
  let now = new Date();
  second = now.getSeconds();
  minute = now.getMinutes();
  hour = now.getHours()%12;
  // if (hour>12){
  //   hour -= 12;

  // }
  background(0);
  //color('white');
  fill(255);
 // stroke('white');
  text('Now the time is:'+' '+hour+':'+minute+':'+second,x-big_circle_size/2,y)
  




  // rectMode(CENTER);
  push();
  stroke('green');
  fill('green');
  // translate(100,300);
  rect(0,280,second*4,20);
  pop();

  push();
  stroke('yellow');
  fill('yellow');
  // translate(0,260);
  rect(0,260,minute*2,20);
  pop();

  push();
  stroke('red');
  fill('red');
  // translate(0,240);
  rect(0,250,hour,10);
  pop();




  // push();
  // noFill();
  // stroke('white');
  // strokeWeight(3);
  // translate(270,120);
  // ellipse(0,0,200,200);

  // pop();

  push();
  noStroke();
  fill('white');
  translate(x,y);
  ellipse(0,0,10,10);
  
  for(var angle = 0;angle<360;angle+=30){
    stroke('white');
    fill('white');
    //ellipse(cos(angle)*big_circle_size,sin(angle)*big_circle_size,5,5);
    
    strokeWeight(3);
    rotated_v4 = p5.Vector.rotate(v4,angle); 
    rotated_v5 = p5.Vector.rotate(v5,angle); 
    line(rotated_v4.x,rotated_v4.y,rotated_v5.x,rotated_v5.y); 
    

  }
  for(var angle = 0;angle<360;angle+=6){
    stroke('white');
    fill('white');
    //ellipse(cos(angle)*big_circle_size,sin(angle)*big_circle_size,2,2);
    
    strokeWeight(3);
    rotated_v6 = p5.Vector.rotate(v6,angle); 
    rotated_v7 = p5.Vector.rotate(v7,angle); 
    line(rotated_v6.x,rotated_v6.y,rotated_v7.x,rotated_v7.y); 
    

  }



  rotated_v1 = p5.Vector.rotate(v1,second*6); 
  rotated_v2 = p5.Vector.rotate(v2,minute*6); 
  rotated_v3 = p5.Vector.rotate(v3,hour*30); 


  stroke('green');
  strokeWeight(1.5);
 
  line(0,0,rotated_v1.x,rotated_v1.y);


  stroke('yellow');
  strokeWeight(3);
  line(0,0,rotated_v2.x,rotated_v2.y);


  stroke('red');
  strokeWeight(5);
  line(0,0,rotated_v3.x,rotated_v3.y);

  noFill();
  stroke('white');
  strokeWeight(5);
  ellipse(0,0,208,208);
  pop();
}

