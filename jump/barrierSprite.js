class Barrier extends Sprite{
	constructor(name,x,y){
		super(name);	

    this.width = 10;
    this.height = 250;
    this.x = x;
    this.y = y;
    this.name = name;

    this.imageIndex1 = 40;
    this.imageIndex2 = 49;

    this.timer = 0;

    this.rectWidth = 40*1.5-40;
    this.rectHeight = 49*1.5;
	}

  draw(){
    this.timer+=deltaTime/1000.;

    push();
    let img =  gameController.images[this.name];
    imageMode(CENTER);
    image(img,this.x,this.y,40*1.5,this.rectHeight,this.imageIndex1,this.imageIndex2,40,49);
    //image(img,this.x,this.y);
    pop();

    if(this.timer >=0.1){
        
      this.imageIndex1+=40;
      this.timer = 0;
    }
    if(this.imageIndex1>=128){
      this.imageIndex1=0;
    }

    this.x -= 5;

    if(this.x <= -100){
      this.x = random(650,670);
      this.height = random(100,250);
    }

  }

}

class ImageBarrier extends Sprite{
  constructor(name,x,y){
    super(name);
    this.x = x;
    this.y = y;
    this.name = name;

    this.rectWidth = 40;
    this.rectHeight = 60;
  }

  draw(){
    push();
    let img =  gameController.images[this.name];
    imageMode(CENTER);
    image(img,this.x,this.y,40,60,0,0);
    //image(img,this.x,this.y);
    pop();

    this.x-=2;

    if(this.x<=-100){
      this.x = 1000;

    }
  }



}


class BirdBarrier extends Sprite{
  constructor(name,x,y){
    super(name); 
    this.x = x;
    this.y = y;
    this.name = name;

    this.imageIndex = 40;
    this.timer = 0;

    this.v = null;

    this.eggTimer = 0;

    this.rectWidth = 40;
    this.rectHeight = 40;
  }

  draw(){
    this.timer+=deltaTime/1000.;
    this.eggTimer+=deltaTime/1000.;


    push();
    let img =  gameController.images[this.name];
    imageMode(CENTER);
    image(img,this.x,this.y,60,60,this.imageIndex,40,40,40);
    //image(img,this.x,this.y);
    pop();

    if(this.timer >=0.1){
        
        this.imageIndex+=40;
        this.timer = 0;

        
      }
    if(this.imageIndex>=128){
        this.imageIndex=0;
    }

    this.x -= 3;

    if(this.x <= -100){
      this.x = 650;
    }

    //下蛋
    if(this.eggTimer >= 1){
      if(this.x<=random(350,380)){
        let boober = new Boober(this.x,this.y,createVector(-1,0),this);
        let layer_barrier = gameController.getCurrentScene().getLayer('barrier');
        layer_barrier.addSprite(boober);
        this.eggTimer = 0;
      }
    }

  }

}

class Boober extends Sprite{
  constructor(x,y,v,bird){
    super('boober');
    this.x = x;
    this.y = y;
    this.v = v;
    this.bird = bird;

    this.rectWidth = 20;
    this.rectHeight = 20;
  }

  draw(){
    this.move();
    push();
    ellipse(this.x,this.y,20,20);
    pop();


  }

  move(){
    let v_base = createVector(this.x,this.y);
    push();
    translate(this.x,this.y);
    let v_gravity = createVector(0,1);
    let v1 = p5.Vector.add(v_gravity,this.v);
    v1.normalize();
    v1.mult(3);
    let v2 = p5.Vector.add(v1,v_base);

    this.x = v2.x;
    this.y = v2.y;

    pop();
  }
}


class FallBarrier extends Sprite{
  constructor(name,x,y){
    super(name); 

    this.x = x;
    this.y = y;

  }

  draw(){

    push();
    strokeWeight(3);
    stroke('green');
    // triangle(this.x1,this.y1,this.x2,this.y2,this.x3,this.y3);
    line(this.x,this.y,this.x,this.y-100);
    pop();

    this.y += 8;

    if(this.y>=600){
      this.y = 0;
      this.x = random(0,width);
    }
  }


}





