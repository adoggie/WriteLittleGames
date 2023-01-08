class Sun extends Sprite{
	constructor(x,y,size){
		super('sun');	

    
    this.x = x;
    this.y = y;

    this.angle = 30;

    this.offset_angle = 0;

    this.timer = 0;

    this.size = size;
	}

  draw(){

    
    push();
    
    pop();

    this.edges();


  }

  edges(){

    push();

    translate(this.x,this.y);

      

    rotate(this.offset_angle);
    for(var index = 0;index<12;index+=1){
      noStroke();
      fill('yellow');
      rectMode(CENTER);
      rotate(this.angle );
      rect(0,0,this.size,this.size);

      this.timer += deltaTime/1000.;

      if(this.timer>=1){
        this.offset_angle+=1;
        this.timer = 0; 

      }

    }

    ellipseMode(RADIUS);

    fill('red');
    noStroke();
    ellipse(0,0,this.size/2,this.size/2);



    pop();


  }


}