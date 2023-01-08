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