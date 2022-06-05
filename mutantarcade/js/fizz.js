// Minimal physics simulation using axis-aligned rectangles
// Based on my own previous work in Lua:
// https://bitbucket.org/itraykov/fizzx

const shapes = {
  rect:{},
  circle:{},
  line:{}
};

shapes.rect.rect = function(a, b) {
  // vector between the centers of the rects
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  // absolute distance between the centers of the rects
  let adx = Math.abs(dx);
  let ady = Math.abs(dy);
  // sum of the half-width extents
  let shw = a.hw + b.hw;
  let shh = a.hh + b.hh;
  // no intersection if the distance between the rects
  // is greater than the sum of the half-width extents
  if (adx >= shw || ady >= shh) return;
  // shortest separation for both the x and y axis
  let sx = shw - adx;
  let sy = shh - ady;
  if (dx < 0) sx = -sx;
  if (dy < 0) sy = -sy;

  // ignore separation for explicitly defined edges
  if (sx > 0) {
    if (a.left || b.right) sx = 0;
  } else if (sx < 0) {
    if (a.right || b.left) sx = 0;
  }
  if (sy > 0) {
    if (a.bottom || b.top) sy = 0;
  } else if (sy < 0) {
    if (a.top || b.bottom) sy = 0;
  }

  // ignore the longer separation axis
  // when both sx and sy are non-zero
  if (Math.abs(sx) < Math.abs(sy)) {
    if (sx != 0) sy = 0;
  } else {
    if (sy != 0) sx = 0;
  }
  
  // penetration depth equals
  // the length of the separation vector
  let pen = Math.sqrt(sx*sx + sy*sy)
  // todo: dist == 0 when the two rects have the same position?
  if (pen == 0) return;
  // collision normal is the normalized separation vector (sx,sy)
  return { x:sx, y: sy };
}

shapes.rect.circle = function(a, b) {
  // vector between the centers of the two shapes
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  // absolute distance between the centers of the two shapes
  let adx = Math.abs(dx);
  let ady = Math.abs(dy);
  // find the shortest separation and the penetration depth
  let sx = 0;
  let sy = 0;
  let pen = 0;
  let r = b.r;
  let hw = a.hw;
  let hh = a.hh;
  if (adx <= hw || ady <= hh) {
    // rectangle edge collision
    // check the x and y axis
    // no intersection if the distance between the shapes
    // is greater than the sum of the half-width extents and the radius
    let hwr = hw + r;
    let hhr = hh + r;
    if (adx >= hwr || ady >= hhr) return;
    // shortest separation vector
    sx = hwr - adx;
    sy = hhr - ady;
    // ignore the longer separation axis
    // when both sx and sy are non-zero
    if (sx < sy) {
      if (sx != 0) sy = 0;
    } else {
      if (sy != 0) sx = 0;
    }
    // penetration depth
    pen = Math.sqrt(sx*sx + sy*sy)
  } else {
    // rectangle corner collision
    // check the dx and dy axis
    // find the nearest point on the rect to the circle center
    let px = 0;
    let py = 0;
    if (adx > hw) px = adx - hw;
    if (ady > hh) py = ady - hh;
    // no intersection if point is outside of the circle
    let dist = Math.sqrt(px*px + py*py)
    if (dist >= r) return;
    // penetration depth equals the circle radius
    // minus the distance of the nearest point vector
    pen = r - dist;
    // shortest separation vector
    sx = px/dist*pen;
    sy = py/dist*pen;
  }
  // correct the sign of the separation vector
  if (dx < 0) sx = -sx;
  if (dy < 0) sy = -sy;
  return { x: sx, y: sy };
}

shapes.circle.circle = function(a, b) {
  // vector between the centers of the circles
  let dx = a.x - b.x;
  let dy = a.y - b.y;
  // squared distance between the centers of the circles
  let distSq = dx*dx + dy*dy;
  // sum of the radii
  let radii = a.r + b.r;
  // no intersection if the distance between the circles
  // is greater than the sum of the radii
  if (distSq >= radii*radii) return;
  // distance between the centers of the circles
  let dist = Math.sqrt(distSq)
  // distance is zero when the two circles have the same position
  let nx = 0;
  let ny = 1;
  if (dist > 0) {
    nx = dx/dist;
    ny = dy/dist;
  }
  // penetration depth equals the sum of the radii
  // minus the distance between the intersecting circles
  let pen = radii - dist;
  // collision normal is the normalized vector between the circles
  return { x: nx*pen, y: ny*pen };
}

