class Screen {
  constructor() {}

  toggleAudio() {
    ops.mute = !ops.mute;
    let img = document.getElementById("muteicon");
    img.src = (ops.mute) ? "gfx/speaker0.png" : "gfx/speaker1.png";
  }
  
  drawLogo(ctx, x, y, n1, n2) {
    let img1 = images[n1];
    let img2 = images[n2];
    let offset = (this.time*100)%(img1.height - 32);
    ctx.save();
    ctx.translate(x - img1.width/2, y - img1.height/2);
    ctx.drawImage(img1, 0, 0);
    ctx.fillStyle = "#fff";
    ctx.globalCompositeOperation = "lighter";
    ctx.fillRect(1, offset, img1.width - 2, 32);
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(img2, 0, 0);
    ctx.restore();
  }
  
  draw(ctx) {
    let r = this.rect;
    let cx = r.x + r.w/2;
    let cy = r.y + r.h/2;
    let img = this.img;
    if (img && img.complete && img.naturalHeight !== 0) {
      if (this.angle) {
        ctx.globalAlpha = 1 - this.lifetime/maxtime;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(this.angle);
        ctx.drawImage(img, -img.width/2, -img.height/2);
        ctx.restore();
        ctx.globalAlpha = 1;
      } else {
        let tx = cx - img.width/2;
        let ty = cy - img.height/2;
        ctx.drawImage(img, tx, ty);
      }
    }
  }
  update(dt) {}
}


class Loading extends Screen {
  constructor() {
    super();
    for (let n in gfx) {
      let img = new Image();
      img.src = `gfx/${n}.png`;
      images[n] = img;
    }

    for (let i = 0; i < sfx.length; i++) {
      let n = sfx[i];
      let snd = new Audio();
      snd.src = `sfx/${n}.mp3`;
      snd.load();
      snd.play();
      snd.volume = 0;
      effects[n] = snd;
    }
    
    for (let i = 0; i < loops.length; i++) {
      let n = loops[i];
      let url = `sfx/${n}.mp3`;
      let request = new XMLHttpRequest();
      // open the request
      request.open('GET', url, true); 
      // webaudio paramaters
      request.responseType = 'arraybuffer';
      // Once the request has completed... do this
      request.onload = function() {
        sources.ctx.decodeAudioData(request.response, function(response) {
          sources[n] = response;
        }, function () {
          console.error('Request failed');
        });
      }
      // Now that the request has been defined, actually make the request. (send it)
      request.send();
    }
  }
  
  isReady() {
    for (let k in images)
      if (!images[k].complete || images[k].naturalHeight === 0)
        return false;
    for (let k in effects)
      if (effects[k].readyState < 4)
        return false;
    for (let i = 0; i < loops.length; i++)
      if (!sources[ loops[i] ])
        return false;
    return true;
  }
  
  update(dt) {
    if (this.isReady())
      screen = new Title();
  }
  
  draw(ctx) {
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "32px 'Press Start 2P'";
    ctx.fillStyle = "#000";
    ctx.fillRect(w/2 - 120, h/2 - 25, 240, 50);
    ctx.fillStyle = "#fff";
    ctx.fillText("Loading", w/2, h/2);
  }
}

class Title extends Screen {
  constructor() {
    super();
    this.time = 0;
    this.play = new Playing();
    this.prev = {};
    for (let k in input.keys)
      this.prev[k] = input.keys[k];
  }
  
  pollKeys() {
    let keys = {};
    for (let k in input.keys) {
      if (!this.prev[k] && input.keys[k])
        keys[k] = true;
      this.prev[k] = input.keys[k];
    }
    return keys;
  }

  update(dt) {
    this.time += dt;
    this.play.update(dt);
    
    let keys = this.pollKeys();
    if (keys[17] || keys[88] || keys[13] || input.mouse[0]) {
      this.play.stop();
      this.play = null;
      screen = new Playing();
      screen.begin();
    }
  }
  
  showHiscore() {
    let e = String(email.value).toLowerCase().trim();
    
    hiscore.download(e, 1, function(res) {
      if (res) {
        hstable.innerHTML = res;
        intro.style['display'] = 'none';
        score.style['display'] = 'block';
      } else {
        effects.play("error");
      }
    })
  }
  
  restart() {
    intro.style['display'] = 'none';
    score.style['display'] = 'none';
  }
  
  draw(ctx) {
    this.play.draw(ctx);
    
    let w = ctx.canvas.width;
    let h = ctx.canvas.height;

    ctx.fillStyle = "#000";
    ctx.fillRect(w/2 - 200, h/2 - 150, 400, 300);

    this.drawLogo(ctx, w/2, h/2, "logo", "logo2");
    
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "16px 'Press Start 2P'";
    if (this.time%1 < 0.5)
      ctx.fillText("Press Start", w/2, h/2 + 60);
    
    ctx.fillText("© 2021 B.A.Y.C.", w/2, h/2 + 110);
    ctx.fillText("All Rights Reserved", w/2, h/2 + 130);
  }
}

const frameInterval = 1/60;
const maxFrameSkip = 10;

