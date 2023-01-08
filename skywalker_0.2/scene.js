
//游戏场景
class Scene{
    id = '';
    sprites = [];
    cfgs = {};
    layers = [];
    snd_bg = null;
    stage = null;
    removing_list = [];
    constructor(cfgs){
        this.cfgs = cfgs;
        this.id = cfgs.id;

    }

    init(){
        // 构建场景所涉及的游戏对象
        let sndcfg = this.cfgs.sound.bg;
        this.snd_bg = ResourceManager.instance.getSound(sndcfg.id);
        if(this.snd_bg !=null) {
            if (sndcfg.loop == true) {
                this.snd_bg.setLoop(true);
            }
        }
    }


    active(){
        // 激活

    }

    //切换离开
    deactive(){

    }

    addLayer(layer){
        layer.scene = this;
        this.layers.push(layer);
        return this;
    }

    removeLayer(layer){
        let idx = this.layers.indexOf(layer);
        this.layers.splice(idx,1);
    }

    getLayer(id){
        for(let n=0;n< this.layers.length;n++){
            if( this.layers[n].id == id){
                return this.layers[n];
            }
        }
        return null;
    }

    addSprite(sprite,layer_id){
        this.getLayer(layer_id).addSprite(sprite);
        return this;
    }

    //
    removeSprite(sprite,layer_id){
        let layer = this.getLayer(layer_id);
        layer.removeSprite(sprite);
    }

    draw(){
        for(let n=0;n< this.layers.length;n++) {
            let _ = this.layers[n];
            _.draw();
        }
        this.authors();
        this.drawScore();
    }

    authors(){
        textSize(14);
        stroke('white');
        textStyle(BOLDITALIC);

        text("SkyWalker v0.2 zyc / github.com/adoggie",10,20);
    }




    collide_detect(){
    }

    sprite_free(){

    }

    getSize(){
        return StageManager.instance.get().getSize();
    }

}

