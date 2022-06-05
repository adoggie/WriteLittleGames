var BossStates = {
  idle: {
    enter: function(obj) {
      obj.shape.xv = 0;
      obj.canfall = true;
    },
    update: function(obj, dt) {
      if (obj.health == 0) {
        obj.setState("dying");
        return;
      }
      if (obj.time <= 0.5 && !obj.recover) return;
      obj.attack();
    }
  },
  
  rolling: {
    enter: function(obj) {
      obj.invincible = true;
      obj.playLoop("rolling");
      obj.nx = Math.floor(Math.random()*2)*2 - 1;
      if (lvl.player) {
        let s2 = lvl.player.shape;
        if (s2 && s2.y > obj.shape.y)
          obj.nx = obj.turnTo(lvl.player);
      }
      obj.flip = obj.nx > 0;
      obj.grounded = false;
      obj.canfall = false;
    },
    exit: function(obj) {
      obj.stopLoop();
      obj.invincible = false;
    },
    update: function(obj, dt) {
      obj.shape.xv = obj.nx*300;
      if (obj.time > 5)
        obj.setState("idle");
    }
  },
  
  bouncing: {
    enter: function(obj) {
      effects.play("smash");
    },
    update: function(obj, dt) {
      obj.shape.xv = 0;
      obj.shape.yv = 0;
      if (obj.time >= obj.animtotal)
        obj.setState("falling");
    }
  },
  
  jumping: {
    enter(obj) {
      let a = obj.targ;
      let b = a;
      let pts = obj.points;
      while (a == b)
        b = pts[Math.floor(Math.random()*pts.length)];
      targ = b;

      obj.shape.gravity = 0;
      obj.shape.r = obj.shape.hw;
      effects.play("jump");
      obj.targ = targ;
      let dx = targ[0] - obj.shape.x;
      let adx = Math.abs(dx);
      obj.nx = (adx > 0) ? dx/adx : 1;
      obj.flip = obj.nx > 0;
      obj.grounded = false;
      obj.canfall = false;
    },
    exit(obj) {
      obj.shape.gravity = 1;
    },
    update(obj, dt) {
      let p = obj.targ;
      let s = obj.shape;
      let dx = p[0] - s.x;
      let dy = p[1] - s.y;
      let xx = (dx > 0 && obj.nx < 0) || (dx < 0 && obj.nx > 0);
      let yy = dy > tile*4;
      s.xv = (!xx) ? obj.nx*300 : 0;
      s.yv = -300;
      if (xx && yy)
        obj.setState("dropping");
    }
  },
  
  falling: {
    update(obj, dt) {
      if (obj.grounded)
        obj.setState("idle");
    }
  },
  
  dropping: {
    update: function(obj, dt) {
      let p = obj.targ;
      let s = obj.shape;
      s.x = p[0];
      s.xv = 0;
      s.yv = 600;
      if (s.y > p[1])
        obj.setState("stomping");
    }
  },
  
  stomping: {
    enter: function(obj) {
      obj.invincible = true;
      effects.play("crush");
    },
    exit: function(obj) {
      obj.invincible = false;
    },
    update: function(obj, dt) {
      let p = obj.targ;
      let s = obj.shape;
      s.x = p[0];
      s.y = p[1];
      s.xv = 0;
      s.yv = 0;
      if (obj.time >= 1)
        obj.setState("idle");
    }
  },
  
  throwing: {
    enter: function(obj) {
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
    },
    update: function(obj, dt) {
      if (obj.time >= obj.animtotal) {
        let flip = (obj.flip) ? 1 : -1;
        let vx = flip*bulletSpeed;
        let vy = 0;
        let s1 = obj.shape;
        if (lvl.player) {
          let s2 = lvl.player.shape;
          let dx = s2.x - s1.x;
          let dy = s2.y - s1.y;
          let d = Math.sqrt(dx*dx + dy*dy);
          let nx = dx/d;
          let ny = dy/d;
          vx = nx*bulletSpeed;
          vy = ny*bulletSpeed;
        }
        let b = new Beer(obj.fizz, s1.x + flip*htile, s1.y - htile/4, vx, vy, obj);
        lvl.addObject(b);
        obj.setState("idle");
      }
    }
  },
  
  raising: {
    enter: function(obj) {
      lvl.centerCamera(obj);
      lvl.panCamera(obj, 5);
    },
    update: function(obj, dt) {
      if (obj.time > obj.animtotal)
        obj.setState("chestbeating");
    }
  },
  
  chestbeating: {
    enter: function(obj) {
      obj.playLoop("beating");
    },
    exit: function(obj) {
      obj.stopLoop();
    },
    update: function(obj, dt) {
      let v = 1 - Math.min(obj.time/3, 1);
      obj.adjustLoop(v);
      if (obj.time > 3) {
        obj.setState("idle");
        lvl.panCamera(lvl.player, 1);
      }
    }
  },
  
  dying: {
    enter: function(obj) {
      screen.over = 10;
      screen.victory = true;
      effects.play("fanfare");
    },
    update: function(obj, dt) {
      if (obj.time < 10 && obj.time%0.5 - dt < 0) {
        let s = obj.shape;
        let x = s.x + s.hw*(Math.random()*2 - 1);
        let y = s.y + s.hh*(Math.random()*2 - 1);
        let exp = new Animation(obj.fizz, x, y, "explosion");
        exp.depth = 7;
        lvl.addObject(exp);
        effects.play("explode");
      }
    }
  },
  
  punching: {
    enter: function(obj) {
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
      let flip = (obj.flip) ? 1 : -1;
      obj.shape.xv = flip*speed;
      if (obj.punches == null)
        obj.punches = 0;
      effects.play("swoosh");
    },
    update: function(obj, dt) {
      if (obj.time > obj.animtotal) {
        obj.punches ++;
        if (obj.punches == 3) {
          obj.punches = null;
          obj.setState("idle");
        } else {
          obj.setState("punching");
        }
      }
    }
  },
  
  chargeup: {
    enter: function(obj) {
      obj.invincible = true;
      effects.play("charging");
    },
    exit: function(obj) {
      obj.invincible = false;
      effects.play("charging");
    },
    update: function(obj, dt) {
      if (obj.time > obj.animtotal)
        obj.setState("summon");
    }
  },
  
  summon: {
    enter: function(obj) {
      obj.invincible = true;
      //obj.health = Math.min(obj.health + 1, maxBossHealth);
    },
    exit: function(obj) {
      obj.invincible = false;
    },
    update: function(obj, dt) {
      if (Math.random() < 0.05) {
        let fire = new Fireball(obj.fizz, Math.random()*roomW*tile, 0, 0, 300, obj);
        lvl.addObject(fire);
      }
      if (obj.time > 5)
        obj.setState("idle");
    }
  },
  
  shootlaser: {
    enter: function(obj) {
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
    },
    exit: function(obj) {
      if (obj.laser) {
        obj.laser.stop();
        obj.laser = null;
      }
    },
    update: function(obj, dt) {
      if (obj.time > 1 && !obj.laser) {
        effects.play("laser");
        let nx = (obj.flip) ? 1 : -1;
        let ny = 0;
        let s = obj.shape;
        obj.laser = new Laser(obj.fizz, s.x, s.y - htile + 4, nx, ny, obj);
        lvl.addObject(obj.laser);
      }
      if (obj.time > 2)
        obj.setState("idle");
    }
  },
  
  shootlaser2: {
    enter: function(obj) {
      obj.invincible = true;
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
    },
    exit: function(obj) {
      obj.invincible = false;
      if (obj.lasers) {
        for (let i = 0; i < obj.lasers.length; i++) {
          obj.lasers[i].stop();
        }
        obj.lasers = null;
      }
    },
    update: function(obj, dt) {
      if (obj.time > 1 && !obj.lasers) {
        effects.play("laser");
        obj.lasers = [];
        let s = obj.shape;
        obj.lasers[0] = new Laser(obj.fizz, s.x, s.y, 1, 0, obj);
        obj.lasers[1] = new Laser(obj.fizz, s.x, s.y, -1, 0, obj);
        obj.lasers[2] = new Laser(obj.fizz, s.x, s.y, 0, -1, obj);
        obj.lasers[3] = new Laser(obj.fizz, s.x, s.y, 0, 1, obj);
        for (let i = 0; i < obj.lasers.length; i++)
          lvl.addObject(obj.lasers[i]);
      }
      if (obj.time > 2)
        obj.setState("idle");
    }
  },
  
  crouching: {
    update: function(obj, dt) {
      if (obj.time >= 0.5) {
        if (obj.canjumpdown) {
          obj.grounded = false;
          obj.lastfell = screen.time;
          obj.canjump = false;
          obj.setState("falling");
        } else
          obj.setState("idle");
      }
    }
  },
  
  burping: {
    enter: function(obj) {
      obj.invincible = true;
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
      effects.play("burp");
    },
    exit: function(obj) {
      obj.invincible = false;
    },
    update: function(obj, dt) {
      let anim = gfx["bossburping"];
      let frame11 = anim.fps*10;
      if (obj.time >= frame11 && obj.time - dt < frame11) {
        let s = obj.shape;
        let flip = (obj.flip) ? 1 : -1;
        let rocket = new Rocket(obj.fizz, s.x + flip*64, s.y - 22, flip*bulletSpeed/2, 0, obj);
        lvl.addObject(rocket);
      }
      if (obj.time >= obj.animtotal)
          obj.setState("idle");
    }
  },
  
  farting: {
    enter: function(obj) {
      if (lvl.player)
        obj.flip = obj.turnTo(lvl.player) > 0;
      effects.play("fart");
    },
    update: function(obj, dt) {
      let anim = gfx["bossfarting"];
      let frame4 = anim.fps*3;
      if (obj.time >= frame4 && obj.time - dt < frame4) {
        let s = obj.shape;
        let flip = (obj.flip) ? 1 : -1;
        let fart = new Animation(obj.fizz, s.x + flip*150, s.y - 30, "fartcloud");
        fart.flip = !obj.flip;
        fart.depth = 7;
        lvl.addObject(fart);
        if (lvl.player) {
          let left = s.x + flip*250;
          let right = s.x;
          if (left > right) {
            let tmp = right;
            right = left;
            left = tmp;
          }
          let s2 = lvl.player.shape;
          if (s2.x > left && s2.x < right && s2.y > s.y - 50 && s2.y < s.y + 50)
            lvl.player.damage(1);
        }
      }
      if (obj.time >= obj.animtotal) {
        obj.setState("idle");
      }
    }
  }
};

