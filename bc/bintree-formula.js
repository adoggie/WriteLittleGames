
// 二叉树实现简单计算器

timer = 0;

running = false;
RING_NUM = 9;
timer = 0;
freqs = 0.5;

RING_HEIGHT = 15;
COLORS = ['aqua','black','blue','fuchsia','gray','green','lime','maroon','navy','olive','purple','red','silver','teal','yellow'];
COLORS = ['aqua','blue','green','olive','purple','red','silver','teal','yellow'];


OP_ADD = '+';
OP_DIV = '/';
OP_MUL = '*';
OP_SUB = '-';
OP_BRACE_OPEN ='(';
OP_BRACE_CLOSE = ')';
OP_NUM = 'value';
OP_ROOT = 'result';

class Node{
  constructor(parent,op,value){
    this.parent = parent;
    this.left = null;
    this.right = null;
    this.op = op;
    this.value = value;

    this.x = 0;
    this.y = 0 ;
    this.high = 0;
  }

  getHigh(){
    let left=0,right=0;
    let h = 1;


    if( this.left !=null){
      left = this.left.getHigh();
    }

    if( this.right !=null){
      right = this.right.getHigh();
    }
    if( left == right){
      h += left;
    }else {
      h = h + max(left , right);
    }
    // print(this.op,this.value,h,left,right);
    this.high = h;
    return h;
  }

  draw(high){
    // high = this.getHigh();
     push();
     let D = 50;
    let max_bottom_num = 2**(high-1); // 底层最大节点数
    let ext = D * max_bottom_num/4;
    ext = this.high * 20;
    // draw connector with parent
    if(this.parent!=null){
      line(this.x,this.y , this.parent.x,this.parent.y);
    }

    // 层数越高 叉开角度越大
    if(this.left != null){
      this.left.x = this.x - ext ;
      this.left.y = this.y + 60;
      this.left.draw(high-1);
    }

    if(this.right != null){
      this.right.x = this.x + ext;
      this.right.y = this.y + 60;
      this.right.draw(high-1);
    }
    // noFill();
    stroke('blue');

    circle(this.x,this.y,D);
    fill('red');
    textSize(14);
    textAlign(CENTER,CENTER);
    if( this.op == OP_NUM){
      text(this.value, this.x, this.y);
    }else {
      text(this.op, this.x, this.y);
    }


    pop();

  }

  getValue(){
    if(this.op == OP_NUM ){
      return this.value;
    }
    let value = 0;
    if( this.left !=null){
      value = this.left.getValue();
    }
    if( this.right != null){
      if( this.op ==  OP_ADD){
        value += this.right.getValue();
      }else if( this.op == OP_SUB){
        value -= this.right.getValue();
      }else if( this.op == OP_MUL){
        value *= this.right.getValue();
      }else if( this.op == OP_DIV){
        value /= this.right.getValue();
      }

    }
    return parseFloat(value).toFixed(2);
  }

}


function parse(text_express){
  let it = 0;
  let p = -1;
  let num = null;

  let root = null;
  let node = null;
  node = null;
  let last_op = '';
  let muldiv = null;
  while( true ){
    if(it == text_express.length ){
      break;
    }
    if('+-*/'.indexOf(text_express[it]) ==-1 ){
      if( p==-1){ // 数值开始位置
        p = it;
        it+=1;
        continue ;
      }
      it+=1;
    }else{ // 遭遇二元操作符 +-*/
      if( p == -1){ // 无左侧数值
        print('expression error.');
        return null;
      }
      let sub  = text_express.substring(p,it); //提取数值
      num = new Node(null,OP_NUM,parseFloat(sub));
      let op;
      op = new Node(null,text_express[it],0); // 二元操作符
      if( '*/'.indexOf(text_express[it]) != -1){
        if( muldiv == null){
          muldiv = op;   //  记录 连续*/ 的第一个节点
        }

      }
      // else{
      //   muldiv = null;
      // }
      if(node == null){  // 第一个节点
        op.left = num;
        num.parent = op ;
        node = op;
        root = op;
        root.high = 2;
      }else{
        if( '+-'.indexOf(text_express[it])!=-1 && muldiv!= null){
          node.right = num;
          num.parent = node ;
          // op.left = muldiv ;
          if(muldiv.parent ==null){
            // op.high = root.high;
            op.left = muldiv;
            muldiv.parent = op;
            root = op;
            // root.high +=1;
          }else{
            op.left = muldiv.parent;
            muldiv.parent.parent = op;
            //op.parent = muldiv.parent;
            root = op;

          }
          // muldiv.parent = op;
          muldiv = null;
          node = op;
        }else {

          // if(node.op == OP_SUB){
          //   if(op.op == OP_SUB){
          //     op.op = OP_ADD;
          //   }else if( op.op == OP_ADD){
          //     op.op = OP_SUB;
          //   }
          //
          // }
          if( '+-'.indexOf(text_express[it])!=-1){
            node.right =  num;
            num.parent = node;
            op.left = node ;
            node.parent = op ;
            node = op;
            root = op;

          }else {


            node.right = op;
            op.parent = node;
            op.left = num;
            num.parent = op;
            node = op;
          }
        }
      }
      p =  -1;
      it+=1;
    }
  }
  //
  if(node == null){
    return null;
  }

  if( p == -1){
    print('express error.');
    return null;
  }
  let sub  = text_express.substring(p,it);
  num = new Node(null,OP_NUM,parseFloat(sub));
  node.right = num;
  num.parent = node;


  let value = root.getValue();
  print( value);
  print(root.high);
  return root;
}


