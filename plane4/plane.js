class Plane{
  constructor(x,y,image1,image2){
    this.x = x;
    this.y = y;
    this.image1 = image1;
    this.image2 = image2;
    this.image = image1;
    this.timer = 0;
    this.full_health = 200;
    this.health = this.full_health;
    this.damage = 0;
    this.full_energy = 400;
    this.lives = 2;
    this.color1 = 0;
    this.color2 = 255;
    this.color = this.color1;
    
    this.energy_color1 = 0;
    this.energy_color2 = 0;
    this.energy_color3 = 255;
    
    this.protect_timer = 0; // 维持3秒
    this.protect_effective_time = 3; // 3s
    this.energy = 0;
    this.reset();
  }
  
  reset(){
    this.protect_active = true; //护盾激活
    this.protect_timer = 0;
    this.health = this.full_health;
  }
  
  get_size(){
    return {w:102,h:126};
  }
  
  display(){
    push();
    imageMode(CENTER);
    push();
    fill(0);
    rect(30,650,this.health,10);
    pop();
    this.timer += deltaTime/1000;
    if (this.timer>0.15){
      if(this.image == this.image1){
        this.image = this.image2;
      }else{
        this.image = this.image1;
      }
      this.timer = 0;
    }
  image(this.image,this.x,this.y);
  pop();
    
    
    if(this.energy+0>=this.full_energy){
      this.image1 = img_plane_another1;
      this.image2 = img_plane_another2;
      this.energy = this.full_energy;
      this.energy_color1 = random(0,255);
      this.energy_color2 = random(0,255);
      this.energy_color3 = random(0,255);
    }
    
    
    if (this.health-this.damage>=0){
      this.draw_health();
    }
    if(this.health-this.damage<0){
      this.lives-=1;
      if(this.lives == 0 && this.color == this.color1){
        this.color = this.color2;
      }else{
        this.color = this.color1;
      }
      this.damage = 0;
      // this.health = this.full_health;
      this.reset();
    }
    
    this.draw_protect();
    this.protect_timer += deltaTime/1000;
    if(this.protect_timer > this.protect_effective_time){
      this.protect_active = false;
    }
  }
  
  draw_protect(){
    if(this.protect_active == false){
      return;
    }
    // draw protect
    push();
        imageMode(CENTER);
        image(protect,this.x,this.y);
        pop();
  }
  
  draw_health(){
    push();
    rectMode(CORNER);
    fill(255,0,0);
    rect(30,650,this.health-this.damage,10);
    pop();
    textSize(25);
    text('Plane War', 10, 30);
    fill(0);
    textSize(25);
    text('score:'+scores, 300, 30);
    push();
    fill(this.color,0,0);
    textSize(25);
    text('lives:'+this.lives, 30, 630);
    pop();
    this.skill();
  }
  
  harm(value){
    if( this.protect_active == true){
      return;
    }
    this.damage += value;
  }
  
  
  
  skill(){
    push();
    fill(0);
    rect(30,680,this.full_energy,10);
    fill(this.energy_color1,this.energy_color2,this.energy_color3);
    rect(30,680,0+this.energy,10);
    fill(255);
    rect(150,680,2,10);
    fill(255);
    rect(300,680,2,10);
    pop();
  }
  
  
  
  
  move(){
    if (mouseX != 0&&mouseY != 0){
      this.x = mouseX;
      this.y = mouseY;
    }
    for(let a = 0;a<enemies.length;a++){
      let enemy = enemies[a];
      let enemy_rc = {x:enemy.x-enemy.get_size().w/2,y:enemy.y-enemy.get_size().h/2,w:enemy.get_size().w,h:enemy.get_size().h};
      
      let plane_rc = {x:this.x-this.get_size().w/2,y:this.y-this.get_size().h/2,w:this.get_size().w,h:this.get_size().h}
      if(is_rect_interect(enemy_rc,plane_rc) == true){
        if(enemy.health>=0){
          enemy.health-=100;
          this.harm(20);
        }
      }
    }
  } 
}