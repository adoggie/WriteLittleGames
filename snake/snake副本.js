let crossIndex = 0;
let siteIndex = 0;

let dividend = 0;

let snakehead = null;
let basicBody = null;

let headx = 0;
let heady = 0;

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
		rect(this.x,this.y,this.size,this.size);
		pop();
	}

	move(){
		this.moveDirection();
	}

	moveDirection(){
		if(this.direction == 'right'){
			this.x+=this.moveStep;
		}

		if(this.direction == 'up'){
			this.y-=this.moveStep;
		}

		if(this.direction == 'down'){
			this.y+=this.moveStep;
		}

		if(this.direction == 'left'){
			this.x-=this.moveStep;
		}
	}

}


class SnakeBody{
	constructor(x,y,size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.next = null;
		this.prev = null;
	}

	draw(){
		push();
		stroke('green');
		fill('greenyellow');
		fill('red');
		rectMode(CENTER);
		rect(this.x,this.y,this.size,this.size);
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
			console.log(body.next);
			body = body.next;

		}

			


		this.head.draw();
	}

	move(){

		this.timer += deltaTime/1000.;
		if(this.timer>=0.85){
			// this.moveDirection();	
			let body = this.body;
			if(body == null){
				this.head.move();
				return;
			}
			while(body.next == null){
				let end = body;

				while(end.prev != null){
					end.x = end.prev.x;
					end.y = end.prev.y;
					end = end.prev;
				}
				//end.x = this.head.x;
				//end.y = this.head.y;
				//this.head.move(); 
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

}

function setup(){
  createCanvas(400,400);

  rectMode(CENTER);

  dividend = 10;

  snakehead = new SnakeHead(width/2+width/dividend/2,
  													height/2+height/dividend/2,
  													width/dividend*0.85,
  													width/dividend);
  let body1 = new SnakeBody(snakehead.x-width/dividend,snakehead.y,width/dividend*0.8);

  let body2 = new SnakeBody(snakehead.x-width/dividend*2,snakehead.y,width/dividend*0.8);

  body1.next = body2;
  body2.prev = body1;

  snake = new Snake(snakehead,body1);

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