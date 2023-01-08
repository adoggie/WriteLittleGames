



let heart_img;

let heart_pos = null;

let blaster_img0;
let blaster_img1;
let blaster_img2;
let blaster_img3;
let blaster_img4;
let blaster_img5;

let fight_img0;
let fight_img1;

let blaster_array = [];


let white_level = 0;



let cannon_weight = 0;

let back_add_index = 0;




let preSound;
let ShootSound;

function preload() {
  

  heart_img = loadImage('./images/spr_heart_battle_pl_0.png');

  // blaster_array=[]
  // for(let n=0;n<=5;n++){
  //   img = loadImage('./images/spr_gasterblaster_'+n+'.png');
  //   blaster_array.push({img:img,wait:0});
  // }

  blaster_img0 = loadImage('./images/spr_gasterblaster_0.png');
  blaster_img1 = loadImage('./images/spr_gasterblaster_1.png');
  blaster_img2 = loadImage('./images/spr_gasterblaster_2.png');
  blaster_img3 = loadImage('./images/spr_gasterblaster_3.png');
  blaster_img4 = loadImage('./images/spr_gasterblaster_4.png');
  blaster_img5 = loadImage('./images/spr_gasterblaster_5.png');
  //blaster_array = [blaster_img0,blaster_img1,blaster_img2,blaster_img3,blaster_img4,blaster_img5];

  blaster_array = [{img:blaster_img0,wait:1},
            {img:blaster_img1,wait:0.09},
            {img:blaster_img2,wait:0.09},
            {img:blaster_img3,wait:0.03},
            {img:blaster_img4,wait:0.04},
            {img:blaster_img5,wait:0.04}];


 soundFormats('mp3', 'ogg');
 preSound = loadSound('assets/a.mp3');
  
 shootSound = loadSound('assets/shootSound.mp3');
}

let current = null;
let blaster = null;


function setup() {
  createCanvas(1000,600);
  // preSound.play();
  // return ;

  imageMode(CENTER);
  angleMode(DEGREES);

  let welcome_scene = new Welcome('sb');
  let scene = new BattleScene('level1');
  let layer_bg = new Layer('background');
  let layer_blaster = new Layer('blaster');
  let layer_heart = new Layer('heart');

  scene.addLayer(layer_bg);
  scene.addLayer(layer_heart);
  scene.addLayer(layer_blaster);


  //blaster = new Blaster(blaster_array); // 一个鬼
  let heart = new Heart(heart_img); // 一个星

  //layer_blaster.addSprite(blaster);
  layer_heart.addSprite(heart);

  gameController.addScene(welcome_scene);
  gameController.addScene(scene);
  gameController.setCurrentScene('sb');
  

  // 以上舞台初始化工作完成 



  
  
  
  heart.move(width/2,height/2);


  cannon_weight = 20;

  white_level = 255;



}

function draw() {
  
  // console.log('draw...');
  gameController.draw();



  if (mouseIsPressed) {
    return;
    blaster = new Blaster(blaster_array,preSound,shootSound);
    preSound.play();
    let s = gameController.getCurrentScene().getLayer('heart').getSprite('heart');
    blaster.heart_pos = {x:s.x,y:s.y};

    blaster.move(mouseX,mouseY);
    //blaster.move(random(0,1200),random(0,600));

    gameController.getCurrentScene().getLayer('blaster').addSprite(blaster);
  }

}

function mousePressed(){
  gameController.setCurrentScene('level1');
  gameController.getCurrentScene().mousePressed();

  return 

  //return;
  
}



