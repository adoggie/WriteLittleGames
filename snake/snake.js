let crossIndex = 0;
let siteIndex = 0;

let dividend = 0;

let snakehead = null;
let basicBody = null;

let headx = 0;
let heady = 0;

const CELL_W = 40;
const CELL_H = 40;
const ROWS = 10;
const COLS = 10;

let rannum1 = 0;
let rannum2 = 0;

let body1 = null;
let body2 = null;

let old_body = null;

let LEFTX = 0;
let LEFTY = 0;
let UPX = 0;
let UPY = 0;
let RIGHTX = 0;
let RIGHTY = 0;
let DOWNX = 0;
let DOWNY = 0;

class SnakeHead{
	constructor(x,y,size,step){
		this.x = x;
		this.y = y;
		this.size = size;
		this.timer = 0;
		this.moveStep = step;
		//方向默认向右
		this.direction = 'right';
		this.next = null;
	}

	draw(){
		push();
		rectMode(CENTER);
		stroke('green');
		strokeWeight(1.5);
		fill('green');
		let x = this.x * CELL_W + CELL_W/2;
		let y = this.y * CELL_H + CELL_H/2;
		rect(x,y,CELL_W*0.85,CELL_H*0.85);
		pop();
	}

	move(){
		this.moveDirection();
	}

	moveDirection(){
		if(this.direction == 'right'){
			this.x+=1;
		}

		if(this.direction == 'up'){
			this.y-=1;
		}

		if(this.direction == 'down'){
			this.y+=1;
		}

		if(this.direction == 'left'){
			this.x-=1;
		}
	}

}


class SnakeBody{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.next = null;
		this.prev = null;
	}

	draw(){
		push();
		stroke('green');
		fill('greenyellow');
		//fill('red');
		rectMode(CENTER);
		let x = this.x * CELL_W + CELL_W/2;
		let y = this.y * CELL_H + CELL_H/2;
		rect(x,y,CELL_W*0.8,CELL_H*0.8);
		pop();
	}

}


class Snake{
	constructor(x,y,num){
		this.head = new SnakeHead(x,y,CELL_W*0.85,CELL_W);
		this.body = null;
		this.timer = 0;

		// this.num = num;

		for(let i = 0;i < num;i++){
			if(this.body == null){
				this.body = new SnakeBody(3,4,CELL_W*0.8);
				continue;
			}

			let body = this.body;
			while(body.next != null){
				body = body.next;
			}
			//body已经是最后一个
			let newBody = new SnakeBody(3,4,CELL_W*0.8);
			body.next = newBody;
			newBody.prev = body;
		}

	}

	draw(){
		
		let body = this.body;
		while(body != null ){
			body.draw();
			//console.log(body.next);
			body = body.next;

		}

		


		this.head.draw();
	}

	move(){

		this.timer += deltaTime/1000.;
		if(this.timer>=0.5){
			// this.moveDirection();	
			let body = this.body;

			if(body == null){
				this.head.move();
				this.timer = 0;
				return;
			}

			let node = this.body;
			while(node.next != null){
				node = node.next;
			}
			//node已经变成最后一个块
			while(node.prev != null){
				node.x = node.prev.x;
				node.y = node.prev.y;
				node = node.prev;

				this.num++;
			}


      let headx = this.head.x;
			let heady = this.head.y;
			this.body.x = headx;
			this.body.y = heady;

			this.head.move() ;

			this.timer = 0;
		
	}else{
		return ;
		
	}
		
		
	}


	growup(){
		let new_body = new SnakeBody(0,0,CELL_W*0.8)
		if(this.body == null){
			new_body.x = this.head.x;
			new_body.y = this.head.y;
			this.body = new_body;
			return;
		}

		let last = this.body;

		while(last.next != null){
			last = last.next;
		}
		new_body.x = last.x;
		new_body.y = last.y;
		last.next = new_body;
		new_body.prev = last;

	}

}

function setup(){
  createCanvas(CELL_W*COLS,CELL_H*ROWS);

  rectMode(CENTER);

  dividend = 10;

	//body2 = new SnakeBody(2,4,CELL_W*0.8);

  //body1.next = body2;
  //body2.prev = body1;

  let bodyN = 2;
  snake = new Snake(4,4,0);

  rannum1 = int(random(0,ROWS));
  rannum2 = int(random(0,COLS));

  // old_body = snake.body;

}

