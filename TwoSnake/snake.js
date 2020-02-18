class Snake{
  constructor(x,y,num,headCol,bodyCol){
    this.x = x;
    this.y = y;
    this.head = new Head(this,this.x,this.y);
    this.body_list = [];
    this.headCol = headCol;
    this.bodyCol = bodyCol;
    for (let index = 0;index<num-1;index++){
      this.body_list.push(new BodyBlock(this,this.x,this.y+index+1,index+1));
    }
    
  }
  
  display(){
    for (let invex = 0;invex<this.body_list.length;invex++){
      let body = this.body_list[invex];
      body.display();
    }
    this.head.display();
  }
  
  move(dir,step){
    let index = this.body_list.length-1;
    while (index>0){
      let body1 = this.body_list[index];
      let body2 = this.body_list[index-1];
      body1.x = body2.x;
      body1.y = body2.y;
      index--;
    }
    this.body_list[0].x = this.head.x;
    this.body_list[0].y = this.head.y;
    
    if (dir == 'left'){
      this.head.x-=step;
    }
    if (dir == 'right'){
      this.head.x+=step;
    }
    if (dir == 'up'){
      this.head.y-=step;
    }
    if (dir == 'down'){
      this.head.y+=step;
    }

  }
  add_tail(){
    let body = new BodyBlock(this,0,0,0);
    let lastBody = this.body_list[this.body_list.length-1];
    body.x = lastBody.x;
    body.y = lastBody.y;
    this.body_list.push(body)
  }
}
