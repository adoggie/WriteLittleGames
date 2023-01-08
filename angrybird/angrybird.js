let index1 = 0;
let index2 = 0;

let v1 = null;
let v2 = null;

let angle = 0;

let ballx = 0;
let bally = 0;
let ballv = null;

let to_cannon_v = null;

let oldballx = 0;
let oldbally = 0;

function setup(){
  createCanvas(600,400);

  imageMode(CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);

  index1 = random(150,400);
  index2 = random(200,380);

  cannon_length = 50;

  ballx = 500;
  bally = 300;

  to_cannon_v = createVector(500,300);
 }

function draw(){
	background(100,200,255);
	v1 = createVector(-cannon_length,-50);
	v2 = createVector(20,0);

	v1.rotate(angle);

	



	if(keyIsDown(LEFT_ARROW)){
		angle-=3;
	}

	if(keyIsDown(RIGHT_ARROW)){
		angle+=3;
	}

	if(keyIsDown(UP_ARROW)){
		cannon_length+=3;
	}

	if(keyIsDown(DOWN_ARROW)){
		cannon_length-=3;
	}


	if(cannon_length>=100){
		cannon_length = 100;
	}
	if(cannon_length<0){
		cannon_length = 0;
	}

	//框定区域
	push();
	strokeWeight(2);
	fill('red');
	rect(50,350,10,70);
	rect(150,350,10,70);
	textSize(20);
	stroke('black');
	strokeWeight(2);
	text('GOAL',75,340);
	pop();

	//障碍物
	push();
	fill('blue');
	rect(index1,350,10,200);

	rect(index2,0,10,200);
	pop();


	//地面
	push();
	noStroke();
	fill('greenyellow');
	rect(300,400,600,100);
	pop();

	//支架
	push();
	translate(500,300);
	noStroke();
	fill('yellow');
	rect(0,0,15,100);


	stroke('black');
	strokeWeight(12);
	line(0,0,v1.x,v1.y);

	stroke('yellow');
	strokeWeight(8);
	line(0,0,v1.x,v1.y);
	pop();


	push();
	let v3 = p5.Vector.add(v1,v2);



	if(ballv != null){
		
		let gravity_v =createVector(0,1); //重力向量，鲷哥老是搞错
		oldballx = ballx; //球的上一次位置
		oldbally = bally;


		// if(ballv.mag() > 5){ // 球向量长度小于5，也就是速度小于5

		if(true){ 
			ballv = p5.Vector.add(ballv,gravity_v); // 上升过程速度慢慢减慢
			ballv.mult(0.995 ); // 向量长度就是速度， mult()越来越短，也就是速度降下来
		}


		// let tooldball_v = createVector(oldballx,oldballx);
		let tooldball_v = createVector(oldballx,oldbally);
		toball_v = p5.Vector.add(tooldball_v,ballv);
		ballx = toball_v.x;
		bally = toball_v.y;
		strokeWeight(4);
		fill('red'); 
		ellipse(ballx,bally,20,20);

	}
	pop();



}

function keyPressed(){
	if(keyCode == 32){

		ballv = v1;
		// console.log(v1);
		let toball_v = p5.Vector.add(v1,to_cannon_v);
		ballx = toball_v.x;
		bally = toball_v.y;

		ballv.normalize().mult(20); // 球初始速度为20
		// 往后拉的过程进行蓄力，也就是增加 这个向量（速度）
	}
}