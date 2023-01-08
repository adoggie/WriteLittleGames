

class Bullet extends Sprite{

    constructor(cfgs){
        super(cfgs);
        this.x = 0;
        this.y = 0;
        this.damage = 1;
        this.speed = 1;
        this.img = null; //AtlasImage
        this.collider = null;
        this.fly_path = null; // 飞行轨迹

        let ims = ResourceManager.instance.getImageSequence(cfgs.ims);
        this.img = ims.getN(0);
        this.collider = new Collider(cfgs.collider);
    }


    move(x,y){
        this.x = x;
        this.y = y;
    }

    draw(){
        push();
        imageMode(CENTER);
        this.img.draw(this.x,this.y);
        pop();
        if( this.fly_path != null){
            this.fly_path.step();
            this.move(this.fly_path.x,this.fly_path.y);
        }

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