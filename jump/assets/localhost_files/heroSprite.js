class Hero extends Sprite{
	constructor(x,y){
		super('hero');	

    this.width = 30;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.ay = 0;
    this.gravity = 1;

    this.isJumping = false;

    this.hero_speed = 5;

    //this.v1 = null;

    this.angle = 0;

    //this.cannon = new Cannon(this.x,this.y);
	}

  draw(){

    this.y -=this.ay;
    this.ay-=this.gravity;

    if(this.y <= height-height/7-20){
      this.isJumping = true;
    }else{
      this.isJumping = false;
    }

    if(this.y+this.height/2>=height-height/7){
      this.y = height-height/7-this.height/2;
      this.ay = 0;
    }

    push();  
    strokeWeight(2);
    stroke('white');
    fill('blue');
    rect(this.x,this.y,this.width,this.height);
    pop();


    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.height = 15;
    }else {
      this.height = 30;
    }

    if(this.x>=400-this.width/2){
      this.x=400-this.width/2;
    }

    if(this.x<=this.width/2){
      this.x=this.width/2;
    }

    // this.cannon.x = this.x;
    // this.cannon.y = this.y;

    // this.cannon.draw();


  }





}