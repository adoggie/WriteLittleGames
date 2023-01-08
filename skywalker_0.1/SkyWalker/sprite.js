
//游戏精灵
class Sprite{
    image = null ;
    animation = null ;
    x = 0;
    y = 0 ;
    timer = null;
    id = '';
    collider = null;
    scene = null;
    constructor(cfgs){
        this.cfgs = cfgs;
    }

    draw(){

    }

    setScene(s){
        this.scene = s;
        return this;
    }

    getScene(){
        return this.scene;
    }

    getId(){
        return this.id;
    }

    getSize(){}

    move(x,y){
        this.x = x;
        this.y = y;
    }

    //碰撞触发
    hit(sprite){

    }
}