class Playing extends Screen {
  constructor() {
    super();
    this.setup();
    this.lives = 1;
    this.score = 0;
    this.time = 0;
  }
  
  begin() {
    this.playMusic();
    effects.play("start");
  }
  
  playMusic() {
    let a = new Audio();
    a.src = "music/track1.mp3";
    a.autoplay = true;
    a.loop = true;
    this.music = a;
  }
  
  pauseMusic() {
    if (this.music) {
      this.music.pause();
      this.music = null;
    }
  }
  
  stop() {
    this.pauseMusic();
    lvl.destroy();
  }
  
  loss() {
    //let h = lvl.boss.health;
    this.stop();
    this.lives --;
    if (this.lives <= 0) {
      stage = ops.stage;
      gotoRoom(stage);
      screen = new Title();
    } else {
      this.setup();
      this.begin();
      //lvl.boss.health = h;
    }
  }
  
  advance() {
    let h = 5;
    if (lvl.player && lvl.player.health > 0)
      h = lvl.player.health;
    stage ++;
    stage = stage%rooms.length;
    gotoRoom(stage);
    this.setup();
    this.begin();
    lvl.player.health = h;
  }
  
  setup() {
    this.stop();

    this.fizz = new Fizz();
    this.fizz.gx = 0;
    this.fizz.gy = gravity;
    this.fizz.maxVelocity = maxVelocity;
    let screen = this;
    this.fizz.onCollide = function(a, b, sep) {
      return screen.collision(a, b, sep);
    }
    
    this.victory = null;
    this.time = 0;
    lvl.objects = [];
    this.accum = 0;
    for (let i = 0; i < room.length; i++)
      lvl.buildLayer(this.fizz, room[i], i);
  }
  
  collision(a, b, sep) {
    let rev = { x:-sep.x, y:-sep.y };
    let obj1 = lvl.findByShape(a);
    let obj2 = lvl.findByShape(b);
    let solve1 = true;
    let solve2 = true;
    if (obj1 instanceof Sensor && obj1)
      solve1 = obj1.touch(obj2, sep);
    if (obj2 instanceof Sensor && obj2)
      solve2 = obj2.touch(obj1, rev);
    if (solve1 == false || solve2 == false)
      return false;
    return true;
  }
  
  update(dt) {
    if (this.music)
      this.music.volume = (ops.mute) ? 0 : 1;
    this.accum = Math.min(this.accum + dt, maxFrameSkip*frameInterval);
    while (this.accum >= frameInterval) {
      this.accum -= frameInterval;
      this.time += frameInterval;
      if (this.over == null)
        this.score += frameInterval;
      this.fizz.step(frameInterval);
      for (let i = 0; i < lvl.objects.length; i++)
        lvl.objects[i].update(frameInterval);
      
      let pan = lvl.pan;
      if (pan) {
        pan.time += frameInterval;
        if (pan.targ) {
          pan.x = pan.targ.shape.x;
          pan.y = pan.targ.shape.y;
        }
      }

      if (this.over != null) {
        this.over -= dt;
        if ((stage == rooms.length - 1) && this.victory) {
          screen.pauseMusic();
          if (this.over < 0 && this.over + dt >= 0) {
            this.enterHiscore();
            break;
          }
        } else if (this.over < 0) {
          if (this.lives > 1 || input.any() || this.victory) {
            this.over = null;
            if (this.victory)
              this.advance();
            else
              this.loss();
            break;
          }
        }
      }
    }
  }
  
  enterHiscore() {
    let m = Math.floor(this.score/60);
    if (m < 10)
      m = "0"+m;
    let s = Math.floor(this.score - m*60);
    if (s < 10)
      s = "0"+s;
    
    hstable.innerHTML = '';
    intro.style['display'] = 'block';
    score.style['display'] = 'none';
  }
  
  submit() {
    let n = String(name.value).trim();
    let e = String(email.value).toLowerCase().trim();
    if (!n)
    {
      intro.style["display"] = "block";
      name.style["background-color"] = "#f00";
      name.focus();
      effects.play("error");
      return;
    }
    name.style["background-color"] = "#fff";

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(e))
    {
      intro.style["display"] = "block";
      email.style["background-color"] = "#f00";
      email.focus();
      effects.play("error");
      return;
    }
    email.style["background-color"] = "#fff";

    intro.style['display'] = 'none';
    score.style['display'] = 'none';
    
