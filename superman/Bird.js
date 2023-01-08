let bg_img = null;
let hero_img = null;

let bg_x = 0;
let bg_y = 0;

let bg2_x = 0;

let size1 = 0;
let size2 = 0;
let size3 = 0;
let size4 = 0;

let timer = 0;
let pipes = [];

let color_1 = null;
let color_2 = null;
let bg = null;

let color_3 = 100;

var game_running = true;
const SPEED = 5; 
const DEBUG = false;

var click_count = 0;
let bg_music = null;

// class Button{
// 	constructor(x,y,w,h,name){

// 	}

// 	isPressed(){
// 		//true or false
// 	}

// }
//

function  judgeClient() {
    let client = '';
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
      client = 'iOS';
    } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
      client = 'Android';
    } else {
      client = 'PC';
    }
    return client;
  }


class Bird{
	constructor(x,y){
    this.x = x;
    this.y = y;
    this.ay = 0;
    this.gravity = 0.3;
    this.isUping = false;

    this.angle = 10;





    this.rectWidth = 50;
    this.rectHeight = 20;
	}

	draw(){
		push();

		translate(this.x,this.y);
		rotate(this.angle);

		this.angle += 2;

		if(this.isUping == true){
			this.angle -= 4;
		}
		this.y -= this.ay;
		this.ay -= this.gravity;
		image(hero_img,0,0,80,80);

		//碰撞箱
		// noFill();
		// strokeWeight(2);
		// rect(0,0,this.rectWidth,this.rectHeight);
		pop();

		//碰撞箱
		//noFill();
		if(DEBUG == true){
			fill('white')
			strokeWeight(2);
			let rc = this.getRect();
			rect(rc[0]+this.rectWidth/4,rc[1]+this.rectHeight,rc[2],rc[3]);
		}

	}

	reset(){
		this.y = height/2;
		this.ay = 0 ;
		this.gravity = 0.3;
		this.angle = 10;
		this.isUping = false;
	}


	getRect(){
  	// [1,2,100,200]

  	return [(this.x-this.rectWidth/4) , 
  		(this.y-this.rectHeight),
  		this.rectWidth/2,
  		this.rectHeight];
  }
}

class Bg{
	constructor(x,y,x2,img){
		this.bg_x = x;
		this.bg_y = y;
		this.bg2_x = x2;
		this.bg_img = img;

		this.score = 0;
		this.add_score = 10;
		this.add_far_score = 10;
		this.timer = 0;

		this.isEnd = false;
		this.farthest = 0;
	}

	draw(){
		image(this.bg_img,this.bg_x,this.bg_y);
		image(this.bg_img,this.bg2_x,this.bg_y);

		this.bg_x -= SPEED;
		this.bg2_x -= SPEED;

		if(this.bg_x + width/2 <= 0){
			this.bg_x = width + width/2;
		}

		if(this.bg2_x + width/2 <= 0){
			this.bg2_x = width + width/2;
		}
	}

	drawScore(){
		push();
		this.timer += deltaTime/1000.;

		stroke('black');
		strokeWeight(6);
		textSize(35);
		fill('white');
		text('distance: '+this.score+' m',20,50);
		fill('yellow');
		text('farthest: '+this.farthest+' m',20,100);

		fill('white');
		textSize(50);
		text('Superman',550,60);

		fill(100,100,255);
		textSize(20);
		text('ver1.0',700,80);

		fill(200,100,255);
		textSize(20);
		text('zyc.nanyang@2021',600,100);

		if(this.timer >= 1){
			this.score += this.add_score;
			this.farthest += this.add_far_score;
			this.timer = 0;
		}
		pop();
	}

	end(){

		textSize(50);
		stroke('black');
		strokeWeight(5);
		fill('yellow');
		text('YOU FALL !',width/2-100,height/2);

		textSize(20);
		stroke('black');
		strokeWeight(3);
		color_3+=10;
		fill(color_3,color_3,color_3);
		if(this.score >= this.farthest){
			this.farthest = this.score;
			text('Congratulations! new record: '+this.farthest,width/2-100,height/2+40);
		}else{
			text('Hightest record: '+this.farthest,width/2-40,height/2+40);
	  }
		textSize(25);
		fill(color_1);
		rect(width/2-70,height/2+90,100,50);
		text('Retry',width/2-100,height/2+100);

		textSize(25);
		fill(color_2);
		rect(width/2+130,height/2+90,100,50);
		text('Menu',width/2+100,height/2+100);

		//按键黄色高亮
		//retry
		if(mouseX >= width/2-70 -50 
		&& mouseX <= width/2-70 +50
		&& mouseY >= height/2+90 -25
		&& mouseY <= height/2+90 +25){
			color_1 = 'yellow';
		}else{
			color_1 = 'white';
		}
		//menu
		if(mouseX >= width/2+130 -50 
		&& mouseX <= width/2+130 +50
		&& mouseY >= height/2+90 -25
		&& mouseY <= height/2+90 +25){
			color_2 = 'yellow';
		}else{
			color_2 = 'white';
		}

		//计分
		this.add_score = 0;
		this.add_far_score = 0;
		if(this.score >= this.farthest){
			this.farthest = this.score;
		}
	}



	isPtInRect(pt,rc){
		// pt:[x,y]
		// rc:[x,y,w,h]
		// return:  true / false 
		if( pt[0] >= rc[0] && pt[0] <= rc[0] + rc[2] &&
			pt[1] >= rc[1] && pt[1] <= rc[1] + rc[3]
			){
			return true;
		}
		return false;
	}


