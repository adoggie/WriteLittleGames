//直线飞行路径
class StraightPath {
  constructor() {
    this.speed = 2;
    this.timer = 0;
    this.x = int(random(SCREEN_WIDTH));
    this.y = int(random(-20, 0));
  }

  next() {
    this.timer += deltaTime / 1000;
    if (this.timer > 0.01) {
      this.y += this.speed;
      this.timer = 0;
    }
    return {
      x: this.x,
      y: this.y
    };
  }

}


let boom_timer = 0;
class Enemy {
  constructor(img, path) {
    this.img = img;
    this.x = 0;
    this.y = 0;
    this.harm_imgs = {
      h100: img,
      h80: img_down1,
      h40: img_down2,
      h20: img_down3,
      h0: img_down4
    };
    this.speed = 3;
    this.path = path;
    this.health = 100;
    this.dead_timer = 0;

    this.timer_shot = new TimerDelay(0.5, this.shot, this);
    this.bullets = [];
  }

  get_size() {
    return {
      w: 57,
      h: 43
    };
  }

  draw() {

    if (this.health <= 0) {
      boom_timer += deltaTime / 1000;
      if (boom_timer > 0.3) {
        sndboom.play();
        boom_timer = 0;
      }

      this.dead_timer += deltaTime / 1000;

    }


    if (this.health <= 0) {

    }

    let xy = this.path.next();
    this.x = xy.x;
    this.y = xy.y;
    push();
    imageMode(CENTER);
    if (this.health <= 0) {
      this.img = this.harm_imgs.h0;
    } else if (this.health <= 20) {
      this.img = this.harm_imgs.h20;
    } else if (this.health <= 40) {
      this.img = this.harm_imgs.h40;
    } else if (this.health <= 80) {
      this.img = this.harm_imgs.h80;
    } else {
      this.img = this.harm_imgs.h100;
    }
    image(this.img, this.x, this.y);
    
     
  // filter(GRAY);
    pop();

    this.timer_shot.run();
    this.draw_bullets();
  }

  is_visible() {
    if (this.dead_timer > 0.3) {
      return false;
    }
    if (this.y > SCREEN_HEIGHT + this.get_size().h / 2) {
      return false;
    }
    return true;
    if (this.x > SCREEN_WIDTH + this.get_size().w / 2) {}
  }

  destroy() {

  }

  hit(bullet) {

    if (bullet.x >= this.x - this.get_size().w / 2 &&
      bullet.x <= this.x + this.get_size().w / 2 &&
      bullet.y >= this.y - this.get_size().h / 2 &&
      bullet.y <= this.y + this.get_size().h / 2) {

      if (this.health > 0 && this.health - 20 <= 0) {
        dead_enemy_num += 1;
      }
      this.health -= 20;

    }
  }

  // 发射子弹
  shot(enemy) {
    // 敌机的x在我方飞机的x机身范围内
    let n = int(random(10));
    if( n%4 != 0){
      return ;
    }
    
    // print(this.x,this.y);
    if( enemy.x > (plane.x - plane.get_size().w) && enemy.x < (plane.x + plane.get_size().w)){
      
    }else{
      return ;
    }
    
    let x = enemy.x;
    let y = enemy.y + enemy.get_size().h / 2;

    let bullet = new EnemyBullet(x, y);
    enemy.bullets.push(bullet);
  }

  draw_bullets() {
    // 子弹超过距离失效
    let remove = []
    for(let n=0;n<this.bullets.length;n++){
      let bullet = this.bullets[n];
      bullet.fly();
      bullet.draw();
      if(bullet.y - this.y - this.get_size().h/2 > bullet.target_distance){
        remove.push(bullet);
      }
    }
    
    for (let n=0;n<remove.length;n++){
      let idx = this.bullets.indexOf(remove[n]);
      this.bullets.splice(idx,1);
    }
    
  }
}


class EnemyBullet {
  constructor(x, y) {
    // this.img = img;
    this.x = x;
    this.y = y;
    this.target_distance = 100;
  }

  fly() {
    this.y += 6;
  }

  draw() {
    push();
    // imageMode(CENTER);
    // image(this.img,this.x,this.y);
    stroke('black');
    circle(this.x, this.y, 5);
    pop();
  }

  is_visible() {
    if (this.x < 0 || this.y < 0) {
      return false;
    }
    return true;
  }


}