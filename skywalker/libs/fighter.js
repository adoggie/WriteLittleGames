
import {ControllPad} from './utils.js'
import {Collider,CollideRect} from "./collider.js";
import {ConfigManager,Constants} from "./config.js";
import {Sprite} from "./sprite.js";
import {StageManager} from './stage.js'
import {Weapon} from './weapon.js'

import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'

export class FighterPart{
    constructor(fighter,cfgs){
        this.cfgs = cfgs;
        this.fighter = fighter;
        this.id = cfgs.id;
        this.x = 0;
        this.y = 0;
        this.turning = 0 ; // 0: normal , 1:left, 2:right
    }

    draw(){
        push();
        imageMode(CENTER);
        if(this.turning == 0){
            image(this.image,x,y);
        }else if(this.turning == 1){
            this.ani_left.run();
        }else if(this.turning ==2) {
            this.ani_right.run();
        }
        pop();
    }

    move(x,y){
        this.x = x + this.cfgs.offx;
        this.y = y + this.cfgs.offy;
    }

    turn(dir){
        if(this.turning == dir){
            return ;
        }else{
            if(dir == 0){

            }
            if(dir == 1){ // left
                this.ani_left.start();
            }
            if(dir == 2) {
                this.ani_right.start();
            }
            this.turning = dir;
        }
    }
}
//飞机部件
export class FighterPartCover extends FighterPart{
    constructor(fighter,cfgs){
        super(fighter,cfgs);

        let ims = ResourceManager.instance.getImageSequence(this.cfgs.image.ims);
        this.image = ims.getN(this.cfgs.image.index); //飞机正图形
        this.ani_left = ResourceManager.instance.getAnimation(this.cfgs.ani_turn_left);
        this.ani_right = ResourceManager.instance.getAnimation(this.cfgs.ani_turn_right);
    }

    draw(){
        push();
        imageMode(CENTER);
        if(this.turning == 0){
            image(this.image.getImage(),this.x,this.y,this.image.w,this.image.h,this.image.x,this.image.y,this.image.w,this.image.h);
        }else if(this.turning == 1){
            this.ani_left.run();
        }else if(this.turning ==2) {
            this.ani_right.run();
        }
        pop();
    }

    move(x,y){
        super.move(x,y);
        this.ani_left.x = this.x;
        this.ani_left.y = this.y;
        this.ani_right.x = this.x;
        this.ani_right.y = this.y;

     }

}

//引擎风扇
export class FighterPartFan extends FighterPart{
    constructor(fighter,cfgs){
        super(fighter,cfgs);
        this.ani_fan = ResourceManager.instance.getAnimation(this.cfgs.ani_fan);
        this.ani_fan.start();
    }

    draw(){
        push();
        imageMode(CENTER);
        this.ani_fan.run();
        pop();
    }

     move(x,y){
        super.move(x,y);
        this.ani_fan.x = this.x;
        this.ani_fan.y = this.y;

     }

     turn(dir){}
}

//阴影
export class FighterPartShadow extends FighterPart {
    constructor(fighter,cfgs){
        super(fighter,cfgs);

        let ims = ResourceManager.instance.getImageSequence(this.cfgs.image.ims);
        this.image = ims.getN(this.cfgs.image.index); //飞机正图形
        this.ani_left = ResourceManager.instance.getAnimation(this.cfgs.ani_turn_left);
        this.ani_right = ResourceManager.instance.getAnimation(this.cfgs.ani_turn_right);
    }

    draw(){
        push();
        imageMode(CENTER);
        if(this.turning == 0){
            image(this.image.getImage(),this.x,this.y,this.image.w,this.image.h,this.image.x,this.image.y,this.image.w,this.image.h);
        }else if(this.turning == 1){
            this.ani_left.run();
        }else if(this.turning ==2) {
            this.ani_right.run();
        }
        pop();
    }

     move(x,y){
        super.move(x,y);
        this.ani_left.x = this.x;
        this.ani_left.y = this.y;
        this.ani_right.x = this.x;
        this.ani_right.y = this.y;

     }
}

export class Fighter extends Sprite{

    constructor(cfgs){
        super(cfgs);
        this.health = 0;
        this.health = cfgs.health;
    }
}