PlayerStates = {
  idle: {
    enter: function(obj) {
      obj.shape.xv = 0;
    },
    update: function(obj, dt) {
      if (obj.dir.y > 0)
        obj.setState("crouching");
      if (obj.dir.x != 0 && !obj.cooldown)
        obj.setState("running");
      if (!obj.grounded)
        obj.setState("falling");
      if (obj.dir.jump && obj.canjump)
        obj.setState("jumping");
    }
  },
  
  running: {
    enter: function(obj) {
      obj.playLoop("steps");
    },
    exit: function(obj) {
      obj.stopLoop();
    },
    update: function(obj, dt) {
      if (obj.dir.x != 0 && !obj.cooldown)
        obj.shape.xv = obj.dir.x*speed;
      else
        obj.setState("idle");
      if (obj.dir.y > 0)
        obj.setState("crouching");
      if (!obj.grounded)
        obj.setState("falling");
      if (obj.dir.jump && obj.canjump)
        obj.setState("jumping");
    }
  },
  
  jumping: {
    enter: function(obj) {
      obj.canjump = false;
      obj.jump(jumpVelocity);
    },
    update: function(obj, dt) {
      obj.shape.xv = obj.dir.x*speed;
    }
  },
  
  falling: {
    update: function(obj, dt) {
      obj.shape.xv = obj.dir.x*speed;
      if (obj.dir.jump && obj.canjump)
        if (screen.time - obj.lastgrounded <= jumpPlatform)
          obj.setState("jumping");
    }
  },
  
  landing: {
    enter: function(obj) {
      obj.shape.xv = 0;
      effects.play("land");
      obj.cooldown = null;
      obj.canshoot = false;
    },
    exit: function(obj) {
      obj.canshoot = true;
    },
    update: function(obj, dt) {
      if (obj.time > obj.animtotal)
        obj.setState("idle");
      if (!obj.grounded)
        obj.setState("falling");
    }
  },
  
  crouching: {
    enter: function(obj) {
      obj.shape.xv = 0;
    },
    update: function(obj, dt) {
      if (obj.dir.y == 0)
        obj.setState("idle");
      else if (obj.dir.jump) {
        if (obj.canjumpdown) {
          obj.grounded = false;
          obj.lastfell = screen.time;
          obj.canjump = false;
          obj.setState("falling");
        }
      }
      if (!obj.grounded)
        obj.setState("falling");
    }
  },
  
  dying: {
    enter: function(obj) {
      effects.play("die");
      let s = obj.shape;
      s.gravity = 0;
      s.xv = 0;
      s.yv = 0;
      obj.canshoot = false;
      obj.cooldown = null;
    },
    update: function(obj, dt) {
      let s = obj.shape;
      s.xv = 0;
      s.yv = 0;
      if (obj.time > 1) {
        lvl.removeObject(obj);
        if (screen.over == null)
          screen.over = 3;
      }
    }
  }
};