class Sprite{
	constructor(name){
		this.name =  name ;
		this.x = 0;
		this.y = 0;
		this.layer = null;

		this.rectWidth = 0;
		this.rectHeight = 0;
	}

	draw(){

	}

	move(x,y){

	    this.x = x;
	    this.y = y;   

  }

  drawCannon(){
  	
  }

  drawRect(){
  	push();
    rectMode(CENTER);
    noFill();
    rect(this.x,this.y,this.rectWidth,this.rectHeight);

    pop();

  }

}




