class Blaster extends Sprite{

  constructor(images,sound1,sound2){
    super('blaster');

    this.images = images;
    this.interval = images[0].wait;
    this.img_index = 0 ;
    this.timer = 0 ;
    this.plus_y = 0;
    this.angle = 0 ;

    this.cannon_weight = 20;

    this.white_level = 255;
    this.back_add_index = 0 ;

    this.heart_pos = {x:0,y:0};

    this.preSound = sound1;
    this.shootSound = sound2;

    this.soundIsPlaying = false;
  }

  //获取目标心位置
  getHeart(){
  	let sprite = this.layer.scene.getLayer('heart').getSprite('heart');
  	return sprite;

  }

  draw(){
    //let heart = this.getHeart();
    // console.log(this.heart_pos);
    // console.debug('sddd');

    let heart_v = createVector(this.heart_pos.x,this.heart_pos.y);
    let blaster_v = createVector(this.x,this.y);
    let blaster_to_heart_v  = p5.Vector.sub(heart_v ,blaster_v);

    let one_v = p5.Vector.normalize(blaster_to_heart_v); // 单位向量

    let two_v = p5.Vector.mult(one_v,4000);
    let three_v = p5.Vector.add(blaster_v,two_v);


    let back_v = p5.Vector.mult(one_v,- this.back_add_index);
    let second_back_v = p5.Vector.add(blaster_v,back_v);

    if (this.img_index >= 4){
      this.back_add_index+=0.2;
      this.white_level -= 3;
      this.move(second_back_v.x,second_back_v.y);
    }


    // if(blaster_v.x > width + 100 
    //           || blaster_v.x < -100 
    //           || blaster_v.y > height+100 
    //           || blaster_v.y < -100){
    //   this.white_level -= 20;
    // }


    push();
    stroke('white');

    if (this.img_index >= 4){
      if(this.soundIsPlaying == false){
        this.shootSound.play();
        this.soundIsPlaying = true;
      }
      strokeWeight(this.cannon_weight);

      stroke(255,255,255,this.white_level)
      line(blaster_v.x,blaster_v.y,three_v.x,three_v.y);
      this.cannon_weight+=1;

      if (this.cannon_weight >= 30){
        this.cannon_weight = 23;
      }
    }

    let blaster_norm_v = createVector(0,100);
    translate(blaster_v.x,blaster_v.y);    
    //line(0,0,blaster_norm_v.x,blaster_norm_v.y);
    let angle = blaster_norm_v.angleBetween(blaster_to_heart_v);
    //text("angle:"+angle,50,0);
    pop();
    this.angle = angle;
  
	 this.show();

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