shapes.circle.line = function(a, b, dt) {
  // normalize segment
  let x1 = b.x;
  let y1 = b.y;
  let x2 = b.x2;
  let y2 = b.y2;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let d = Math.sqrt(dx*dx + dy*dy)
  // segment is degenerate
  if (d == 0) return;
  let ndx = dx/d;
  let ndy = dy/d;
  // test along the segment axis
  let s1 = ndx*x1 + ndy*y1;
  let s2 = ndx*x2 + ndy*y2;
  let cx = a.x;
  let cy = a.y;
  let c2 = ndx*cx + ndy*cy;
  if (c2 < s1 || c2 > s2) return;
  // test along the normal axis
  // rotate the segment axis 90 degrees counter-clockwise
  let nx = -ndy;
  let ny = ndx;
  // project velocity
  let v = -(nx*a.xv + ny*a.yv); //*dt
  // ignore collision for one-sided segments
  if (v <= 0) return;
  // project segment origin
  let o = nx*b.x + ny*b.y;
  // project circle center
  let c = nx*cx + ny*cy;
  // find separation
  let pen = -(c - a.r - o);
  // entirely on one side of the segment?
  if (pen <= 0 || pen > a.r*2) return;

  // was it previously on one side of the segment?
  //if (v*dt > 0 && pen - v*dt > 1)
    //return;

  return { x:nx*pen, y:ny*pen };
}

shapes.rect.line = function(a, b) {
  // normalize segment
  let x1 = b.x;
  let y1 = b.y;
  let x2 = b.x2;
  let y2 = b.y2;
  let dx = x2 - x1;
  let dy = y2 - y1;
  let d = Math.sqrt(dx*dx + dy*dy);
  // segment is degenerate
  if (d == 0) return;
  // rotate the segment axis
  // 90 degrees counter-clockwise and normalize
  let nx = -dy/d;
  let ny = dx/d;
  // test along the normal axis
  // project velocity
  let xv = a.xv;
  let yv = a.yv;
  let v = -(nx*xv + ny*yv);
  // ignore collision for one-sided segments
  if (v <= 0) return;
  // project segment origin point
  let o = nx*x2 + ny*y2;
  // project rect center
  let x = a.x;
  let y = a.y;
  let c = nx*x + ny*y;
  // project rect extents
  let h = Math.abs(nx*a.hw) + Math.abs(ny*a.hh);
  // find the penetration depth
  let pen = -(c - h - o);
  // entirely on one side of the segment?
  if (pen <= 0 || pen > h*2) return;

  // was it previously on one side of the segment?
  //let v2 = v*dt
  //if (v2 > 0 && pen - v2 > 1)
    //return;

  // segment axis elimination
  if (x1 > x2) {
    let tmp = x1;
    x1 = x2;
    x2 = tmp;
  }
  if (y1 > y2) {
    let tmp = y1;
    y1 = y2;
    y2 = tmp;
  }
  let cx = x + nx*pen;
  if (cx + a.hw < x1 || cx - a.hw > x2) return;
  let cy = y + ny*pen
  if (cy + a.hh < y1 || cy - a.hh > y2) return;

  return { x:nx*pen, y:ny*pen };
}

shapes.line.line = function(a, b) {
  return;
}

shapes.circle.rect = function(a, b) {
  let sep = shapes.rect.circle(b, a);
  if (!sep) return;
  sep.x *= -1;
  sep.y *= -1;
  return sep;
}

shapes.line.circle = function(a, b) {
  let sep = shapes.circle.line(b, a);
  if (!sep) return;
  sep.x *= -1;
  sep.y *= -1;
  return sep;
}

shapes.line.rect = function(a, b) {
  let sep = shapes.rect.line(b, a);
  if (!sep) return;
  sep.x *= -1;
  sep.y *= -1;
  return sep;
}

class Fizz {
  constructor() {
    this.gx = 0;
    this.gy = 0;
    this.maxVelocity = 1000;
    this.statics = [];
    this.dynamics = [];
  }
  
