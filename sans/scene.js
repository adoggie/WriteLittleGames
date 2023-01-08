

//游戏场景
class Scene{
	constructor(name){
		this.name = name;
		this.layers = []
		// this.sprites = [];
	}

	addLayer(layer){
		this.layers.push(layer);
		layer.scene = this;
	}

	getLayer(name){
		let  layer = null;
		for(let n=0;n< this.layers.length;n++){
			let _layer = this.layers[n];
			if(_layer.name == name ){
				layer = _layer;
				break;
			}
		}
		return layer;
	}

	
	draw(){
		background(0);
		let  layer = null;
		for(let n=0;n< this.layers.length;n++){
			layer = this.layers[n];
			layer.draw();
		}
	}

	getSize(){
		return {w:width,h:height};
	}

	mousePressed(){

	}

}


//战斗
class BattleScene extends Scene{
	constructor(name){
		super(name);

	}

	mousePressed(){
	  let blaster = new Blaster(blaster_array,preSound,shootSound);
	  preSound.play()
	  let s = gameController.getCurrentScene().getLayer('heart').getSprite('heart');
	  blaster.heart_pos = {x:s.x,y:s.y};
	  // blaster.heart_pos.x = .x;
	  // blaster.heart_pos.y = gameController.getCurrentScene().getLayer('heart').getSprite('heart').y;
	  blaster.move(mouseX,mouseY);
	  //blaster.move(random(0,1200),random(0,600));


	  gameController.getCurrentScene().getLayer('blaster').addSprite(blaster);
	}
}

// 欢迎 
class Welcome extends Scene{
	constructor(name){
		super(name);

	}

	draw(){
		background('white');
		textSize(32);
		text('GATSER BLASTER SIMULATOR VER 1.0',width/2,height/2)
		text('CLICK TO START',width/2,height/2+height/8)

		text('CLICK TO SUMMON GB',width/4,height/2)
		text('←↑→↓ TO MOVE',width/4,height/2+height/8)
	}


}