//喷火战机
export class SpitFire extends  Fighter{

    constructor( cfgs){
        super(cfgs);
        this.side_moving = false;    //两边开始移动
        this.side_move_start_time = 0 ; // 开始移动时间
        this.ims_cover = null;
        this.ims_fan = null;
        this.ims_shadow = null;
        this.left_ani = null;
        this.right_ani = null;
        this.fan_ani = null;
        this.parts = [];
        this.weapon = null;

        this.cfgs = cfgs;
        this.id = this.cfgs.id;

        this.init();
        // let ims_fans =  ResourceManager.instance.getImageSequence(this.ims_fan);
        // this.fan_ani = new Animation(ims_fans).setRepeat(0.1); //重复播放
    }

    init() {

        let cfg = ConfigManager.findItemByKey('id', 'cover', this.cfgs.parts);

        for (let n = 0; n < this.cfgs.parts.length; n++) {
            let c = this.cfgs.parts[n];
            let part = new c.cls(c.id,c);
            this.parts.push(part);
        }

        this.collider = new Collider(this.cfgs.collider);
        //------
        this.weapon = new Weapon(this.cfgs.weapons);

    }

    draw(){
        super.draw();
        let px = this.x;
        let py = this.y;

        for(let n=0;n< this.parts.length;n++) {
            let part = this.parts[n];
            part.move(this.x,this.y);
            part.draw();

        }

        this.collider.draw();

        this.weapon.draw(); // 开火触发
        //
        // if(mouseIsPressed){
        //     this.move(mouseX,mouseY);
        // }
        // this.move(mouseX,mouseY);
        // this.move(width/2,height/2);

        // 控制面板
        let pad = ControllPad.instance;
        if( pad.keyIsDown(UP_ARROW)){
                this.y-= this.cfgs.speed;
        }
        if( pad.keyIsDown(DOWN_ARROW)){
            this.y+=this.cfgs.speed;
        }

        if(pad.keyIsDown(LEFT_ARROW)){
            this.x-=this.cfgs.speed;
            for(let n=0;n< this.parts.length;n++) {
                let part = this.parts[n];
                part.turn(Constants.TURN_LEFT);
                part.move(this.x,this.y);
            }

        }else if(pad.keyIsDown(RIGHT_ARROW)){
            this.x+=this.cfgs.speed;
            for(let n=0;n< this.parts.length;n++) {
                let part = this.parts[n];
                part.turn(Constants.TURN_RIGHT);
                part.move(this.x,this.y);
            }
        }else if(pad.keyIsDown(UP_ARROW)){
            this.y-=this.cfgs.speed;
            for(let n=0;n< this.parts.length;n++) {
                let part = this.parts[n];
                part.turn(Constants.TURN_NONE);
            }
        }else if(pad.keyIsDown(DOWN_ARROW)){
            this.y+=this.cfgs.speed;
            for(let n=0;n< this.parts.length;n++) {
                let part = this.parts[n];
                part.turn(Constants.TURN_NONE);
            }
        }else{
            for(let n=0;n< this.parts.length;n++) {
                let part = this.parts[n];
                part.turn(Constants.TURN_NONE);
            }
        }

        let rc = this.getRect();
        if(rc.x < 0){
            this.x = this.getSize().w/2;
        }
        if(rc.y < 0){
            this.y = this.getSize().h/2;
        }
        if(rc.x + rc.w > StageManager.instance.get().getSize().w){
            this.x = StageManager.instance.get().getSize().w - rc.w/2;
        }

        if(rc.y + rc.h > StageManager.instance.get().getSize().h){
            // this.y = StageManager.instance.get().getSize().h - rc.h;
            this.y = py;
        }

        this.weapon.move(this.x,this.y);

        this.collider.move(this.x,this.y);
    }

    move(x,y){
        super.move(x,y);
        for(let n=0;n< this.parts.length;n++){
            let part = this.parts[n];
            part.move(x,y);
        }

        // this.weapon.move(x,y);
    }

    getSize(){
        return this.cfgs.size;
    }

    getRect(){
        return {x:this.x - this.cfgs.size.w/2, y:this.y - this.cfgs.size.h/2,
            w:this.cfgs.size.w, h:this.cfgs.size.h
        }
    }

    getPart(id){
    }

}
