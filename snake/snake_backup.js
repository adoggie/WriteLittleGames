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
	constructor(head,body){
		this.head = head;
		this.body = body;
		this.timer = 0;

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
		if(this.timer>=0.1){
			// this.moveDirection();	
			let body = this.body;
			if(body == null){
				this.head.move();
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

		let new_body = new SnakeBody(old_body.x,old_body.y,CELL_W);
		// old_body.next = new_body;
		// new_body.prev = old_body;
		// old_body = new_body;

		if(this.body == null){
			this.body = new_body;
			return;
		}

		let last = this.body;

		while(last.next != null){
			last = last.next;
		}

		last.next = new_body;
		new_body.prev = last;

	}

}

function setup(){
  createCanvas(CELL_W*COLS,CELL_H*ROWS);

  rectMode(CENTER);

  dividend = 10;

  snakehead = new SnakeHead(4,4,CELL_W*0.85,CELL_W)

  body1 = new SnakeBody(3,4,CELL_W*0.8);

	body2 = new SnakeBody(2,4,CELL_W*0.8);

  body1.next = body2;
  body2.prev = body1;

  let bodyN = 2;
  snake = new Snake(snakehead,body1);

  rannum1 = int(random(0,ROWS));
  rannum2 = int(random(0,COLS));

  old_body = body2;

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
	let rectx = rannum1*CELL_W+CELL_W/2
	let recty = rannum2*CELL_H+CELL_H/2
	rect(rectx,recty,30,30);

	if(snakehead.x* CELL_W + CELL_W/2 == rectx 
		&& snakehead.y* CELL_H + CELL_H/2 == recty){
		console.log('sb');
		rannum1 = int(random(0,ROWS));
		rannum2 = int(random(0,COLS));

		snake.growup();

	}
	pop();


}

function keyPressed(){
	if(keyCode == UP_ARROW){
		snakehead.direction = 'up';
	}
	if(keyCode == RIGHT_ARROW){
		snakehead.direction = 'right';
	}
	if(keyCode == LEFT_ARROW){
		snakehead.direction = 'left';
	}
	if(keyCode == DOWN_ARROW){
		snakehead.direction = 'down';
	}
}