
// 场景内的层
// 层用于管理多个对象
export class Layer{


    constructor(cfgs){
        this.sprite_list = [];   // 精灵集合
        this.visible = true;     // 是否可见
        this.secene = null;      // 隶属于那个场景

        this.id = cfgs.id;
        this.cfgs = cfgs;
        this.init();
        this.removed_list = [];
    }

    init(){
    }

    addSprite(sprite){
        this.sprite_list.push(sprite);
    }

    removeSprite(sprite){
        // this.removed_list.push(sprite);

        let idx = this.sprite_list.indexOf(sprite);
        this.sprite_list.splice(idx,1);
    }

    clean_removed(){
        for(let n=0;n<this.removed_list.length;n++){
            let sprite = this.removed_list[n];
            let idx = this.sprite_list.indexOf(sprite);
            this.sprite_list.splice(idx,1);
        }
        this.removed_list = [];
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
        // this.clean_removed();

        if(this.visible == false){
            return ;
        }
        let sprite_list = Array.from(this.sprite_list);
        for(let n=0;n< sprite_list.length;n++){
            let _ = sprite_list[n];
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


export class LayerFighter extends Layer{
    constructor(id,cfgs){
        super(id,cfgs);
    }

    init(){
     // 创建战机
    }

}