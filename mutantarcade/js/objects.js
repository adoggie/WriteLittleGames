class Object {
  constructor(fizz, shape) {
    this.fizz = fizz;
    this.shape = shape;
  }
  
  destroy() {
    if (this.shape) {
      this.fizz.removeShape(this.shape);
      this.shape = null;
    }
    this.fizz = null;
    this.stopLoop();
  }
  
  wrapAround() {
    // wrap around
    let min = -htile;
    let max = (roomW - 1)*tile - htile;
    let s = this.shape;
    if (s.x < min && s.xv < 0)
      s.x = max;
    if (s.x > max && s.xv > 0)
      s.x = min;
  }
  
  stopLoop() {
    if (this.source != null) {
      this.source.stop();
      this.source = null;
    }
    this.loop = null;
    this.gain = null;
  }
  
  playLoop(n) {
    if (this.loop == n) return;
    this.stopLoop();
    this.loop = n;
    if (n != null) {
      let s = sources.loop(n);
      this.source = s;
      if (s) {
        let context = sources.ctx;
        if (context) {
          let gain = context.createGain();
          gain.connect(context.destination);
          this.gain = gain;
          s.disconnect(context.destination);
          s.connect(gain);
          this.adjustLoop(1);
        }
      }
    }
  }
  
  adjustLoop(v) {
    if (ops.mute)
      v = 0;
    if (this.gain)
      this.gain.gain.value = v;
  }
  
  drawRect(ctx, color) {
    let s = this.shape;
    ctx.fillStyle = color;
    ctx.fillRect(s.x - s.hw, s.y - s.hh, s.hw*2, s.hh*2);
  }
  
  drawCircle(ctx, color) {
    let s = this.shape;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  }
  
  drawImage(ctx, n, a) {
    let s = this.shape;
    if (!s)
      s = this.pos;
    let img = images[n];
    ctx.save();
    ctx.translate(s.x, s.y);
    if (this.flip)
      ctx.scale(-1, 1);
    if (a != null)
      ctx.rotate(a);
    ctx.drawImage(img, -img.width/2, -img.height/2);
    ctx.restore();
  }
  
  drawImageSection(ctx, n, index) {
    let img = images[n];
    if (!img) alert(n);
    let graphic = gfx[n];
    let sx = index%graphic.cols;
    let sy = (index - sx)/graphic.cols;
    let tw = img.width/graphic.cols;
    let th = img.height/graphic.rows;
    let s = this.shape;
    if (!s)
      s = this.pos;
    ctx.save();
    ctx.translate(s.x, s.y);
    if (this.flip)
      ctx.scale(-1, 1);
    ctx.drawImage(img, sx*tw, sy*th, tw, th, -tw/2, -th/2, tw, th);
    ctx.restore();
  }
  
  drawAnimation(ctx, n, time) {
    let a = gfx[n];
    if (!a) alert(n);
    let frame = Math.floor(time/a.fps);
    if (a.loop)
      frame = frame%a.frames;
    else
      frame = Math.min(frame, a.frames - 1);
    this.drawImageSection(ctx, n, frame);
  }
  
  collide(other) {}

  update(dt) {}
}


class Boundry extends Object {
  
}


class Wall extends Boundry {
  constructor(fizz, x, y, bits) {
    let shape = fizz.addRect("static", x, y, htile - 1, htile - 1);
    super(fizz, shape);
/*
    if (bits%2 < 1) // up
      fizz.addLine(x + htile, y - htile, x - htile, y - htile);
    if (bits%8 < 4) // down
      fizz.addLine(x - htile, y + htile, x + htile, y + htile);
    if (bits%4 < 2) // right
      fizz.addLine(x + htile, y + htile, x + htile, y - htile);
    if (bits%16 < 8) // left
      fizz.addLine(x - htile, y - htile, x - htile, y + htile);
*/

    if (bits%2 >= 1) // top
      shape.bottom = true;
    if (bits%8 >= 4) // bottom
      shape.top = true;

    this.depth = 1;
    this.bits = bits;
    this.pos = {x:x,y:y};
  }

  draw(ctx) {
    this.drawImageSection(ctx, "walls", this.bits);
  }
}


