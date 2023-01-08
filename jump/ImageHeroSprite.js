class ImageHero extends Sprite{
	constructor(name,x,y){
		super(name);	

    this.x = x;
    this.y = y;
    this.ay = 0;
    this.gravity = 1;

    this.isJumping = false;

    this.image = image;

    this.timer = 0;
    //this.cannon = new Cannon(this.x,this.y);
    // this.name = name;
    this.isWalking = false;

    this.imageIndex1 = 32;
    this.imageIndex2 = 48;

    this.rectWidth = 32;
    this.rectHeight = 48;

    this.button_left = 65;
    this.button_right = 68;
    this.button_up = 87;

    this.isDrawingRect = true;

    this.cannon = new Cannon(this.x,this.y);
	}


  draw(){


    push();
    let img =  gameController.images[this.name];
    imageMode(CENTER);
    if (this.isWalking == false){
      image(img,this.x,this.y,32,48,0,96,32,48);
    }


    if (keyIsDown(this.button_left)) {
      this.isWalking = true;
      this.timer+=deltaTime/1000.;
      image(img,this.x,this.y,32,48,this.imageIndex1,this.imageIndex2,32,48);
      if(this.timer >=0.1){
        
        this.imageIndex1+=32;
        this.timer = 0;
      }
      if(this.imageIndex1>=128){
        this.imageIndex1=0;
      }

      this.x -= 4;
      
    }else{
      this.isWalking = false;
    }

    if (keyIsDown(this.button_right)){
      this.isWalking = true;
      this.timer+=deltaTime/1000.;
      image(img,this.x,this.y,32,48,this.imageIndex1,this.imageIndex2*2,32,48);
      if(this.timer >=0.1){
        
        this.imageIndex1+=32;
        this.timer = 0;
      }
      if(this.imageIndex1>=128){
        this.imageIndex1=0;
      }

      
      this.x += 4;
      

    }else{
      this.isWalking = false;
    }

    if(this.isDrawingRect == true){
      this.drawRect();
    }

    this.drawCannon();
    

  }
  // drawCannon(){
  //   this.cannon.x = this.x-10;
  //   this.cannon.y = this.y+35;

  //   this.cannon.draw();
  // }




  move(){

    this.y -=this.ay;
    this.ay-=this.gravity;

    if(this.y <= height-height/7-90){
      this.isJumping = true;
    }else{
      this.isJumping = false;
    }

    if(this.y+25>=height-height/7){
      this.y = height-height/7-25;
      this.ay = 0;
    }

    
    if(this.x<=0){
      this.x = width;
    }

    if(this.x>=width){
      this.x = 0;
    }


  }

  drawCannon(){
    this.cannon.x = this.x;
    this.cannon.y = this.y;

    this.cannon.draw();
  }




}