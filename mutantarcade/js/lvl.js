var zyc = null;

var lvl = {};
lvl.objects = [];
lvl.camera = {x:0,y:0};
lvl.addObject = function(obj) {
  lvl.objects.push(obj);
}
lvl.removeObject = function(obj) {
  let i = lvl.objects.indexOf(obj);
  if (i >= 0)
    lvl.objects.splice(i, 1);
  obj.destroy();
}
lvl.findByShape = function(s) {
  for (let i = 0; i < lvl.objects.length; i++) {
    let obj = lvl.objects[i];
    if (obj.shape == s)
      return obj;
  }
}
lvl.calcBits = function(data, x, y, sign) {
  let i = y*roomW + x;
  let bits = 0;
  if (y == 0 || data[i - roomW] == sign)
    bits += 1;
  if (x == roomW - 1 || data[i + 1] == sign)
    bits += 2;
  if (y == roomH - 1 || data[i + roomW] == sign)
    bits += 4;
  if (x == 0 || data[i - 1] == sign)
    bits += 8;
  return bits;
}
lvl.buildLayer = function(fizz, data, d) {
  data = data.replace(/(\r\n|\n|\r)/gm, "").split("")
  for (let i = 0; i < data.length; i++) {
    let tx = i%roomW;
    let ty = (i - tx)/roomW;
    let x = tx*tile;
    let y = ty*tile;
    let obj;
    let bits = lvl.calcBits(data, tx, ty, data[i]);
    switch (data[i]) {
      case "#":
        obj = new Wall(fizz, x, y, bits);
        break;
      case "%":
        obj = new Ooze(fizz, x, y, bits);
        break;
      case "!":
        if (stage == 0)
          obj = new Boss1(fizz, x, y);
        else if (stage == 1)
          obj = new Boss2(fizz, x, y);
        else if (stage == 2)
          obj = new Boss3(fizz, x, y);
        else if (stage == 3)
          obj = new Boss4(fizz, x, y);
        else if (stage == 4)
          obj = new Boss5(fizz, x, y);
        break;
      case "+":
        obj = new Player(fizz, x, y);
        zyc = obj;
        break;
      case "^":
        obj = new Barrel(fizz, x, y);
        break;
      case "@":
        obj = new Tile(fizz, x, y, "mayc");
        break;
      case "~":
        obj = new Animation(fizz, x, y, "oozeflow");
        break;
      case "<":
        obj = new Platform(fizz, x, y, 0);
        break;
      case "=":
        obj = new Platform(fizz, x, y, 1);
        break;
      case ">":
        obj = new Platform(fizz, x, y, 2);
        break;
      default:
        let v = data[i];
        if (v == " ") continue;
        const toTile = { "|":0, "-":1, "{":2, "}":3, "(":4, ")":5, "0":26, "1":27 };
        if (toTile[v] !== undefined)
          v = toTile[v];
        else
          v = v.charCodeAt(0) - 65;
        obj = new Tile(fizz, x, y, "background"+d, v);
    }
    if (obj != null) {
      if (obj.depth == null)
        obj.depth = d;
      lvl.addObject(obj);
    }
  }
}
lvl.destroy = function() {
  for (let i = 0; i < lvl.objects.length; i++)
    lvl.objects[i].destroy();
}
lvl.centerCamera = function(obj) {
  lvl.camera.x = obj.shape.x;
  lvl.camera.y = obj.shape.y;
}
lvl.panCamera = function(obj, delay) {
  lvl.pan = {
    x: obj.shape.x,
    y: obj.shape.y,
    ix: lvl.camera.x,
    iy: lvl.camera.y,
    targ: obj,
    time: 0,
    delay: delay
  }
}