class Platform extends Boundry {
  constructor(fizz, x, y, index) {
    let shape = fizz.addLine(x + htile, y - htile + 1, x - htile, y - htile + 1);
    super(fizz, shape, index);
    this.index = index;
  }
  
  draw(ctx) {
    ctx.translate(-htile, htile);
    this.drawImageSection(ctx, "platforms", this.index);
    ctx.translate(htile, -htile);
  }
}


class Collectable extends Object {
  constructor(fizz, x, y) {
    let shape = fizz.addCircle("static", x, y, 1);
    super(fizz, shape);
    this.pos = {x:x,y:y};
  }
}


class Sensor extends Object {
  touch(other) { return true; }
}


class Agent extends Sensor {
  constructor(fizz, x, y, w, h) {
    let shape = fizz.addRect("dynamic", x, y, w, h);
    //let shape = fizz.addCircle("dynamic", x, y, htile*1.5);
    super(fizz, shape);
    this.spawn = [x,y];
    this.depth = 4;
    this.respawn();
  }
  
  die() {}
  
  touch(other, sep) {
    let s = this.shape;
    if (sep.y < 0 && s.yv > 0) {
      if (!this.grounded) {
        if (other instanceof Platform) {
          if (this.lastfell && (screen.time - this.lastfell) < jumpPlatform*2)
            return false;
          this.canjumpdown = true;
        } else {
          this.canjumpdown = false;
        }
        this.grounded = true;
        this.lastgrounded = screen.time;
      }
    } else if (sep.y > 0 && s.yv < 0) {
      this.hitRoof();
    }
    return true;
  }
  
  setState(next) {
    let states = this.states;
    if (!states) return;
    if (!states[next]) alert(next);
    let prev = this.state;
    if (prev && states[prev].exit)
      states[prev].exit(this);
    this.state = next;
    this.time = 0;
    if (next && states[next].enter)
      states[next].enter(this);
  }
  
  update(dt) {
    // mute
    this.adjustLoop(1);
    // physics
    if (this.wasgrounded && !this.grounded) {
      this.lastfell = screen.time;
      this.fallDown();
    }
    else if (this.grounded && !this.wasgrounded)
      this.hitGround();
    
    // health
    let rec = this.recover;
    if (rec != null) {
      rec -= dt;
      if (rec < 0) rec = null;
      this.recover = rec;
    }
    
    // fsm
    let s = this.state;
    let states = this.states;
    if (s && states && states[s].update)
      states[s].update(this, dt);
  }
  
  postUpdate() {
    this.wrapAround();
    this.wasgrounded = this.grounded;
    this.grounded = null;
    this.canjumpdown = false;
  }
  
  jump(vy) {
    this.shape.yv -= vy;
    this.grounded = false;
  }
  
  hitGround() {}
  hitRoof() {}
  fallDown() {}
  
  respawn() {
    let s = this.shape;
    s.x = this.spawn[0];
    s.y = this.spawn[1];   
    s.xv = 0;
    s.yv = 0;
    this.jumping = false;
    this.canjumpdown = false;
    this.canjump = false;
    this.grounded = null;
    this.wasgrounded = null;
    this.lastgrounded = 0;
    this.lastfell = null;
  }
}


class Player extends Agent {
  constructor(fizz, x, y) {
    super(fizz, x, y, htile*0.5, htile*1.25);
    this.shape.damping = 0.5;
    this.time = 0;
    //this.lastjump = -jumpKey;
    this.flip = false;
    this.canshoot = true;
    this.state = "idle";
    lvl.player = this;
    this.states = PlayerStates;
    this.dir = {x:0, y:0, jump:false, shoot:false};
    this.health = maxPlayerHealth;
  }
  
  destroy() {
    Agent.prototype.destroy.call(this);
    lvl.player = null;
  }

  die() {
    if (this.state != "dying")
      this.setState("dying");
  }
  
  damage(n, other) {
    if (this.health == 0) return;
    if (this.recover && !(other instanceof Ooze))
      return;
    effects.play("hit");
    this.health = Math.max(this.health - 1, 0);
    if (this.health == 0) {
      this.die();
    } else {
      this.recover = 1;
      if (other instanceof Ooze) {
        this.state = "idle";
        this.respawn();
      }
    }
  }
  