  // add shape to the proper list
  addShape(s, kind) {
    if (s.list)
      this.removeShape(s);
    if (kind == "dynamic")
      s.list = this.dynamics;
    else if (kind == "static")
      s.list = this.statics;
    s.list.push(s);
  }

  // removes shape from its list
  removeShape(s) {
    let i = s.list.indexOf(s);
    if (i >= 0) {
      s.list.splice(i, 1);
      s.list = null;
    }
  }

  // rects have a center position and half-width/height
  addRect(kind, x, y, w, h) {
    let s = {
      n:"rect",
      x:x, y:y,
      hw:w, hh:h,
      xv:0, yv:0,
      gravity:1,
      bounce:0,
      friction:0,
      damping:0
    };
    this.addShape(s, kind);
    return s;
  }

  // circles have a center position and radius
  addCircle(kind, x, y, r) {
    let s = {
      n:"circle",
      x:x, y:y,
      r:r,
      xv:0, yv:0,
      gravity:1,
      bounce:0,
      friction:0,
      damping:0
    };
    this.addShape(s, kind);
    return s;
  }
  
  addLine(x, y, x2, y2) {
    let s = {
      n:"line",
      x:x, y:y,
      x2:x2, y2:y2,
      xv:0, yv:0,
      gravity:1,
      bounce:0,
      friction:0,
      damping:0
    };
    this.addShape(s, "static");
    return s;
  }

  // moves shape by given amount without checking for collisions
  moveShape(a, dx, dy) {
    a.x += dx;
    a.y += dy;
  }

  // checks for collisions
  checkCollision(a, b)
  {
    let sep = shapes[a.n][b.n](a, b);
    if (sep && this.onCollide(a, b, sep) !== false)
      this.solveCollision(a, b, sep.x, sep.y);
  }

  // resolves collision
  solveCollision(a, b, sx, sy)
  {
    // find the collision normal
    let d = Math.sqrt(sx*sx + sy*sy);
    let nx = sx/d;
    let ny = sy/d;
    // relative velocity
    let vx = a.xv - b.xv;
    let vy = a.yv - b.yv;
    // penetration speed
    let ps = vx*nx + vy*ny;
    // objects moving apart?
    if (ps > 0)
      return;
    // penetration component
    let px = nx*ps;
    let py = ny*ps;
    // tangent component
    let tx = vx - px;
    let ty = vy - py;
    // restitution
    let r = 1 + Math.max(a.bounce, b.bounce);
    // friction
    let f = Math.min(a.friction, b.friction);
    // adjust the velocity of shape a
    let dx = px*r + tx*f;
    let dy = py*r + ty*f;
    a.xv -= dx;
    a.yv -= dy;
    if (b.list == this.dynamics) {
      // adjust the velocity of shape b
      b.xv += dx;
      b.yv += dy;
    }
    // separate the two shapes
    this.moveShape(a, sx, sy);
  }

  // one step of the simulation
  step(dt) {
    let maxVelocity = this.maxVelocity;
    let maxVelocity2 = maxVelocity*maxVelocity;
    let gx = this.gx*dt;
    let gy = this.gy*dt;
    // update velocity vectors
    let dynamics = this.dynamics;
    for (let i = 0; i < dynamics.length; i++) {
      let d = dynamics[i];
      d.xv += gx*d.gravity;
      d.yv += gy*d.gravity;
      // damping
      let k = 1 + d.damping*dt;
      d.xv /= k;
      d.yv /= k;
      // clamp
      let v = d.xv*d.xv + d.yv*d.yv;
      if (v > maxVelocity2) {
        let n = Math.sqrt(v);
        d.xv = d.xv/n*maxVelocity;
        d.yv = d.yv/n*maxVelocity;
      }
    }
    // move dynamic objects
    let statics = this.statics;
    for (let i = 0; i < dynamics.length; i++) {
      let d = dynamics[i];
      this.moveShape(d, d.xv*dt, d.yv*dt);
      // check and resolve collisions
      for (let j = 0; j < statics.length; j++)
        this.checkCollision(d, statics[j]);
      for (let j = i + 1; j < dynamics.length; j++)
        this.checkCollision(d, dynamics[j]);
    }
  }
  
  // callback
  onCollide(a, b, sep) {
    return true;
  }
}
