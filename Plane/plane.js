class Bullet{

  constructor(img,x,y){
    this.img = img;
    this.x = x;
    this.y = y;
  }
  
  fly(){
    this.y -=8;
  }
  
  draw(){
    push();
    imageMode(CENTER);
    image(this.img,this.x,this.y);
    pop();
  }
  
  is_visible(){
    if(this.x <0 || this.y <0 ){
      return false;
    }
    return true;
  }
  
  destroy(){
    
  }
}

class Plane{
  constructor(img1,img2){
    this.health =100;  //生命值
    this.img1 = img1;
    this.img2 = img2;
    this.x = SCREEN_WIDTH/2;
    this.y = SCREEN_HEIGHT - this.get_size().h /2 -10;
    this.speed = 3;
    this.timer_animation = 0;
    this.timer_shot = 0;
    this.image = this.img1;
    // print(this.x,this.y);
    
    this.bullets = [];
  }
  
  get_size(){
    return {w:102,h:126};
  }
  
  get_speed(){
    return this.speed;
  }
  
  draw(){
    push();
    imageMode(CENTER);
    
    this.timer_animation+= deltaTime/1000;
    if(this.timer_animation >0.5){
      if(this.image == this.img1){
        this.image = this.img2;
      }else{
        this.image = this.img1;
      }
      this.timer_animation = 0;
    }
    image(this.image,this.x,this.y);    
    
    circle(this.x,this.y,20);
    pop();
    if( keyIsDown( LEFT_ARROW) ){
      this.x -= this.speed;
    }
    if( keyIsDown( RIGHT_ARROW) ){
      this.x += this.speed;
    }
    if( keyIsDown( UP_ARROW) ){
      this.y -= this.speed;
    }
    if( keyIsDown( DOWN_ARROW) ){
      this.y += this.speed;
    }
    
    this.x = mouseX;
    this.y = mouseY;
    
    this.timer_shot+= deltaTime/1000;
    if(this.timer_shot >0.2){
      this.shot();
      this.timer_shot = 0;
    }
    
    this.draw_bullet();
  }
  
  draw_bullet(){
    let remove_list = [];
    
    for(let n=0;n<this.bullets.length;n++){
      let b = this.bullets[n];
      b.fly();
      b.draw();
      if( b.is_visible() == false){
        remove_list.push(b);
      }
      for(let m=0;m< enemy_list.length;m++){
        let enemy = enemy_list[m];
        enemy.hit(b);
      }
    }
    
    for(let n=0;n< remove_list.length;n++){
      let idx = this.bullets.indexOf(remove_list[n]);
      this.bullets.splice(idx,1);
    }
  }
  
  shot(){
    let x = this.x;
    let y = this.y - this.get_size().h/2;
    
    let b = new Bullet(img_bullet1,x,y);
    this.bullets.push(b);
    bulletsnd.play();
    
  }
}