  fallDown() {
    if (this.state != "falling" && this.state != "dying")
      this.setState("falling");
  }
  
  hitGround() {
    if (this.state != "landing" && this.state != "dying")
      this.setState("landing");
  }
  
  throwBanana() {
    let s = this.shape;
    let flip = (this.flip) ? -1 : 1;
    let b = new Banana(this.fizz, s.x + flip*htile, s.y - htile/4, flip*bulletSpeed, 0, this);
    lvl.addObject(b);
    effects.play("swing");
  }
  
  update(dt) {
    this.time += dt;
    Agent.prototype.update.call(this, dt);
    if (!this.shape) return;

    // shooting
    if (this.cooldown != null) {
      this.cooldown += dt;
      if (this.cooldown >= gfx["apemanidlethrow"].total)
        this.cooldown = null;
    }
    // movement
    let dir = this.dir;
    if (dir.x != 0)
      this.hasmoved = true;
    if (dir.jump)
      this.hasjumped = true;
    if (dir.shoot)
      this.hasshot = true;
    dir.x = 0;
    dir.y = 0;
    dir.shoot = false;
    dir.jump = false;
    if (screen instanceof Playing && screen.time >= 4) {
      if (!screen.victory && this.state != "dying") {
        let throwing = this.grounded && this.cooldown != null;
        let dying = this.state == "dying";
        if (!throwing && !dying) {
          if (input.keys[37] || input.keys[65])
            dir.x = -1;
          else if (input.keys[39] || input.keys[68])
            dir.x = 1;
          if (input.keys[40] || input.keys[83])
            dir.y = 1;
          if (input.keys[32] || input.keys[90] || input.keys[87])
            dir.jump = true;
          if (dir.x != 0)
            this.flip = dir.x < 0;
          if (this.grounded && !dir.jump)
            this.canjump = true;
          if (this.canshoot && this.cooldown == null) {
            if (input.keys[17] || input.keys[88] || input.keys[13] || input.mouse[0]) {
              dir.shoot = true;
              this.cooldown = 0;
              if (this.grounded)
                if (this.state != "idle" && this.state != "dying")
                  this.setState("idle");
              this.throwBanana();
            }
          }
        }
      }
    }
    
    this.postUpdate();
  }
  
  draw(ctx) {
    let e = this.state;
    let t = this.time;
    ctx.save();
    if (this.recover && t%0.2 < 0.1)
      ctx.filter = "brightness(1000%)";
    ctx.translate(0, -htile/2);
    let n = "apeman"+e;
    if (this.cooldown != null) {
      n += "throw";
      t = this.cooldown;
    }
    this.drawAnimation(ctx, n, t);
    this.animtotal = gfx[n].total;
    ctx.restore();
  }
}

class Enemy extends Agent {
  constructor(fizz, x, y, w, h) {
    super(fizz, x, y, w, h);
  }
  
}

class Boss extends Enemy {
  constructor(fizz, x, y) {
    super(fizz, x, y, tile, tile);
    this.time = 0;
    this.flip = false;
    this.health = maxBossHealth;
    this.states = BossStates;
    this.canfall = true;
    lvl.boss = this;
    this.setState("raising");
  }
  
  destroy() {
    Enemy.prototype.destroy.call(this);
    lvl.boss = null;
  }
  
  damage(n, other) {
    if (this.invincible || this.recover || this.health == 0)
      return;
    if (other instanceof Ooze)
      return;
    this.health = Math.max(this.health - n, 0);
    this.recover = 0.2;
    effects.play("damage");
    if (this.health <= 0 && this.state != "dying")
      this.setState("falling");
  }

  hitGround() {
    if (this.state == "falling")
      this.setState("idle");
  }
  
  fallDown() {
    if (this.state != "falling" && this.canfall)
      this.setState("falling");
  }
  
  touch(other, sep) {
    if (Agent.prototype.touch.call(this, other, sep) == false)
      return false;
    if (other instanceof Agent)
      other.damage(2, this);
    let e = this.state;
    if (e == "rolling") {
      if (other instanceof Wall) {
        if (this.time >= 1)
          if ((sep.x > 0 && this.nx < 0) || (sep.x < 0 && this.nx > 0))
            this.setState("bouncing");
        return true;
      }
    }
    if (e == "jumping" || e == "dropping")
      return false;
    if (!(other instanceof Boundry))
      return false;
  }
  
