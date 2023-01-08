class Bullet{

  constructor(img,x,y){
    this.img = img;
    this.x = x;
    this.y = y;
    this.weapon = null;
  }
  
  
  draw(){
    
    this.weapon.draw_bullet(this);
    // return;
    // this.weapon.fly(this);
    // push();
    // imageMode(CENTER);
    // image(this.img,this.x,this.y);
    // // circle(this.x,this.y,5);
    // pop();
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

WEAPON_GUN = 1;
WEAPON_S_GUN = 2;

class Plane{
  constructor(img1,img2){
    this.health =100;  //生命值
    this.img1 = img1;
    this.img2 = img2;
    this.x = SCREEN_WIDTH/2;
    this.y = SCREEN_HEIGHT - this.get_size().h /2 -10;
    this.speed = 3;
    this.timer_animation = 0;
    // this.timer_shot = 0;
    this.timer_shot = new TimerDelay(0.1,this.shot,this);
    this.image = this.img1;
    // print(this.x,this.y);
    
    this.bullets = [];
    this.weapon_type = WEAPON_GUN;
    this.weapon_gun = new WeaponGun();
    this.weapon_s_gun  = new WeaponSGun();
    this.weapon = this.weapon_gun;
    this.weapon = this.weapon_s_gun;
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
    
    // circle(this.x,this.y,20);
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
    
    // this.timer_shot+= deltaTime/1000;
    // if(this.timer_shot >0.2){
    //   this.shot();
    //   this.timer_shot = 0;
    // }
    this.timer_shot.run();
    this.draw_bullet();
  }
  
  draw_bullet(){
    let remove_list = [];
    
    for(let n=0;n<this.bullets.length;n++){
      let b = this.bullets[n];
  
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
  
  shot(p){
    p.weapon.shot(p);
  }
}


class WeaponGun{
  constructor(){
  }
  
  draw_bullet(b){
    // print(b);
    this.fly(b);
    push();
    imageMode(CENTER);
    image(b.img,b.x,b.y);
    // circle(this.x,this.y,5);
    pop();
    
  }
  
  fly(bullet){
    bullet.y -=8;
  }
  
  shot(p){
    let x = p.x;
    let y = p.y - p.get_size().h/2;
    
    let b = new Bullet(img_bullet1,x,y);
    b.weapon = this;
    p.bullets.push(b);
    
    bulletsnd.play();
  }
}

class WeaponSGun{
  constructor(){
  }
  
  
  
  draw_bullet(b){
    // print(b);
    this.fly(b);
  
    push();
    translate(b.origin.x,b.origin.y);
    rotate(radians(b.angle));
    
    // imageMode(CENTER);
    // image(b.img,b.x - b.origin.x,b.y-b.origin.y );
    // circle(this.x,this.y,5);
    fill(random(150,250),random(200),random(100));
    circle(b.x - b.origin.x,b.y-b.origin.y,6 );
    pop();
    
  }
  
  fly(bullet){
    bullet.y -=8;
  }
  
  shot(p){
    let x = p.x;
    let y = p.y - p.get_size().h/2;
    
    let a = new Bullet(img_bullet1,x,y);
    let b = new Bullet(img_bullet1,x,y);
    let c = new Bullet(img_bullet1,x,y);
    a.angle = 30;
    b.angle = 0;
    c.angle = -30;
    
    a.weapon = this;
    b.weapon = this;
    c.weapon = this;
    
    a.origin = {x:x,y:y};
    b.origin = a.origin;
    c.origin = a.origin;
    
    p.bullets.push(a,b,c);
    
    bulletsnd.play();
  }
}
