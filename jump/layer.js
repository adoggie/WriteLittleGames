//
class Layer{
	constructor(name){
		this.name = name;
		this.sprites = [];
		this.visibility = true;
		this.scene = null;

	}

	addSprite(sprite){
		this.sprites.push(sprite);
		sprite.layer = this;
	}	

	getSprite(name){
		let  sprite = null;
		for(let n=0;n< this.sprites.length;n++){
			let s = this.sprites[n];
			if(s.name == name ){
				sprite = s;
				break;
			}
		}
		return sprite;
	}


	draw(){
		if (this.visibility == false){
			return ;
		}
		for(let n=0 ;n < this.sprites.length;n++){
			let sprite = this.sprites[n];
			sprite.draw();
		}

	}

}


//云☁️
class BattleSceneBGSprite_Cloud extends Sprite{
	constructor(){
		super();
		this.speed = 0.5;
	}

	draw(){
		push();
		noStroke();
		translate(this.x,this.y);
		fill(255,255,255,220);
		// this.x = 100; this.y =100;
		ellipse(0,-10,80,40);
		ellipse(-30,0,80,30);
		ellipse(30,0,80,30);
		pop();
	}

	move(x,y){
		if( this.x < -100 ){
			this.y = random(80,180);
			this.x =width +100;
		}
		this.x -= this.speed;
	}

}

class BattleSceneBgLayer extends Layer{

	constructor(){
		super();
		this.sun = new Sun(70,100,70);
  		//this.sun2 = new Sun(400-70,100,35);
		this.cloud = new BattleSceneBGSprite_Cloud();
		this.addSprite(this.sun);
		this.addSprite(this.cloud);
	}

	draw(){
		this.move();
		//this.draw_sun();
		super.draw();
		
	}

	move(){
		this.cloud.move();
	}

	// draw_sun(){
		

	// }
}