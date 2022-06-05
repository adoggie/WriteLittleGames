const gfx = {
  apemandying: { frames: 4, loop:true },
  apemanidle: { frames: 4, loop:true, fps:1/5 },
  apemanidlethrow: { frames: 6, fps:1/30 },
  apemanjumping: { frames: 3 },
  apemanjumpingthrow: { frames: 6, fps:1/30 },
  apemanfalling: { frames: 1 },
  apemanfallingthrow: { frames: 6, fps:1/30 },
  apemanlanding: { frames: 2 },
  apemanrunning: { frames: 6, loop:true },
  apemanrunningthrow: { frames: 6, fps:1/30 },
  apemanwalking: { frames: 4, loop:true },
  apemancrouching: { frames: 1 },
  apemancrouchingthrow: { frames: 6, fps:1/30 },
  banana: { frames: 1 },
  barrel: { frames: 1 },
  beer: { frames: 4 },
  boss: { frames: 1 },
  bossfarting: { frames: 13 },
  bossburping: { frames: 12 },
  bossbouncing: { frames: 4 },
  bosscrouching: { frames: 1 },
  bossdying: { frames: 10 },
  bossidle: { frames: 8, loop:true, fps:1/5 },
  bossjumping: { frames: 6 },
  bossfalling: { frames: 1 },
  bossdropping: { frames: 1 },
  bosspunching: { frames: 8 },
  bossrolling: { frames: 4, loop:true },
  bossstomping: { frames: 4 },
  bossthrowing: { frames: 12 },
  bosschargeup: { frames: 10 },
  bossshootlaser: { frames: 10 },
  bossshootlaser2: { frames: 16 },
  bosssummon: { frames: 6, loop:true },
  bossraising: { frames: 5 },
  bosschestbeating: { frames: 2, loop:true, fps:1/5 },
  explosion: { frames:12 },
  pop: { frames:6 },
  logo: { frames: 1 },
  logo2: { frames: 1 },
  gameover: { frames: 1 },
  gameover2: { frames: 1 },
  victory: { frames: 1 },
  victory2: { frames: 1 },
  mayc: { frames: 1 },
  ooze: { frames: 2 },
  oozeflow: { frames: 11, loop:true },
  platforms: { frames: 3 },
  walls: { frames: 16 },
  player:  {frames: 1 },
  enemy: { frames: 1 },
  fireball: { frames: 6, loop:true },
  laserh: { frames: 1 },
  laserv: { frames: 1 },
  background0: { frames: 28, cols: 7 },
  background1: { frames: 28, cols: 7 },
  background4: { frames: 6 },
  background5: { frames: 6 },
  pattern: { frames: 1 },
  rocket: { frames: 1 },
  fartcloud: { frames: 9 }
};
for (let k in gfx) {
  let v = gfx[k];
  if (!v.fps)
    v.fps = 1/15;
  if (!v.cols)
    v.cols = v.frames;
  if (!v.rows)
    v.rows = v.frames/v.cols;
  v.total = v.fps*v.frames;
}
const sfx = ["error","start","land","swing","die","hit","damage","surprise","crush","jump","explode","smash","charging","swoosh","laser","burp","fart","fanfare"];
const loops = ["steps","rolling","beating"];

var images = {};
var effects = {};
effects.play = function(n) {
  if (ops.mute) return;
  let snd = effects[n];
  if (!snd) alert(n);
  snd = snd.cloneNode(true);
  if (snd.duration > 0 && !snd.paused)
    snd.currentTime = 0;
  snd.play();
  snd.volume = 1;
  return snd;
}

var sources = {};
var AudioContext = (window.AudioContext || window.webkitAudioContext);
if (AudioContext)
  sources.ctx = new AudioContext();

sources.loop = function(n) {
  //if (ops.mute) return;
  // create the context
  let context = sources.ctx;
  // ...and the source
  let source = context.createBufferSource();
  // connect it to the destination so you can hear it.
  source.buffer = sources[n];
  source.connect(context.destination);
  source.start(0);
  source.loop = true;
  return source;
}
