
// 场景内的层
// 层用于管理多个对象
class Layer{
    sprite_list = [];   // 精灵集合
    visible = true;     // 是否可见
    secene = null;      // 隶属于那个场景

    constructor(cfgs){
        this.id = cfgs.id;
        this.cfgs = cfgs;
        this.init();
    }

    init(){
    }

    addSprite(sprite){
        this.sprite_list.push(sprite);
    }

    removeSprite(sprite){
        let idx = this.sprite_list.indexOf(sprite);
        this.sprite_list.splice(idx,1);
    }

    getSprite(id){
        for(let n=0;n< this.sprite_list.length;n++) {
            if(this.sprite_list[n].getId() == id){
                return this.sprite_list[n];
            }
        }
        return null;
    }

    draw(){
        if(this.visible == false){
            return ;
        }

        for(let n=0;n< this.sprite_list.length;n++){
            let _ = this.sprite_list[n];
            _.draw();
        }
    }

    show(){
        this.visible = true;
    }

    hide(){
        this.visible = false;
    }

}


class LayerFighter extends Layer{
    constructor(id,cfgs){
        super(id,cfgs);
    }

    init(){
     // 创建战机
    }

}