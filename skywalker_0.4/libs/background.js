
import {StageManager} from './stage.js'
import {TimerDelayForClassFunc} from './utils.js'
import {Sprite} from "./sprite.js";
import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'

//背景
export class Background extends  Sprite {
    constructor(cfgs) {
        super(cfgs);
        this.atlas = ResourceManager.instance.getAtlas(cfgs.atlas);
        this.ay = 0;

        let size = StageManager.instance.get().getSize();
        this.by = this.ay - size.h;
        this.timer = new TimerDelayForClassFunc(this.cfgs.freqs,this.scroll,this);
    }

    scroll(){
        let size = this.scene.getSize();
        this.by += this.cfgs.scroll;
        this.ay += this.cfgs.scroll;
        if(this.ay > size.h){
            this.ay = this.by - size.h; // -this.atlas.getSize().h;
        }
        if(this.by > size.h){
            this.by = this.ay - size.h;
        }
    }

    draw(){
        let size = this.scene.getSize();
        push();
        imageMode(CORNER);
        image(this.atlas.img,0,this.ay,size.w,size.h,0,0,this.atlas.getSize().w,this.atlas.getSize().h);
        image(this.atlas.img,0,this.by,size.w,size.h,0,0,this.atlas.getSize().w,this.atlas.getSize().h);
        pop();
        this.timer.run();
    }
}