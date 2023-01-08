


class Sprite{
  constructor(images,duration1){
    this.x = 0 ;
    this.y = 0 ;
    this.images = images;
    this.duration1 = duration1; // 1,2,
    this.interval = duration1 / this.images.length;
    this.img_index = 0 ;
    this.timer = 0 ;
    this.plus_y = 0;
  }

  move(x,y){

    this.x = x;
    this.y = y;
    
  }

  show(){
    this.timer += deltaTime/1000;
    this.y -= this.plus_y;

    if ( this.timer >  this.interval){
      //this.interval = 1;
      let img = this.images[this.img_index];
      image(img,this.x,this.y);
      this.img_index+=1;
      this.timer = 0;
      if(this.img_index >= this.images.length){
        this.img_index = 4;
        this.plus_y += 0.7;
      }
    }else{
      let img = this.images[this.img_index];
      image(img,this.x,this.y);
    }

  }
}

class Sun extends Sprite{

  jump(){

  }
}


















class _Blaster{
  constructor(images,goal_x,goal_y){
    this.x = 0 ;
    this.y = 0 ;
    this.images = images;
    this.interval = images[0].wait;
    this.img_index = 0 ;
    this.timer = 0 ;
    this.plus_y = 0;
    this.angle = 0 ;

    this.goal_x = goal_x;
    this.goal_y = goal_y;
    // this.vector = createVector(this.x,this.y,this.goal_x,this.goal_y);
    // this.v_norm = createVector(0,1);
    // this.v_heart = null;
  }

  move(x,y){

    this.x = x;
    this.y = y;
    

  }

  show(){

    push();

    translate(this.x,this.y);
    rotate(this.angle);

    this.timer += deltaTime/1000.;
    //this.y -= this.plus_y;


    if ( this.timer >  this.interval){
      this.img_index+=1;
      //this.plus_y +=1;


      if(this.img_index >= this.images.length){
        this.img_index = 4;
      }

      let img = this.images[this.img_index].img;

      image(img,0,0,42,57);
     
      this.timer = 0;

      this.interval = this.images[this.img_index].wait;
      
    }else{
      let img = this.images[this.img_index].img;
      image(img,0,0,42,57);
    }

    pop();
  }
}





let heart_img;

let heart_pos = null;

let blaster_img0;
let blaster_img1;
let blaster_img2;
let blaster_img3;
let blaster_img4;
let blaster_img5;

let fight_img0;
let fight_img1;

let blaster_array = [];


let white_level = 0;



let cannon_weight = 0;

let back_add_index = 0;

function preload() {
  heart_img = loadImage('./images/spr_heart_battle_pl_0.png');

  // blaster_array=[]
  // for(let n=0;n<=5;n++){
  //   img = loadImage('./images/spr_gasterblaster_'+n+'.png');
  //   blaster_array.push({img:img,wait:0});
  // }

  blaster_img0 = loadImage('./images/spr_gasterblaster_0.png');
  blaster_img1 = loadImage('./images/spr_gasterblaster_1.png');
  blaster_img2 = loadImage('./images/spr_gasterblaster_2.png');
  blaster_img3 = loadImage('./images/spr_gasterblaster_3.png');
  blaster_img4 = loadImage('./images/spr_gasterblaster_4.png');
  blaster_img5 = loadImage('./images/spr_gasterblaster_5.png');
  //blaster_array = [blaster_img0,blaster_img1,blaster_img2,blaster_img3,blaster_img4,blaster_img5];

  blaster_array = [{img:blaster_img0,wait:2},
            {img:blaster_img1,wait:0.09},
            {img:blaster_img2,wait:0.03},
            {img:blaster_img3,wait:0.03},
            {img:blaster_img4,wait:0.04},
            {img:blaster_img5,wait:0.04}];
}

let current = null;
let blaster = null;
function setup() {
  createCanvas(400,400);
  imageMode(CENTER);
  angleMode(DEGREES);

  blaster = new Blaster(blaster_array);

  blaster.move(width/2-50,height/2+50);
  heart_pos = createVector(width /2,height/2);

  cannon_weight = 20;

  white_level = 255;

}

function draw() {
  background(0);
  //frameRate(15);

  //blaster.move(width /2,height /2);


  push();
  // translate(width/2,height/2);
  image(heart_img , heart_pos.x, heart_pos.y);
  pop();







  blaster_v = createVector(blaster.x,blaster.y);
  blaster_to_heart_v  = p5.Vector.sub(heart_pos ,blaster_v);

  one_v = p5.Vector.normalize(blaster_to_heart_v);
  two_v = p5.Vector.mult(one_v,4000);
  three_v = p5.Vector.add(blaster_v,two_v);




  

  back_v = p5.Vector.mult(one_v,-back_add_index);
  second_back_v = p5.Vector.add(blaster_v,back_v);

  if (blaster.img_index >= 4){
    back_add_index+=0.2;
    blaster.move(second_back_v.x,second_back_v.y);
  }


  if(blaster_v.x > width+100 
            || blaster_v.x < -100 
            || blaster_v.y > height+100 
            || blaster_v.y < -100){
    white_level -= 20

  }

  push();
  // translate(blaster_v.x,blaster_v.y);
  stroke('white');

  if (blaster.img_index >= 4){
    strokeWeight(cannon_weight);

    stroke(255,255,255,white_level)
    line(blaster_v.x,blaster_v.y,three_v.x,three_v.y);
    cannon_weight+=1;

    if (cannon_weight >= 30){
      cannon_weight = 23;
    }
  }

  let blaster_norm_v = createVector(0,100);
  translate(blaster_v.x,blaster_v.y);
  
  //line(0,0,blaster_norm_v.x,blaster_norm_v.y);
  
  
  let angle = blaster_norm_v.angleBetween(blaster_to_heart_v);
  //text("angle:"+angle,50,0);



  pop();
  blaster.angle = angle;
  blaster.show();


  

  if (keyIsDown(LEFT_ARROW)) {
    heart_pos.x -= 3;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    heart_pos.x += 3;
  }

  if (keyIsDown(UP_ARROW)) {
    heart_pos.y -= 3;
  }

  if (keyIsDown(DOWN_ARROW)) {
    heart_pos.y += 3;
  }
  

  // if (current == blaster_img4){
  //   current = blaster_img5;
  // }else{
  //   current = blaster_img4;
  // }
  // if(current!=null){
  //   image(current,200,200,42,57)
  // }
}


