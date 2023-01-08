
//游戏精灵
export class Sprite{

    constructor(cfgs){
        this.image = null ;
        this.animation = null ;
        this.x = 0;
        this.y = 0 ;
        this.timer = null;
        this.id = '';
        this.collider = null;
        this.scene = null;
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
