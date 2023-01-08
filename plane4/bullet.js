class Bullet{
  constructor(x,y,image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.damage = GameControll.diff_current.bullet_damage_1;
  }
  
  display(){
    push();
    imageMode(CENTER);
    image(this.image,this.x,this.y);
    pop();
    
  }
  
  move(){
    this.y -= 10;
    // print('b is:',  this,this.y);
  }
}

class Bullet2{
  constructor(x,y,img){
    this.x = x;
    this.y = y;
    this.img = img;
    this.damage = GameControll.diff_current.bullet_damage_2;
  }
  
  display(){
    push();
    imageMode(CENTER);
    image(this.img,this.x,this.y);
    pop();
  }
  
  move(){
    this.y -= 10;
  }
}