  turnTo(other) {
    let s1 = this.shape;
    let s2 = other.shape;
    let nx = 0;
    if (s2.x < s1.x)
      nx = -1;
    else
      nx = 1;
    return nx;
  }
  
  update(dt) {
    this.time += dt;
    Agent.prototype.update.call(this, dt);
    // vertical wrap around
    let s = this.shape;
    if (s.y > (roomH + 3)*tile) { 
      let p = this.points[0];
      s.x = p[0];
      s.y = p[1] - tile*10;
      this.setState("falling");
    }
    this.postUpdate();
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(0, -htile);
    if (this.recover)
      ctx.filter = "brightness(1000%)";
    let n = "boss"+this.state;
    this.drawAnimation(ctx, n, this.time);
    this.animtotal = gfx[n].total;
    ctx.filter = null;
    ctx.restore();
  }
}


class Boss1 extends Boss {
  constructor(fizz, x, y) {
    y -= htile;
    super(fizz, x, y);
    this.points = [
      [x,y],
      [x - 10*tile,y + 6*tile],
      [x + 10*tile,y + 6*tile]
    ];
    this.targ = this.points[0];
  }
  
  attack() {
    let n = (Math.random() < 0.8) ? "punching" : "jumping";
    if (lvl.player) {
      let s1 = this.shape;
      let s2 = lvl.player.shape;
      if (this.health <= 8 && Math.random() < 0.8) {
        if (s2.y >= s1.y - 50 && s2.y <= s1.y + 100) {
          n = "shootlaser";
          if (this.health <= 3)
            n = "shootlaser2";
        }
      }
      if (this.canjumpdown) {
        if (s2.y >= s1.y - 50 && s2.x >= s1.x - 200 && s2.x <= s1.x + 200) {
          n = "crouching";
        }
      }
    }
    this.setState(n);
  }
}

class Boss2 extends Boss {
  constructor(fizz, x, y) {
    y -= htile;
    super(fizz, x, y);
    this.points = [
      [x,y],
      [x - 11*tile,y + 1*tile],
      [x + 11*tile,y + 1*tile],
      [x + 6*tile,y + 4*tile],
      [x + 6*tile,y + 4*tile]
    ];
    this.targ = this.points[0];
  }
  
  attack() {
    let n = (Math.random() < 0.6) ? "throwing" : "jumping";
    if (this.health <= 8 && Math.random() < 0.4)
      n = "chargeup";
    this.setState(n);
  }
}

class Boss3 extends Boss {
  constructor(fizz, x, y) {
    y -= htile;
    super(fizz, x, y);
    this.points = [
      [x,y],
      [x - 6*tile,y - 4*tile],
      [x + 6*tile,y - 4*tile]
    ];
    this.targ = this.points[0];
  }
  
  attack() {
    let n = "jumping";
    if (lvl.player && lvl.player.shape.y >= this.shape.y)
      if (Math.random() <= 0.6)
        n = "rolling";
    if (Math.random() < 0.2)
      n = "farting";
    this.setState(n);
  }
}


class Boss4 extends Boss {
  constructor(fizz, x, y) {
    y -= htile;
    super(fizz, x, y);
    this.points = [
      [x,y],
      [x + 8*tile,y]
    ];
    this.targ = this.points[0];
  }

  attack() {
    let n = (Math.random() < 0.9) ? "jumping" : "punching";
    if (Math.random() < 0.3)
      n = "burping";
    if (lvl.player) {
      let s1 = this.shape;
      let s2 = lvl.player.shape;
      if (Math.abs(s2.x - s1.x) < 300 && Math.abs(s2.y - s1.y) < 150)
        if (Math.random() < 0.7)
          n = "punching";
      if (this.canjumpdown)
        if (s2.y >= s1.y + 50)
          n = "crouching";
    }
    this.setState(n);
  }
}

