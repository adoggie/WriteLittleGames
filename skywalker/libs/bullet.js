import {Collider,CollideRect} from "./collider.js";
import {Sprite} from "./sprite.js";
import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'
import {StageManager} from './stage.js'

export class Bullet extends Sprite{

    constructor(cfgs){
        super(cfgs);
        this.x = 0;
        this.y = 0;
        this.damage = 1;
        this.speed = 1;
        this.img = null; //AtlasImage
        this.collider = null;
        this.fly_path = null; // 飞行轨迹

        this.init();
    }

    init(){
        let ims = ResourceManager.instance.getImageSequence(this.cfgs.ims);
        this.img = ims.getN(0);
        this.collider = new Collider(this.cfgs.collider);
    }

    move(x,y){
        this.x = x;
        this.y = y;
    }

    draw(){
        push();
        translate(this.x,this.y);
        if( this.fly_path != null){
            let pos = this.fly_path.step();
            this.move(pos[0],pos[1]);
            rotate(radians(pos[2]));
        }


        imageMode(CENTER);
        // this.img.draw(0,0);
        let w = this.img.w;
        let h = this.img.h;
        if( this.cfgs.scale != undefined){ // 缩放图片比例
            w = this.cfgs.scale * w;
            h = this.cfgs.scale * h;
        }
        image(this.img.atlas.img,0,0,w,h,this.img.x,this.img.y,this.img.w,this.img.h);
        pop();


        this.collider.move(this.x,this.y);
        this.collider.draw(); // 绘制碰撞区域
    }

    setFlyPath(path) {
        this.fly_path = path;
    }

    invalid(){
        // 默认飞出屏幕下方，视为无效
        if(this.y < -300 ||
            this.y >StageManager.instance.get().getSize().h +300
            || this.x < -300 || this.x >StageManager.instance.get().getSize().w +300 ){
            return true;
        }
        return false; //是否无效
    }
}

//机枪弹
class MechineGunBullet extends Bullet{
    constructor(cfgs){
        super(cfgs);
    }
}

//跟踪导弹
export class Missile extends Bullet{
    constructor(cfgs){
        super(cfgs);

    }
}