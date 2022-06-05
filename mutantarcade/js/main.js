// Start loading screen
var ops = {
  mute: false,
  scale: 1,
  stage: 0
};
const params = new URLSearchParams(window.location.search);
for (let k in ops) {
  if (params.has(k)) {
    let v = params.get(k);
    if (typeof ops[k] == "number")
      ops[k] = Number(v);
    else if (typeof ops[k] == "boolean")
      ops[k] = v == "true";
    else
      ops[k] = v;
  }
}
ops.stage = 0;

var stage = ops.stage;
var room, roomW, roomH;
function gotoRoom(i) {
  stage = i;
  room = rooms[i];
  roomH = (room[0].match(/(\r\n|\n|\r)/g) || []).length + 1;
  roomW = (room[0].length - (roomH - 1))/roomH;
}
gotoRoom(stage);

const tile = 44;
const htile = tile/2;
const jumpHeight = tile*4;
const timeToApex = 0.4;
const gravity = (2*jumpHeight)/(timeToApex*timeToApex);
const maxVelocity = gravity/2;
const speed = tile*8;
const jumpVelocity = Math.sqrt(2*gravity*jumpHeight);
const jumpKey = 0.25;
const jumpPlatform = 0.15;
const bulletSpeed = tile*12;
const maxBossHealth = 15;
const maxPlayerHealth = 3;

const canvas = document.getElementById("canvas");
const intro = document.getElementById("intro");
const score = document.getElementById("hiscore");
const hstable = document.getElementById("hstable");
const name = document.getElementById("name");
const email = document.getElementById("email");

var input = {};
input.keys = {};
input.mouse = {};
input.any = function() {
  for (let k in input.keys)
    if (input.keys[k] == true)
      return true;
  for (let k in input.mouse)
    if (input.mouse[k] == true)
      return true;
  return false;
}
document.addEventListener("keydown", function(e) {
  input.keys[e.keyCode] = true;
});
document.addEventListener("keyup", function(e) {
  input.keys[e.keyCode] = false;
});
document.addEventListener("mousedown", function(e) {
  input.mouse[e.button] = true;
});
document.addEventListener("mouseup", function(e) {
  input.mouse[e.button] = false;
});
window.addEventListener("blur", function(e) { 
  for (let k in input.keys)
    input.keys[k] = false;
  for (let k in input.mouse)
    input.mouse[k] = false;
});

var screen = new Loading();
var lastupdate = Date.now();
function loop() {
  let now = Date.now();
  requestAnimationFrame(()=>loop(), canvas);
  let dt = (now - lastupdate)/1000;
  dt = Math.min(dt, 1);
  lastupdate = Date.now();

  if (canvas.width != window.innerWidth || canvas.height != window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  screen.update(dt);

  let ctx = canvas.getContext("2d");
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
  ctx.fillStyle = "#5e5930";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  screen.draw(ctx);
}
loop();