    let pts = this.score;
    hiscore.upload(n, e, pts, function(res) {
      if (res) {
        hstable.innerHTML = res;
        intro.style['display'] = 'none';
        score.style['display'] = 'block';
      } else {
        effects.play("error");
        screen.enterHiscore();
      }
    })
  }
  
  restart() {
    hstable.innerHTML = '';
    intro.style['display'] = 'none';
    score.style['display'] = 'none';
    screen.destroy();
    screen = new Title();
  }
  
  draw(ctx) {
    let z = ops.scale;
    let w = (roomW - 1)*tile;
    let h = (roomH - 1)*tile;
    ctx.save();
    ctx.scale(z, z);
    
    let canvas = ctx.canvas;
    let cw = canvas.width/z;
    let ch = canvas.height/z;
    
    let cam = lvl.camera;
    if (lvl.player && !lvl.pan) {
      let s = lvl.player.shape;
      let cx = w/2 - htile;
      if (w > cw) {
        cx = s.x;
      }
      let cy = h/2;
      if (h > ch) {
        let dy = s.y - cam.y;
        let v = tile*2;
        if (dy > v)
          cy = s.y - v;
        else if (dy < -v)
          cy = s.y + v;
        else
          cy = cam.y;
      }
      cam.x = cx;
      cam.y = cy;
    }
    let pan = lvl.pan;
    if (pan) {
      let ratio = pan.time/pan.delay;
      if (ratio >= 1) {
        cam.x = pan.x;
        cam.y = pan.y;
        lvl.pan = null;
      } else {
        let dx = pan.x - pan.ix;
        let dy = pan.y - pan.iy;
        cam.x = dx*ratio + pan.ix;
        cam.y = dy*ratio + pan.iy;
      }
    }

    if (w > cw) {
      cam.x = Math.max(cam.x, -htile + cw/2);
      cam.x = Math.min(cam.x, w - cw/2 + htile);
    } else {
      cam.x = w/2;
    }
    if (h > ch) {
      cam.y = Math.max(cam.y, -htile + ch/2);
      cam.y = Math.min(cam.y, h - ch/2);
    } else {
      cam.y = h/2;
    }
    ctx.translate(-cam.x + cw/2, -cam.y + ch/2);

    ctx.fillStyle = ctx.createPattern(images["pattern"], "repeat");
    ctx.fillRect(0, 0, roomW*tile, roomH*tile);
    
    for (let j = 0; j <= 8; j++) {
      for (let i = 0; i < lvl.objects.length; i++) {
        let obj = lvl.objects[i];
        if (obj.depth == j)
          obj.draw(ctx);
      }
    }
    
    ctx.fillStyle = "#000";
    ctx.fillRect(0, -htile, -w, -Math.max(h + tile, ch));
    ctx.fillRect(0, -htile, -w, Math.max(h + tile, ch));
    ctx.fillRect(w, -htile, w,  Math.max(h + tile, ch));
    ctx.fillRect(-htile, 0, Math.max(w + tile, cw), -h);
    ctx.fillRect(-htile, h, Math.max(w + tile, cw), h);
    
    ctx.restore();
    
    ctx.font = "16px 'Press Start 2P'";
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, 40);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    ctx.fillText("Player", 64, 1);
    let phealth = "";
    if (lvl.player)
      for (let i = 0; i < lvl.player.health; i++)
        phealth += "♥";
    
    ctx.fillStyle = "#f00";
    ctx.fillText(phealth, 64, 20);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "right";
    ctx.fillText("Enemy", cw*z - 64, 1);
    ctx.fillStyle = "#f00";
    let ehealth = "";
    if (lvl.boss)
      for (let i = 0; i < lvl.boss.health; i++)
        ehealth += "♥";
    ctx.fillText(ehealth, cw*z - 64, 20);
    
    if (cw > 800) {
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      let c = "000000000" + (stage + 1);
      c = c.substr(c.length - 2);
      ctx.fillText("Stage", cw/2*z, 1);
      ctx.fillText(c+"/05", cw/2*z, 20);
    }
    
    ctx.drawImage(images["player"], 0, 0, 64, 64);
    ctx.drawImage(images["enemy"], cw*z - 64, 0);
    
    if (this.over != null) {
      if (this.lives <= 1 && !this.victory) {
        this.drawLogo(ctx, cw/2, ch/2, "gameover", "gameover2");
      } else if (this.victory && stage == rooms.length - 1) {
        this.drawLogo(ctx, cw/2, ch/2, "victory", "victory2");
      } else {
        let a = Math.min(this.over/1, 1);
        a = Math.max(a, 0);
        ctx.globalAlpha = 1 - a;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalAlpha = 1;
      }
    } else {
      ctx.save();
      ctx.font = "32px 'GothicPixels'";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.shadowColor = "#000";
      ctx.shadowOffsetY = 3*z;

      if (this.time <= 3) {
        ctx.globalAlpha = 1 - Math.min(this.time/3, 1);
        ctx.fillText("Defeat the", cw/2, ch/2);
        ctx.fillText("Mutant Ape", cw/2, ch/2 + 40);
        ctx.globalAlpha = 1;
      } else if (this.time > 6) {
        let player = lvl.player;
        if (player && stage == 0) {
          if (!player.hasmoved) {
            ctx.fillText("Use the ARROW keys", cw/2, ch/2 + 80);
            ctx.fillText("to move", cw/2, ch/2 + 120);
          }
          else if (!player.hasjumped) {
            ctx.fillText("Use the SPACE bar", cw/2, ch/2 + 80);
            ctx.fillText("to jump", cw/2, ch/2 + 120);
          }
          else if (!player.hasshot) {
            ctx.fillText("Use the X key", cw/2, ch/2 + 80);
            ctx.fillText("to shoot", cw/2, ch/2 + 120);
          }
        }
      }
      
      ctx.restore();
    }
  }
}