let calc_text="10*2*3*7-5/2*4+4/2*11-25*2*4/6-2";
// calc_text="1+2*3*5-6";
let result='';

let tree = null;
function setup() {

  createCanvas(1000,800);

  // parse("5+2*4*2-1");
  // tree = parse("10+21*2-2*10/5+3");
  tree = parse(calc_text);
  print('tree high:',tree.getHigh());

  result = tree.getValue();

  frameRate(5);
  gui = createGui();
  btn_0 = createButton("0", 20, 20,40,40);
  btn_1 = createButton("1", 60, 20,40,40);
  btn_2 = createButton("2", 100, 20,40,40);

  btn_3 = createButton("3", 20, 60,40,40);
  btn_4 = createButton("4", 60, 60,40,40);
  btn_5 = createButton("5", 100, 60,40,40);

  btn_6 = createButton("6", 20, 100,40,40);
  btn_7 = createButton("7", 60, 100,40,40);
  btn_8 = createButton("8", 100, 100,40,40);

  btn_9 = createButton("9", 20, 140,40,40);
  btn_dot = createButton(".", 60, 140,40,40);

  btn_add = createButton("+", 100, 140,40,40);

  btn_sub = createButton("-", 20, 180,40,40);

  btn_mul = createButton("*", 60, 180,40,40);
  btn_div = createButton("/", 100, 180,40,40);

  btn_back = createButton("back", 20, 220,120,40);
  btn_clear = createButton("clear", 20, 260,120,40);
}



function draw() {
  background('#F0F0F0');

  textAlign(CENTER,CENTER);
  textSize(32);
  text(calc_text,width/2,50 );

  textAlign(LEFT,CENTER);
  text("result:"+result,200,100 );

  drawGui();

  if( tree != null){

    let tree_high_ext = tree.high * (60+20);

    tree.x = width/4*3 ;// (width -  tree_width_ext) /2;
    tree.y = (height - tree_high_ext)/2;
    tree.draw(tree.high);
  }

  if(btn_0.isPressed) {calc_text +="0";update();}
  if(btn_1.isPressed) {calc_text +="1";update();}
  if(btn_2.isPressed) {calc_text +="2";update();}
  if(btn_3.isPressed) {calc_text +="3";update();}
  if(btn_4.isPressed) {calc_text +="4";update();}
  if(btn_5.isPressed) {calc_text +="5";update();}
  if(btn_6.isPressed) {calc_text +="6";update();}
  if(btn_7.isPressed) {calc_text +="7";update();}
  if(btn_8.isPressed) {calc_text +="8";update();}
  if(btn_9.isPressed) {calc_text +="9";update();}
  if(btn_dot.isPressed) {calc_text +=".";update();}
  if(btn_add.isPressed) {calc_text +="+";update();}
  if(btn_sub.isPressed) {calc_text +="-";update();}
  if(btn_mul.isPressed) {calc_text +="*";update();}
  if(btn_div.isPressed) {calc_text +="/";update();}
  if(btn_back.isPressed) {
    if(calc_text.length !=0){
      calc_text = calc_text.substring(0,calc_text.length-1);
      update();
    }
  }
  if(btn_clear.isPressed) {calc_text ="";update();}

}

function update(){
  tree = parse(calc_text);
  if(tree!=null){
    tree.getHigh();
    result = tree.getValue();
  }else{
    result = '';
  }
}

function keyPressed() {
  let codes=[8,42,43,45,46,47,48,49,50,51,52,53,54,55,56,57];
  if( codes.indexOf(keyCode) !=-1){
    if( keyCode == 8){
      if(calc_text.length !=0){
        calc_text = calc_text.substring(0,calc_text.length-1);
      }
    }
    let chr = String.fromCharCode(keyCode);
    calc_text += chr;
    // alert(chr);

  }
}