function draw(){
	background('white');
	snake.draw();
	snake.move();

	// basicBody.x = snakehead.x-width/dividend;
	// basicBody.y = snakehead.y;


	push();
	stroke('black');
	strokeWeight(5);
	noFill();
	rect(width/2,height/2,width,height);


	//横向线
	for(var i = 0;i<height/dividend;i++){
		strokeWeight(2);
		line(0,siteIndex,width,siteIndex);
		siteIndex += height/dividend;
	}
	siteIndex = 0;


	//纵向线
	for(var i = 0;i<width/dividend;i++){
		strokeWeight(2);
		line(crossIndex,0,crossIndex,height);
		crossIndex += width/dividend;
	}
	crossIndex = 0;





	//随机生成苹果
	fill('red');
	stroke('black');
	rectMode(CENTER);
	//console.log('--',rannum);
	let rectx = rannum1*CELL_W+CELL_W/2;
	let recty = rannum2*CELL_H+CELL_H/2;
	rect(rectx,recty,30,30);

	if(snake.head.x* CELL_W + CELL_W/2 == rectx 
		&& snake.head.y* CELL_H + CELL_H/2 == recty){
		console.log('sb');
		rannum1 = int(random(0,ROWS));
		rannum2 = int(random(0,COLS));

		snake.growup();

	}


	//按键
	fill('blue');
	stroke('black');
	LEFTX = 0*CELL_W+CELL_W/2;
	LEFTY = 8*CELL_W+CELL_W/2;
	ellipse(LEFTX,LEFTY,CELL_W,CELL_H);
	fill(0,200,255);
	text('LEFT',0*CELL_W+CELL_W/2-15,8*CELL_W+CELL_W/2+5);

	fill('yellow');
	stroke('black');
	UPX = 1*CELL_W+CELL_W/2;
	UPY = 7*CELL_W+CELL_W/2;
	ellipse(UPX,UPY,CELL_W,CELL_H);	
	fill(200,150,100);
	text('UP',1*CELL_W+CELL_W/2-10,7*CELL_W+CELL_W/2+5);


	fill('orange');
	stroke('black');
	RIGHTX = 2*CELL_W+CELL_W/2;
	RIGHTY = 8*CELL_W+CELL_W/2;
	ellipse(RIGHTX,RIGHTY,CELL_W,CELL_H);
	fill(200,100,100);
	text('RIGHT',2*CELL_W+CELL_W/2-15,8*CELL_W+CELL_W/2+5);

	fill('purple');
	stroke('black');
	DOWNX = 1*CELL_W+CELL_W/2;
	DOWNY = 9*CELL_W+CELL_W/2;
	ellipse(DOWNX,DOWNY,CELL_W,CELL_H);	
	fill(200,100,200);
	text('DOWN',1*CELL_W+CELL_W/2-20,9*CELL_W+CELL_W/2+5);

	pop();




}

function keyPressed(){
	if(keyCode == UP_ARROW){
		snake.head.direction = 'up';
	}
	if(keyCode == RIGHT_ARROW){
		snake.head.direction = 'right';
	}
	if(keyCode == LEFT_ARROW){
		snake.head.direction = 'left';
	}
	if(keyCode == DOWN_ARROW){
		snake.head.direction = 'down';
	}
}

function mousePressed(){
	console.log(mouseX);
	console.log(mouseY);

	console.log(LEFTX,LEFTY);
	if(mouseX>=LEFTX-20 && mouseX<=LEFTX+20 && mouseY >= LEFTY-20 && mouseY <= LEFTY+20){
		snake.head.direction = 'left';
	}
	if(mouseX>=UPX-20 && mouseX<=UPX+20 && mouseY >= UPY-20 && mouseY <= UPY+20){
		snake.head.direction = 'up';
	}
	if(mouseX>=RIGHTX-20 && mouseX<=RIGHTX+20 && mouseY >= RIGHTY-20 && mouseY <= RIGHTY+20){
		snake.head.direction = 'right';
	}
	if(mouseX>=DOWNX-20 && mouseX<=DOWNX+20 && mouseY >= DOWNY-20 && mouseY <= DOWNY+20){
		snake.head.direction = 'down';
	}

}
