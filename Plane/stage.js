// 游戏舞台
// 所有的场景都在舞台上切换

class Stage{
  constructor(){
    this.sence_list = {}
    this.active = null;
  }
  
  addScene(scene){
    id = scene.id;
    this.sence_list[id] = scene;
    if(this.active == null){
      ths.active = scene;
    }
  }
  
  getScene(id){
    return this.sence_list[id];
  }
  
  activeScene(id){
    this.active = this.sence_list[id];
    return this;
  }
  
  init(){
    for( let i in this.sence_list){
      this.sence_list[i].init();
    }
    return this;
  }
  
  setup(){
    createCanvas(400, 400);
    background(153);
     // mySound.setVolume(0.1);
    mySound.play();
  }
  
  draw(){
    background(255);
    
    if(this.active != null){
      this.active.draw();
    }
    // hill_sun_down();
    // plane1.draw();
  }
  
  keyPressed(){
    for( let i in this.sence_list){
      this.sence_list[i].keyPressed();  // 传播给所有场景
    }
  }
}

var stage = new Stage();

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/jungle.ogg');
}

function setup() {
  stage.setup();
  main();
}


function draw(){
  stage.draw();
}

function keyPressed(){
  stage.keyPressed();
}