	isRcInteract(rc1,rc2){
		let p1 = [rc1[0],rc1[1]];
		let p2 = [rc1[0]+rc1[2],rc1[1]];
		let p3 = [rc1[0]+rc1[2],rc1[1]+rc1[3]];
		let p4 = [rc1[0],rc1[1]+rc1[3]];

		if( this.isPtInRect(p1,rc2) || 
			this.isPtInRect(p2,rc2) ||
			this.isPtInRect(p3,rc2) ||
			this.isPtInRect(p4,rc2) 
			){
			//noLoop();
			return true;
		}
		return false;

	}
}

function resetx(){
	// 积分
	// 管子清除
	// bird 初始位置 
	// 清除提示信息
	// 恢复运行
	
	// console.log("resetx");
	bird.reset();

	bg.isEnd = false;
	pipes = [];
	bg.score = 0;
	bg.add_score = 10;
	bg.timer = 0;
}

class Pipe{
	// constructor(x,y,size1,size2,size3,size4){
	// 	this.x = x;
	// 	this.y = y;
	// 	this.rectWidth1 = size1;
	// 	this.rectHeight1 = size2;
	// }

	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

	}

	draw(){
		push();
		stroke('black');
		strokeWeight(3);
		fill('greenyellow');
		rectMode(CORNER);
		rect(this.x,this.y,this.w,this.h);
		// rect(this.x,this.y-height/2,this.rectWidth,this.rectHeight);
		//rect(this.x,this.y+height/2,this.rectWidth,this.rectHeight);

		if(DEBUG == true){
			fill('white')
			rect(this.x,this.y,this.w,this.h);
		}
		pop();


		fill('white')
		strokeWeight(2);
		// let rc = this.getRect();
		// rect(rc[0]+this.rectWidth/2,rc[1]+this.rectHeight,rc[2],rc[3]);


		this.x-=SPEED;
		// if(this.x <= -50){
		// 	this.x = width + 50;
		// 	this.width1 = random(200,350);
		// 	this.height1 = random(20,30);
		// 	this.width2 = random(200,350);
		// 	this.height2 = random(20,30);
		// }
	}

	getRect(){
  	// [1,2,100,200]
  	let shrink = 10;
  	return [this.x +shrink , this.y+shrink,
  					this.w-shrink*2,this.h-shrink*2];

  }
}

function preload(){
	bg_img = loadImage('assets/bg.jpeg');
	hero_img = loadImage('assets/hero.png');
	bg_music = loadSound('assets/bb.mp3');
}

function mousePressed(){
	//console.log("mousedown");
}

function setup(){
  createCanvas(800,432);

  rectMode(CENTER);

  imageMode(CENTER);

  angleMode(DEGREES);

  //bg_music.playMode('sustain');

  bg_x = width/2;
  bg_y = height/2;
  
  bg2_x = width/2 + width;

  bg = new Bg(bg_x,bg_y,bg2_x,bg_img);


  size1 = random(200,350);
  size2 = random(20,30);
  size3 = random(200,350);
  size4 = random(20,30);

  // pipe = new Pipe(width + width/2,height/2,size1,size2);

  bird = new Bird(width/4,height/2);

  color_1 = 'white';
  color_2 = 'white';

  // btn_retry = new Button(1,1,2,3,"retry");
  //if( judgeClient() !='iOS'){
   // bg_music.setLoop(true);
    //bg_music.play();
  //}

  click_count = 0;
}

function music_play(){
	bg_music.setLoop(true);
	bg_music.play();
}


function draw(){
	/*
	music_play_timer += deltaTime/1000;
	if( music_play_start == false && music_play_timer >= 1000){
		music_play();
		music_play_timer = 0;
		music_play_start = true;
		
	}
	*/

	background('black');

	bg.draw();

	//ellipse(bird.x,bird.y,30,30);
	bird.draw();
	timer+=deltaTime/1000.;
	if(timer>=random(1,2)){

		// pipe 1 
		let x = width + width/2;
		let y = 0 ;
		let w = 30;
		let h = 20;
		h = random(100,height/3*2);

		if ( int(random(10)) %2 == 0){
			y = 0;
		}else{
			y = height - h ;
		}

		let pipe = new Pipe(x,y,w,h)
		pipes.push(pipe);

		//
		if (int (random(10))%2 == 0){
			if(y==0){
				h = random(30,height-h - random(60,80));
				y = height -h;
			}else{
				y = 0 ;
				h = random(30,height-h - random(60,80));
			}
			let pipe = new Pipe(x,y,w,h)
		pipes.push(pipe);			
		}
		timer = 0;
	}

	for(let i = 0;i<pipes.length;i++){
		let pipe = pipes[i];
		pipe.draw();
	}
	
	if(mouseIsPressed){
		bird.ay += 0.6;
		bird.isUping = true;
	}else{
		bird.isUping = false;
	}

	if(bird.y >= height && bird.y <= height+30){
		// noLoop();
		bird.gravity = 5;
		bg.isEnd = true;
		
	}

	if(bird.y <= -20){
		bird.gravity = 5;
		bg.isEnd = true;
	}


	bg.drawScore();

	

	if(bg.isEnd == true){
		bg.end();
	}



	let rcBird = bird.getRect();
	for(let i = 0;i<pipes.length;i++){
		let pipe = pipes[i];
		let rcPipe = pipe.getRect();
		if (bg.isRcInteract(rcBird,rcPipe)){
			bg.isEnd = true;	
			bird.gravity = 5;
		}
	}
	
		

}

function mousePressed(){
	if(bg.isEnd == true){
		if(mouseX >= width/2-70 -50 
		&& mouseX <= width/2-70 +50
		&& mouseY >= height/2+90 -25
		&& mouseY <= height/2+90 +25){
			resetx();

		}
	}
	
	if( click_count == 0){
		music_play();
	}
	click_count++;
}
