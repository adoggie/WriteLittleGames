class Bigone{
  constructor(x,y,image1,image2,image3,image4,image5,speed){
    this.x = x;
    this.y = y;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.image4 = image4;
    this.image5 = image5;
    this.image = image1;
    this.dead_image = image4;
    this.timer = 0;
    this.dead_timer = 0;
    this.speed = speed;
    this.speed2 = 2;
    this.damage = 0;
    this.alive = true;
    this.score = 300;
    
    this.full_health = GameControll.diff_current.big_health;
    this.health = this.full_health;
    this.type ="big";
  }
  get_size(){
    return {w:169,h:258};
  }
  
  display(){
    if( this.health<=0){
      this.dead();
      return;
    }
    push();
    imageMode(CENTER);
    this.timer += deltaTime/1000;
    if (this.timer>.15){
      if(this.image == this.image1){
        this.image = this.image2;
      }else{
        this.image = this.image1;
      }
      this.timer = 0;
    }
  image(this.image,this.x,this.y);
  pop();
    this.draw_health();
    push()
    stroke(0)
    // strokeWeight(10)
    // rectMode(CENTER)
    // noFill();
    // rect(this.x,this.y,this.get_size().w,this.get_size().h)
    pop()
    
  }
  
  draw_health(){
    push();
    rectMode(CORNER);
    let bar_width=80;
    let bar_height = 20;
    fill(255,0,0)
    rect(this.x-40,this.y-80,bar_width/this.full_health*this.health,10);
    pop();
  }
  
  hit(bullet){
    if(this.health<=0){
      return;
    }
    if (bullet.x>=this.x-this.get_size().w/2
          &&bullet.x<=this.x+this.get_size().w/2
          &&bullet.y>=this.y-this.get_size().h/2
          &&bullet.y<=this.y+this.get_size().h/2){
      this.health -= bullet.damage;
      push();
      imageMode(CENTER);
      image(this.image3,this.x,this.y);
      pop();
      if(this.health<=0){
        //this.dead();
        dead_music.play();
      }
      return true;
    }
    return false;
  }
  
  // hit(bullet){
  //   if(this.health<=0){
  //     return 0; //dead
  //   }
  //   else{
  //     return 1; //alive
  //   }
  // }
  dead(){
    if(this.alive == true){
      this.alive = false;
      scores += this.score;
    }
    push();
    imageMode(CENTER);
    this.dead_timer += deltaTime/1000;
    if (this.dead_timer>0.001){
      if(this.dead_image == this.image4){
        this.dead_image = this.image5;
      }else{
        this.dead_image = this.image4;
      }
      this.dead_timer = 0;
    }
    image(this.dead_image,this.x,this.y);
    this.speed2 = 5;
    this.speed = random(-5,5);
    pop();
  }
  
  move(){
    this.y+=this.speed2;
    // if (this.y >= 150){
    //   this.speed2 = 0;
    // }
    this.x+=this.speed;
    if(this.x >=width-169/2){
      this.speed*=-1;
    }
    if(this.x <= 169/2){
      this.speed*=-1;
    }
  }
}