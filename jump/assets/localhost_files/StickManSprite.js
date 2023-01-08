class StickMan extends Sprite{
	constructor(x,y){
		super('stickman');	

    this.x = x;
    this.y = y;
    this.ay = 0;
    this.gravity = 1;

    this.isJumping = false;

    this.hero_speed = 5;

    this.cannon = new Cannon(this.x,this.y);
	}


  drawCannon(){
    this.cannon.x = this.x-10;
    this.cannon.y = this.y+35;

    this.cannon.draw();
  }

  drawBody1(){
    //头
    push();
    fill('white');
    strokeWeight(3);
    ellipse(this.x,this.y,20,20);
    pop();

    //躯干
    push();
    translate(this.x,this.y+10);
    strokeWeight(3);
    line(0,0,0,30);
    pop();

    //手臂
    push();
    translate(this.x,this.y+12);
    rotate(25);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    push();
    translate(this.x,this.y+12);
    rotate(-50);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    //双腿
    push();
    translate(this.x,this.y+40);
    rotate(15);
    strokeWeight(3);
    line(0,0,0,40);
    pop();

    push();
    translate(this.x,this.y+40);
    rotate(-15);
    strokeWeight(3);
    line(0,0,0,40);
    pop();


  }

  drawBody2(){
    //头
    push();
    fill('white');
    strokeWeight(3);
    ellipse(this.x,this.y+10,20,15);
    pop();

    //躯干
    push();
    translate(this.x,this.y+20);
    strokeWeight(3);
    line(0,0,0,30);
    pop();

    //手臂
    push();
    translate(this.x,this.y+22);
    rotate(10);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    push();
    translate(this.x,this.y+22);
    rotate(-12);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    //双腿
    push();
    translate(this.x,this.y+50);
    rotate(15/2/2);
    strokeWeight(3);
    line(0,0,0,40);
    pop();

    push();
    translate(this.x,this.y+50);
    rotate(-15/2/2);
    strokeWeight(3);
    line(0,0,0,40);
    pop();


  }


  drawJumpBody(){
    //头
    push();
    fill('white');
    strokeWeight(3);
    ellipse(this.x,this.y,20,20);
    pop();

    //躯干
    push();
    translate(this.x,this.y+10);
    strokeWeight(3);
    line(0,0,0,30);
    pop();

    //手臂
    push();
    translate(this.x,this.y+10);
    rotate(30);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    push();
    translate(this.x,this.y+10);
    rotate(-120);
    strokeWeight(3);
    line(0,0,0,25);
    pop();

    //双腿
    push();
    translate(this.x,this.y+40);
    rotate(40);
    strokeWeight(3);
    line(0,0,0,40);
    pop();

    push();
    translate(this.x,this.y+40);
    rotate(-80);
    strokeWeight(3);
    line(0,0,0,40);
    pop();

    
  }





  move(){

    this.y -=this.ay;
    this.ay-=this.gravity;

    if(this.y <= height-height/7-90){
      this.isJumping = true;
    }else{
      this.isJumping = false;
    }

    if(this.y+80>=height-height/7){
      this.y = height-height/7-80;
      this.ay = 0;
    }

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }



  }



}