class Boss5 extends Boss {
  constructor(fizz, x, y) {
    y -= htile;
    super(fizz, x, y);
    let xo = 7*tile;
    let yo = 3*tile;
    this.points = [
      [x,y],
      [x - xo,y + yo],
      [x + xo,y + yo]
    ];
    this.targ = this.points[0];
  }
  
  attack() {
    let n = (Math.random() < 0.6) ? "rolling" : "jumping";
    this.setState(n);
  }
}

class Projectile extends Sensor {
  constructor(fizz, x, y, vx, vy, owner) {
    let shape = fizz.addCircle("dynamic", x, y, htile/4);
    shape.gravity = 0;
    shape.xv = vx;
    shape.yv = vy;
    super(fizz, shape);
    this.time = 0;
    this.flip = vx < 0;
    this.owner = owner;
    this.ignoreWalls = false;
    this.lifetime = 5;
    this.depth = 7;
  }
  
  damage(pts, other) {
    
  }
  
  touch(other) {
    if (other == this.owner)
      return false;
    if (this.ignoreWalls && other instanceof Boundry)
      return false;
    if (other instanceof Agent || other instanceof Projectile)
      other.damage(1, this);

    let s = this.shape;
    let exp = new Animation(this.fizz, s.x, s.y, "pop");
    exp.depth = 7;
    lvl.addObject(exp);
    
    lvl.removeObject(this);
    return false;
  }
  
  update(dt) {
    this.time += dt;
    let s = this.shape;
    if (this.time >= this.lifetime)
      lvl.removeObject(this);
    else if (s.x < -100 || s.x > roomW*tile + 100 || s.y < -100 || s.y > roomH*tile + 100)
      lvl.removeObject(this);
  }
}


class Banana extends Projectile {
  constructor(fizz, x, y, vx, vy, owner) {
    super(fizz, x, y, vx, vy, owner);
  }
  
  damage(pts, other) {
  }
  
  draw(ctx) {
    this.drawImage(ctx, "banana");
  }
}


class Beer extends Projectile {
  constructor(fizz, x, y, vx, vy, owner) {
    super(fizz, x, y, vx, vy, owner);
    this.ignoreWalls = true;
  }
  
  draw(ctx) {
    this.drawAnimation(ctx, "beer", this.time);
  }
}


class Rocket extends Projectile {
  constructor(fizz, x, y, vx, vy, owner) {
    super(fizz, x, y, vx, vy, owner);
    this.ignoreWalls = true;
    this.flip = false;
    this.head = Math.atan2(vy, vx);
    this.speed = Math.sqrt(vx*vx + vy*vy);
    this.lifetime = 30;
  }
  
  damage(pts, other) {
    lvl.removeObject(this);
  }
  
  update(dt) {
    Projectile.prototype.update.call(this, dt);
    let s1 = this.shape;
    if (s1 && lvl.player) {
      let s2 = lvl.player.shape;
      let head1 = this.head;
      
      let x = Math.cos(head1);
      let y = Math.sin(head1);
      let x2 = s2.x - s1.x;
      let y2 = s2.y - s1.y;
      let head2 = Math.atan2(y2, x2);

      let arc = (x*x + y*y)*(x2*x2 + y2*y2);
      arc = Math.sqrt(arc)
      if (arc > 0) {
        arc = Math.acos((x*x2 + y*y2)/arc)
        if (x*y2 - y*x2 < 0)
          arc = -arc;
      }
      
      let step = 1.25*dt;
      if (Math.abs(arc) <= Math.PI/2) {
        if (arc < -step)
          head1 -= step;
        else if (arc > step)
          head1 += step;
        else
          head1 = head2;
      }
      s1.xv = Math.cos(head1)*this.speed;
      s1.yv = Math.sin(head1)*this.speed;
      this.head = head1;
    }
  }
  
  draw(ctx) {
    this.drawImage(ctx, "rocket", this.head);
  }
}


class Fireball extends Projectile {
  constructor(fizz, x, y, vx, vy, owner) {
    super(fizz, x, y, vx, vy, owner);
    this.ignoreWalls = true;
    this.lifetime = 10;
  }
  
  draw(ctx) {
    this.drawAnimation(ctx, "fireball", this.time);
  }
}


