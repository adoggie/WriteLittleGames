let enemy_sn = 1;
class Enemy{
  constructor(x,y,img1,img2){
    this.x = x;
    this.y = y
    this.img1 =  img1;
    this.img2 =  img2;
    this.timer = 0;
    this.health = GameControll.diff_current.small_health;
    this.type = "small";
    this.alive = true;
    this.id = enemy_sn++;
    this.fly_style = int(random(0,2));
    this.fly_shift_timer = 0;
    this.fly_shift_dx = 1;
    this.score = 100;
  }
  get_size(){
    return {w:57,h:48};
  }
  display(){
    push()
    imageMode(CENTER);
    image(this.img1,this.x,this.y);
    pop();
    
    if(this.health<=0 && this.alive == true){
        // print('will dead..');
        this.alive = false;
        this.dead();
        scores += this.score;
        // print(this.id);
        destroy_enemy(this);
    }
  }
  move(){
    this.y+=4;
    this.fly_shift_timer += deltaTime/1000;
    if(this.fly_style == 1){
      this.x += this.fly_shift_dx;
      if(this.fly_shift_timer > 2){
        this.fly_shift_dx *=-1;
        this.fly_shift_timer = 0;
      }
    }
  }
  
  hit(bullet){
    let rc = {x:this.x-this.get_size().w/2,y:this.y-this.get_size().h/2,w:this.get_size().w,h:this.get_size().h};
    let pt = {x:bullet.x,y:bullet.y};
    
    if(is_point_in_rect(rc,pt)){
      this.health -= bullet.damage;
      plane.energy+=10;
      // print('hit health',this.health);
      // this.dead();
      return true;
    }
    return false;
  }
  
  dead(){
    dead_music.play();
    push()
    imageMode(CENTER);
    image(this.img2,this.x,this.y);
    pop();
  }
}