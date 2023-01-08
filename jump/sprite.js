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

  draw(){
  	
  }

  drawRect(){
  	push();
    rectMode(CENTER);
    noFill();
    rect(this.x,this.y,this.rectWidth-10,this.rectHeight);
    ellipse(this.x,this.y,5,5);
    pop();

  }

  getRect(){
  	// [1,2,100,200]

  	return [ (this.x-this.rectWidth/2) , 
  			(this.y - this.rectHeight/2),
  			this.rectWidth/2,
  			this.rectHeight];

  }

}




