class Cannon extends Sprite{
	constructor(x,y){
		super('cannon');	

    this.width = 30;
    this.height = 4;
    this.x = x;
    this.y = y;

    this.angle = 0;

    this.v1 = null;

    this.bullet = null;
	}

  draw(){
    // let hero = gameController.getCurrentScene().getLayer('hero').getSprite('hero');
    //cannon

    push();
    translate(this.x,this.y);
    this.v1 = createVector(this.width,-20);
    this.v1.rotate(this.angle);
    // rotate(this.angle);

    console.log(this.x,this.y,this.v1.x,this.v1.y);
    stroke('black');
    strokeWeight(7);
    line(0,0,this.v1.x,this.v1.y);

    stroke(100,300,255);
    strokeWeight(2);
    line(0,0,this.v1.x,this.v1.y);

    if(keyIsDown(69)){
      this.angle+=10;
    }

    if(keyIsDown(81)){
      this.angle-=10;
    }
    
    // this.v1 = createVector();

    pop();



    //this.bullet = new Bullet(this.v1);

  }



}


class Bullet extends Sprite{
  constructor(x,y,vector,angleBetween){
    super('bullet');

    this.x = x;
    this.y = y;

    this.speed = 5;

    this.vector = vector ; //vector.mult(this.speed);

    this.angleBetween = angleBetween;
  }

  draw(){
    push();
    // noFill();
    // stroke('black');
    //noStroke();

    translate(this.x,this.y);
    rotate(this.angleBetween);
    // console.log(this.angleBetween);
    fill(100,300,255);
    strokeWeight(2);
    rect(0,0,30,4);
    pop();

    // console.log(this.vector);

    let v_to_b = createVector(this.x,this.y);

    this.speed+=0.1;
    let v = p5.Vector.mult(this.vector,this.speed);

    let newV = p5.Vector.add(v_to_b,v);

    this.x = newV.x;
    this.y = newV.y;
  }




}