class Heart extends Sprite{
	constructor(img){
		super('heart');	
    this.img = img;
	}

  draw(){
    push();  
    image(this.img , this.x, this.y);
    pop();

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 3;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 3;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= 3;
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.y += 3;
    }

  }
  
}