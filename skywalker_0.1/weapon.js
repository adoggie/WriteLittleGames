

class Weapon{
    cfgs = {};
    setup_list = [];    //安装点
    constructor(cfgs){// game_configs.fighers.weapons
        this.cfgs = cfgs;
        this.init();
    }

    init(){
        for(let n=0;n<this.cfgs.length;n++){
            let _ = this.cfgs[n];
            let setup = new WeaponSetupPoint(_);
            this.setup_list.push(setup); // 准备安装点
        }
    }

    move(x,y){
        for(let n=0; n< this.setup_list.length; n++){
            let setup = this.setup_list[n];
            setup.move(x,y);
        }
    }

    draw(){
        for(let n=0; n< this.setup_list.length; n++){
            let setup = this.setup_list[n];
            setup.draw();
        }
    }


}

// 武器安装点
class  WeaponSetupPoint{
    weapon = null;
    image = null;   //武器安装点贴图
    x = 0;
    y = 0;
    bullet_cfgs = null; // 子弹发射参数
    timer = null;
    bullets = [];   //保存子弹列表
    constructor(cfgs){
        this.cfgs = cfgs;
        this.id = cfgs.id;
        this.x = cfgs.x; // 主飞行器中心坐标
        this.y = cfgs.y ;
        this.init();
    }

    init(){
        this.bullet_cfgs = ConfigManager.findItemByKey('id',this.cfgs.bullet,ConfigManager.instance.root['bullet_list']);
        this.timer = new TimerDelayForClassFunc(this.cfgs.freqs,this.fire,this);// 子弹发射频率

    }

    fire(){ // 开火
        let bullet = new this.bullet_cfgs.cls(this.bullet_cfgs);//  game_configs.bullet_list
        bullet.move(this.x,this.y);
        let scene = StageManager.instance.get().getScene();
        scene.addBullet(bullet);

        let path = new this.cfgs.path.cls(bullet.x,bullet.y,this.cfgs.path);
        bullet.setFlyPath(path);
        // 播放声音
        if( this.cfgs.play_sound) { //允许声音播放
            let snd = ResourceManager.instance.getSound(this.bullet_cfgs.sound.fire);
            if (snd != null) {
                snd.play();
            }
        }


    }

    draw(){ // 驱动
        this.timer.run();
    }

    move(x,y){
        this.x = this.cfgs.x + x;
        this.y = this.cfgs.y + y;
    }

    cleanBullet(){

    }
}

// 双管机枪
class WeaponM11Gun extends Weapon{

}

