
import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'
import {StageManager} from './stage.js'



//游戏场景
export class Scene{

    constructor(cfgs){
        this.id = '';
        this.sprites = [];
    // cfgs = {};
        this.layers = [];
        this.snd_bg = null;
        this.stage = null;
        this.removing_list = [];
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
            _.draw(); // 不能在此循环中进行layer删除对象的操作
        }
        this.authors();
        this.drawScore();
    }

    authors(){
        textSize(14);
        stroke('white');
        textStyle(BOLDITALIC);

        text("SkyWalker v0.4 (Missile/Bezier) / github.com/adoggie",10,20);
    }




    collide_detect(){
    }

    sprite_free(){

    }

    getSize(){
        return StageManager.instance.get().getSize();
    }

    // 查询当前场景视图内的敌机
    getEnemiesInView(params){
        return [];
    }
}

