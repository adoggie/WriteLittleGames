import {BloodBar} from './utils.js'
import {TimerDelayForClassFunc,getDeltaTime} from './utils.js'
import {Collider,CollideRect} from "./collider.js";
import {ConfigManager,Constants} from "./config.js";
import {Sprite} from "./sprite.js";
import {ResourceManager,Sound,AtlasImage,xImage,Atlas,ImageSequence,Animation} from './resource.js'
import {StageManager} from './stage.js'
import {Bullet} from './bullet.js';
import {Fighter} from './fighter.js';

class EnemySpawn {

    constructor(factory, cfgs) {
        this.cfgs = cfgs;
        this.timer = null;
        this.freqs_timer = 0;

        this.factory = factory;
        this.init();
    }

    init() {
        let freqs = random(this.cfgs.freqs[0], this.cfgs.freqs[1]);
        this.timer = new TimerDelayForClassFunc(freqs, this.spwan, this);
    }

    spwan() { //时间触发到了开始新生成飞机
        //随机生成
        let num = random(this.cfgs.num[0], this.cfgs.num[1]);
        for (let n = 0; n < num; n++) {
            let cfg = ConfigManager.findItemByKey('id', this.cfgs.id, ConfigManager.instance.root['enemy_list']);
            let enemy = new cfg.cls(cfg);
            enemy.x = random(enemy.getSize().w/2, width -  enemy.getSize().w/2); // 随机出现位置
            enemy.y = random(-200,-10);
            enemy.spawn = this;

            // enemy.x = width/4;
            // enemy.y = 60;

            let path = new this.cfgs.path.cls(enemy.x,enemy.y,this.cfgs.path);
            enemy.setFlyPath(path);
            this.factory.addEnemy(enemy);
        }
    }

    run() {
        this.timer.run();
        // 逐步加快出机速度
        this.freqs_timer += getDeltaTime()/1000;
        if(this.freqs_timer > 30){  // 30 秒调整一次难度
            if(this.timer.delay > 0.1) {
                this.timer.delay -= 0.02;
            }

            this.freqs_timer = 0;
        }
    }
}

class EnemyFactory {

    constructor(scene, cfgs) {
        this.enemy_list = [];
        this.spawn_list = [];
        this.scene = null;
        this.scene = scene;
        this.cfgs = cfgs;
        this.init();
    }

    init() {
        for (let n = 0; n < this.cfgs.groups.length; n++) {
            let _ = this.cfgs.groups[n];
            let sp = new _.spawn(this, _); // 生成spawn 对象
            this.spawn_list.push(sp);
        }
    }

    // scene 调用run() 生成敌机
    run() {
        //
        for (let n = 0; n < this.spawn_list.length; n++) {
            this.spawn_list[n].run();
        }
        // this.cleanEnemy();
    }

    // cleanEnemy(){
    //     //检查是否无效
    //     let removed = [];
    //     for(let n=0;n< this.enemy_list.length;n++){
    //         let e = this.enemy_list[n];
    //         if( e.invalid()){
    //             removed.push(e);
    //             this.scene.removeSprite(e,e.spawn.cfgs.layer);//
    //         }
    //
    //     }
    //     for(let n=0;n< removed.length ;n++){
    //         this.removeEnemy(removed[n]);
    //     }
    // }

    addEnemy(enemy) {
        // this.enemy_list.push(enemy);
        this.scene.addSprite(enemy, enemy.spawn.cfgs.layer); // 加入 layer 管理，后继绘制使用
    }

    // removeEnemy(enemy) {
    //     let idx = this.enemy_list.indexOf(enemy);
    //     this.enemy_list.splice(idx, 1);
    // }
}


class EnemyPartCover {
    constructor(enemy, cfgs) {
        this.cfgs = cfgs;
        this.enemy = enemy;
        this.id = cfgs.id;
        this.x = 0;
        this.y = 0;
        this.turning = 0; // 0: normal , 1:left, 2:right

        let ims = ResourceManager.instance.getImageSequence(this.cfgs.image.ims);
        this.image = ims.getN(this.cfgs.image.index); //飞机正图形
    }

    draw() {
        push();
        translate(this.x,this.y);
        //旋转
        angleMode(DEGREES);
        rotate(this.cfgs.rotate.angle);

        if(this.enemy.fly_path != null){
            let pos = this.enemy.fly_path.current();
            let angle = pos[2];
            rotate(radians(angle));

        }

        imageMode(CENTER);
        if (this.turning == 0) {
            // image(this.image.getImage(), this.x, this.y, this.image.w, this.image.h, this.image.x, this.image.y, this.image.w, this.image.h);
            // image(this.image.getImage(), 0, 0, this.image.w/3*2, this.image.h/3*2, this.image.x, this.image.y, this.image.w, this.image.h);
            image(this.image.getImage(), 0, 0, this.enemy.getSize().w, this.enemy.getSize().h, this.image.x, this.image.y, this.image.w, this.image.h);
        }


        pop();

    }

