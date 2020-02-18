class Layer{
  constructor(){
    this.sprites = [];
    this.visible = true;
  }
  
  draw(){
    if(!this.visible){
      return;
    }
    for(let n =0 ;n< this.sprites.length ; n++){
      let sprite = this.sprites[n];
      sprite.draw();
    }
  }
  
  show(){
    this.visible = true;
  }
  
  hide(){
    this.visible = false;
  }
  
  getVisible(){
    return this.visible;
  }
  
  add(sprite){
    this.sprites.push(sprite);
    return this;
  }
  
}