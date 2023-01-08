//直线飞行路径
class StraightPath{
  constructor(){
    this.speed = 2;
    this.timer = 0;
    this.x = int(random(SCREEN_WIDTH));
    this.y =  int(random(-20,0));
  }
  
  next(){
    this.timer += deltaTime/1000;
    if(this.timer > 0.01){
      this.y += this.speed;
      this.timer = 0;
    }
    return {x:this.x,y:this.y};
  }
  
}


let boom_timer = 0;
class Enemy{
  constructor(img,path){
    this.img = img;
    this.x = 0;
    this.y = 0;
    this.harm_imgs ={h100:img,h80:img_down1,h40:img_down2,h20:img_down3,h0:img_down4};
    this.speed = 3;
    this.path = path;
    this.health = 100;
    this.dead_timer =0;
  }
  
  get_size(){
    return {w:57,h:43};
  }
  
  draw(){

    if( this.health <= 0){
      boom_timer+=deltaTime/1000;
      if(boom_timer > 0.3){
        sndboom.play();
        boom_timer =0;
      }
      
      this.dead_timer += deltaTime/1000;
      
    }
    
    
    if( this.health <= 0){
      
    }
    
    let xy = this.path.next();
    this.x = xy.x;
    this.y = xy.y ;
    push();
    imageMode(CENTER);
    if( this.health <= 0){
      this.img = this.harm_imgs.h0;
    }else if( this.health <= 20){
      this.img = this.harm_imgs.h20;
    }else if( this.health <= 40){
      this.img = this.harm_imgs.h40;
    }else if( this.health <= 0){
      this.img = this.harm_imgs.h80;
    }else{
      this.img = this.harm_imgs.h100;
    }
    image(this.img,this.x,this.y);
    pop();
  }
  
  is_visible(){
    if( this.dead_timer > 0.3){
      return false;
    }
    if(this.y > SCREEN_HEIGHT + this.get_size().h/2){
      return false;
    }
    return true;
    if(this.x > SCREEN_WIDTH + this.get_size().w/2){
    }
  }
  
  destroy(){
    
  }
  
  hit(bullet){
    
    if( bullet.x >= this.x - this.get_size().w/2 
       && bullet.x <= this.x + this.get_size().w/2
       && bullet.y >= this.y - this.get_size().h/2
      && bullet.y <= this.y + this.get_size().h/2){
      
      if( this.health >0 && this.health-20 <=0){
        dead_enemy_num+=1;
      }
      this.health -= 20;
      
    }
  }
  
}