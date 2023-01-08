// Simple Pendulum Simulation OOP Variation
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/159-simple-pendulum-simulation.html
// https://youtu.be/NBWMtlbbOag

let pendul;


let r = 100;





let phase = 0;
let zoff = 0;
let slider;


var index = 0;




// function setup() {
//   createCanvas(640, 360);
  
// }

// function draw() {
//   r = random(0,100);

//   // return;
//   background('black');
//   translate(width/2,height/2)

//   // console.log(mouseX);
//   push();
//   stroke('white');
//   line(0,0,r,0);
//   pop();

//   push();
//   noStroke();
//   fill('white');
//   ellipse(0,0,10,10);
//   pop();



//   fill('red');
//   stroke('red')
//   beginShape();

//   for(var angle = 0;angle<360;angle+=random(12,90)){
//     //noStroke();
    
//     vertex(cos(angle*(PI/180))*r,sin(angle*(PI/180))*r);
//     //ellipse(cos(angle*(PI/180))*r,sin(angle*(PI/180))*r,1)
//   }
  
//   endShape(CLOSE);

// }


// function setup() {
//   createCanvas(400, 400);
//   slider = createSlider(0, 100, 3, 0.1);
// }

// function draw() {
//   background(0);
//   translate(width / 2, height / 2);
//   stroke(255);
//   strokeWeight(2);
//   noFill();
//   beginShape();
//   let noiseMax = slider.value();
//   for (let a = 0; a < TWO_PI; a += radians(5)) {
//     let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
//     let yoff = map(sin(a + phase), -1, 1, 0, noiseMax);
//     let r = map(noise(xoff, yoff, zoff), 0, 1, 100, height / 2);
//     let x = r * cos(a);
//     let y = r * sin(a);
//     vertex(x, y);
//   }
//   endShape(CLOSE);
//   phase += 0.003;
//   zoff += 0.01;
// }


let branch_len = 100;
let x = 0;
let y = 0 ;
let angle = 30;
let sb = 0.1;
// let slider = null;

function setup() {
  createCanvas(400,400);
  clock1 = new EriClock(100,120,70);
  clock2 = new EriClock(270,120,70);

  // x = width /2;
  // y = height;
  angleMode(DEGREES);
  slider = createSlider(0.1,10,0.1,0.1);


}

function draw() {
  gameController.draw();

  background('black');
  index = 0;
  //clock1.show();
  //clock2.show();
  stroke('greenyellow');
  //translate(width/2,height);
  translate(width/2,height/2);

  sb = slider.value();
  //branch(90);
  //triangle1(90);
  // translate(0,height-150);
  // branch(50);

  circle1(200);
}


function branch(len){

  // console.log(len);
  if (len < 1){
    return ;
  }
  
  line(0,0,0,-len);
  translate(0,-len);
  
  len = len * 0.6;
    

  push();
  rotate(angle);
  branch(len);
  pop();

  push();
  rotate(-angle);
  branch(len);
  pop();
  

}




function triangle1(length){
  if(index>=120){
    return;
  }

  line(0,0,0,length);
  translate(0,length);

  push();
  // rotate(90*noise(1),90*noise(1));
  rotate(angle);
  index += 1;
  triangle1(length* 0.91);
  pop();

}



function circle1(diameter){
  index += 1;
  if(index>=120){
    return;
  }

  noFill();
  ellipse(0,0,diameter-20,diameter)

  push();
  circle1(diameter*sb);
  pop();

}

