


class PlaneSpitfire{
  constructor(cfgs){
    this.cfgs = cfgs;
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

  static initCls(){
    
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