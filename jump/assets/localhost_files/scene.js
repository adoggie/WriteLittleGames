

//游戏场景
class Scene{
	constructor(name){
		this.name = name;
		this.layers = [];
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
		background(100,200,255);
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

	keyPressed(){

	}

}




//战斗
class BattleScene extends Scene{
	constructor(name){
		super(name);


		this.layer_bg = new BattleSceneBgLayer('background');
  		this.layer_hero = new Layer('hero');
  		this.layer_barrier = new Layer('barrier');


  		this.bullets = [];

  		this.addLayer(this.layer_bg);
  		this.addLayer(this.layer_barrier);
  		this.addLayer(this.layer_hero);

  		this.hero = new ImageHero('hero',100,300);

  		// this.sun = new Sun(70,100,70);
  		// this.sun2 = new Sun(400-70,100,35);

  		//this.hero = new Hero(width/2-width/2.5,height-height/7); 
  		this.barrier = new Barrier('monster',600,305);

  		this.stickman = new StickMan(100,260);
  		

  		this.candy = new ImageBarrier('candy',1000,random(100,200));
  		this.bird = new BirdBarrier('bird',650,100);
  		this.spike = new FallBarrier('spike',random(0,width),100);


  		// this.layer_bg.addSprite(this.sun);
  		// this.layer_bg.addSprite(this.sun2);

  		this.layer_hero.addSprite(this.hero);
  		this.layer_hero.addSprite(this.stickman);
  		// this.layer_hero.addSprite(this.cannon);

  		this.layer_barrier.addSprite(this.barrier);
  		this.layer_barrier.addSprite(this.candy);
  		this.layer_barrier.addSprite(this.bird);
  		//this.layer_barrier.addSprite(this.spike);



  		

  		this.stickmanTimer = 0;


	}



  
	// mousePressed(){
	//   let blaster = new Blaster(blaster_array,preSound,shootSound);
	//   preSound.play()
	//   let s = gameController.getCurrentScene().getLayer('heart').getSprite('heart');
	//   blaster.heart_pos = {x:s.x,y:s.y};
	//   // blaster.heart_pos.x = .x;
	//   // blaster.heart_pos.y = gameController.getCurrentScene().getLayer('heart').getSprite('heart').y;
	//   blaster.move(mouseX,mouseY);
	//   //blaster.move(random(0,1200),random(0,600));


	//   gameController.getCurrentScene().getLayer('blaster').addSprite(blaster);
	// }

	keyPressed(){
		if (keyCode == 38){
    	  if (this.stickman.isJumping == false){
      		
      		this.stickman.ay +=20;
      		gameController.sounds['jump'].play();
    	  }    
  		}

  		if (keyCode == 50){
    	  if (this.hero.isJumping == false){
      		
      		this.hero.ay +=18;
      		gameController.sounds['jump'].play();
    	  }    
  		}


  		if(keyCode == 32){
  			let v_base = createVector(this.stickman.x-10,this.stickman.y+35);
  			let v_1 = p5.Vector.add(v_base,this.stickman.cannon.v1);
  			let v_2 = p5.Vector.normalize(this.stickman.cannon.v1);

  			let across_v = createVector(1,0);

  			let angleBetween = across_v.angleBetween(this.stickman.cannon.v1);

  			let bullet = new Bullet(v_1.x,v_1.y,v_2,angleBetween);
  			this.bullets.push(bullet);

  			// console.log(this.hero.cannon.v1);

  		}
	}

	mousePressed(){
		// gameController.setCurrentScene('sb');
	}

	draw(){
		super.draw();

		this.hero.move();

		this.stickmanTimer += deltaTime/1000;

		this.stickman.move();
		//this.stickman.drawCannon();

		if(this.stickman.isJumping == false){
			if(this.stickmanTimer>=0.15){
				//this.stickman.drawBody2();
				
			}else{
				//his.stickman.drawBody1();

			}

			if(this.stickmanTimer >= 0.3){
				this.stickmanTimer = 0;
			}
		}else{
			//this.stickman.drawJumpBody();
		}



		let emptyArray = [];
		for(var index = 0;index<this.bullets.length;index+=1){
			let bullet = this.bullets[index];
			bullet.draw();
			if((bullet.x<=500 && bullet.x>=-100) && (bullet.y<=500&&
			   bullet.y>=-100) ){
				emptyArray.push(bullet);
				// console.log(emptyArray.length);
			}
		}
		
		this.bullets = emptyArray;

		//碰撞
		if(this.hero.x+10>=this.barrier.x-20&&this.hero.y+20>=this.barrier.y+20){
			noLoop();
		}
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

	mousePressed(){
		console.log('welcome mousePressed!');
		gameController.setCurrentScene('level1');

	}


}