    move(x, y) {
        this.x = x + this.cfgs.offx;
        this.y = y + this.cfgs.offy;
    }

    turn(dir) {

    }



}


class Enemy extends Sprite {

    constructor(cfgs) {
        super(cfgs);
        this.fly_path = null;
        this.parts = [];
        this.spawn = null;
        this.health = 0;
        this.ani_boom = null;
        this.kill_timer = null;
        this.health = cfgs.health; // 血量
    }

    setFlyPath(path) {
        this.fly_path = path;
    }

    invalid(){
        // 默认飞出屏幕下方，视为无效
        if(this.y - this.getSize().h/2 > StageManager.instance.get().getSize().h){
            return true;
        }
        return false; //是否无效
    }

    kill(){
        // kill self
        let scene = StageManager.instance.get().getScene();
        scene.enemyDie(this); //这个函数不能处在 layer绘制sprite的循环中，否则会导致删除出问题
        this.kill_timer = null;
    }

    draw(){
        super.draw();
        if(this.kill_timer != null){
            this.kill_timer.run();
        }
    }
    // 子弹是否命中
    hit(obj){ //
        // return false;
        if( this.collider.isCollided(obj.collider)){
            if( obj instanceof Bullet){ // 与子弹碰撞
                if( this.health >0) {
                    let snd_id = obj.cfgs.sound.hit; //撞击声音播放
                    let snd = ResourceManager.instance.getSound(snd_id);
                    if(snd !=null){
                        snd.play(); //播放撞击声音
                    }
                }
                if(this.health > 0) {
                    this.health -= obj.cfgs.damage; // 生命值减少
                    if (this.health <= 0) {
                        this.health = 0;
                        // 播放爆炸
                        let snd = ResourceManager.instance.getSound(this.cfgs.explosion.sound);
                        if (snd != null) {
                            snd.play();
                        }
                        this.kill_timer = new TimerDelayForClassFunc(0.5,this.kill,this);
                    }
                }
            }

            if(obj instanceof Fighter){ // 与战机碰撞
                this.health -= this.cfgs.damage; // 敌机伤害
                obj.health -= this.cfgs.damage;
                if(this.health < 0){
                    this.health = 0;
                }
                if(obj.health<0){
                    obj.health = 0;
                }
            }
            return true;
        }
        return false;
    }
}

//零式战机
class EnemyZero extends Enemy {

    constructor(cfgs) {
        super(cfgs);
        this.blood_bar = null;
        this.init();
        this.ani_explosion = null;
    }

    init() {
        // let cfg = ConfigManager.findItemByKey('id', 'cover', this.cfgs.parts);

        for (let n = 0; n < this.cfgs.parts.length; n++) {
            let c = this.cfgs.parts[n];
            let part = new c.cls( this,c);
            this.parts.push(part);
        }

        this.collider = new Collider(this.cfgs.collider);
        this.blood_bar = new BloodBar(this.cfgs.blood_bar,this);
    }

    draw() {
        super.draw();

        if(this.fly_path != null) {
            this.fly_path.draw();

         }

        if( this.fly_path != null){
            let  pos = this.fly_path.step();
            // this.move(this.fly_path.x,this.fly_path.y);
            this.move(pos[0],pos[1]);
        }

        for (let n = 0; n < this.parts.length; n++) {
            let part = this.parts[n];
            part.move(this.x, this.y);
            part.draw();
        }



        this.collider.move(this.x,this.y);
        this.collider.draw();

        this.blood_bar.draw();

        // 绘制爆炸例子
        if(this.health <=0){
            this.drawExplosion();
        }
    }

    drawExplosion(){

        if( this.ani_explosion == null){
            this.ani_explosion = ResourceManager.instance.getAnimation(this.cfgs.explosion.ani).clone();

        }else {
            this.ani_explosion.move(this.x,this.y);
            let ani = this.ani_explosion;
            if (ani.images.length == 1) {
                let img = ani.images[0];
                push();
                imageMode(CENTER);
                img.draw(this.x, this.y);
                pop();
                // this.kill_timer = new TimerDelayForClassFunc(0.5,this.kill,this);
                return;
            }else{
                if(this.ani_explosion.is_play_end()){
                    // this.kill_timer = new TimerDelayForClassFunc(0.5,this.kill,this);
                }
                this.ani_explosion.run();
            }
        }

    }

    move(x,y){
        super.move(x,y);
        for(let n=0;n< this.parts.length;n++){
            let part = this.parts[n];
            part.move(x,y);
        }

        this.blood_bar.move(x,y);
    }

    getSize(){
        return this.cfgs.size;
    }

    getRect(){
        return {x:this.x - this.cfgs.size.w/2, y:this.y - this.cfgs.size.h/2,
            w:this.cfgs.size.w, h:this.cfgs.size.h
        }
    }
}

export {EnemySpawn,EnemyFactory,EnemyZero,EnemyPartCover,Enemy};