class Laser extends Sensor {
  constructor(fizz, x, y, nx, ny, owner) {
    let rw = roomW*tile/2;
    let rh = roomH*tile/2;
    let cx = x + nx*rw;
    let cy = y + ny*rh;
    let hw = (nx != 0) ? rw : 8;
    let hh = (ny != 0) ? rh : 8;
    let shape = fizz.addRect("static", cx, cy, hw, hh);
    super(fizz, shape);
    this.center = { x:cx, y:cy };
    this.extents = { hw:hw, hh:hh };
    this.vertical = (nx == 0 && ny != 0);
    this.time = 0;
    this.owner = owner;
    this.depth = 3;
  }
  
  touch(other, sep) {
    if (other == this.owner)
      return false;
    if (other instanceof Agent)
      other.damage(5);
    return false;
  }
  
  update(dt) {
    this.time += dt;
    if (this.time - this.tstop > 1/30*6)
      lvl.removeObject(this);
  }
  
  stop() {
    this.tstop = this.time;
  }
  
  draw(ctx) {
    let c = this.center;
    let e = this.extents;
    let t = this.time;
    if (this.tstop != null)
      t = (1/30*6) - (t - this.tstop);
    let i = Math.floor(t/(1/30));
    i = Math.min(i, 5);
    if (!this.vertical) {
      let img = images["laserh"];
      let tw = img.width/6;
      let th = img.height;
      ctx.drawImage(img, i*tw, 0, tw, th, c.x - e.hw, c.y - e.hh - th/2, e.hw*2, th);
    } else {
      let img = images["laserv"];
      let tw = img.width/6;
      let th = img.height;
      ctx.drawImage(img, i*tw, 0, tw, th, c.x - e.hw - tw/2, c.y - e.hh, tw, e.hh*2);
    }
  }
}


class Tile extends Object {
  constructor(fizz, x, y, img, index) {
    if (!index) index = 0;
    super(fizz);
    this.pos = {x:x,y:y};
    this.img = img;
    this.index = index;
  }
  
  touch(other) {
    return false;
  }
  
  draw(ctx) {
    this.drawImageSection(ctx, this.img, this.index);
  }
}


class Animation extends Object {
  constructor(fizz, x, y, n) {
    super(fizz);
    this.pos = {x:x,y:y};
    this.time = 0;
    this.n = n;
  }
  
  update(dt) {
    this.time += dt;
    let a = gfx[this.n];
    if (!a.loop && this.time > a.frames*a.fps)
      lvl.removeObject(this);
  }
  
  draw(ctx) {
    this.drawAnimation(ctx, this.n, this.time);
  }
}


class Ooze extends Sensor {
  constructor(fizz, x, y, bits) {
    let shape;
    if (bits%2 == 0)
      shape = fizz.addRect("static", x, y, 1, 1);
    else
      shape = fizz.addRect("static", x, y, htile, htile);
    super(fizz, shape);
    this.pos = {x:x,y:y};
    this.bits = bits;
  }
  
  touch(other) {
    if (other instanceof Agent)
      other.damage(1, this);
    return false;
  }
  
  draw(ctx) {
    let cx = 0;
    if (this.bits%2 == 0)
      cx = 1;
    this.drawImageSection(ctx, "ooze", cx);
  }
}



class Barrel extends Sensor {
  constructor(fizz, x, y) {
    y -= 9;
    let shape = fizz.addRect("static", x, y, htile, tile*0.75);
    shape.friction = 1;
    super(fizz, shape);
  }
  
  touch(other) {
    if (other instanceof Projectile) {
      let s = this.shape;
      let exp = new Animation(this.fizz, s.x, s.y, "explosion");
      exp.depth = 7;
      lvl.addObject(exp);
      effects.play("explode");
      if (lvl.player) {
        let s1 = this.shape;
        let s2 = lvl.player.shape;
        let dx = s2.x - s1.x;
        let dy = s2.y - s1.y;
        if (Math.sqrt(dx*dx + dy*dy) < 80)
          lvl.player.damage(1);
      }
      lvl.removeObject(this);
    }
    if (other instanceof Agent)
      return false;
    return true;
  }
  
  draw(ctx) {
    this.drawImage(ctx, "barrel");
  }
}

