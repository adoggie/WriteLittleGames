//战斗关卡 1



class SceneMission1 extends Scene{

    // layer_bg = null;
    // layer_fighter = null;
    // layer_enemy = null;
    fighter  =null;

    enemy_factory = null;
    fighter_bullet_list = [];
    enemy_bullet_list = [];
    background = null;
    // bullet_list = [];

    enemy_die_count = 0;
    score_count = 0;
    constructor(cfgs){
        super(cfgs);

    }

    init() {
        super.init();
        for(let n=0;n< this.cfgs.layers.length;n++){
            let _ = this.cfgs.layers[n];
            let layer = new Layer(_);
            this.addLayer(layer);
        }


        let cfgs = ConfigManager.findItemByKey('id','spitfire',game_configs.fighters);
        this.fighter = new SpitFire(cfgs);

        this.getLayer('fighter').addSprite(this.fighter);
        this.fighter.setScene(this);

        let size = this.stage.getSize();
        //放置屏幕下方
        // this.fighter.move( size.w/2, size.h - this.fighter.getSize().h);
        this.fighter.move( size.w/2, size.h/2);

        let factory = new this.cfgs.enemy_factory.cls(this,this.cfgs.enemy_factory);
        this.enemy_factory = factory;

        cfgs = this.cfgs.background;
        this.background = new cfgs.cls(cfgs);
        this.background.setScene(this);
        this.getLayer('bg').addSprite(this.background);
    }


    active() {
        super.active();
        if(this.snd_bg != null) {
            this.snd_bg.play();
        }
    }

    enemyDie( enemy){
        this.enemy_die_count +=1;
        this.score_count += enemy.cfgs.score;
        this.removeSprite(enemy,enemy.spawn.cfgs.layer);
    }

    draw(){
        background(23,133,128);
        super.draw();
        this.enemy_factory.run();

        ControllPad.instance.draw();
        this.collideDetect();

        this.cleanEnemy(); // 清除无效敌机
        this.cleanBullet("enemy_bullet"); //清除无效子弹
        this.cleanBullet("fighter_bullet");

        this.drawScore();
    }

    drawScore(){
        textSize(18);
        stroke('black');
        textStyle(BOLDITALIC);

        text( this.score_count +'/'+this.enemy_die_count,10,50);
    }

    cleanBullet( layer_id){

        let bullet_list = this.getLayer(layer_id).sprite_list;
        let removed = [];
        for(let n=0;n<bullet_list.length;n++){
            let b = bullet_list[n];
            if(b.invalid()){
                removed.push(b);
            }
        }

        for(let n=0;n< removed.length ;n++){
            let b = removed[n];
            this.removeSprite(b,layer_id);//

        }
    }

    cleanEnemy(){
        //检查是否无效
        let enemy_list = this.getLayer('enemy').sprite_list;
        let removed = [];
        for(let n=0;n< enemy_list.length;n++){
            let e = enemy_list[n];
            if( e.invalid()){
                removed.push(e);
            }
        }
        for(let n=0;n< removed.length ;n++){
            let e = removed[n];
            this.removeSprite(e,e.spawn.cfgs.layer);//
        }
    }

    bullet_clean(){

    }
    // 碰撞检测
    collideDetect(){
        this.collideBullet();
        this.collideCrafts(); //飞机相撞
    }

    collideCrafts(){

    }

    //子弹碰撞
    collideBullet(){
        this.collideEnemyBullet();
        this.collideFighterBullet();
    }
    // 敌方子弹碰撞
    collideEnemyBullet(){
        let bullet_list = this.getLayer("enemy_bullet").sprite_list;
    }
    // 我方子弹碰撞
    collideFighterBullet(){
        let removed = [];
        let bullet_list = this.getLayer("fighter_bullet").sprite_list;
        let enemy_list = this.getLayer("enemy").sprite_list;
        for  (let n=0;n< enemy_list.length;n++){
            let e = enemy_list[n];
            for(let m=0;m<bullet_list.length;m++){
                let b = bullet_list[m];
                if( e.hit(b)){
                    // print("bullet hit enemy.");
                    removed.push(b);
                }
            }
        }

        for(let n=0;n< removed.length ;n++){
            this.getLayer("fighter_bullet").removeSprite(removed[n]);
        }
    }

    sprite_free(){

    }

    addBullet(bullet){
        this.getLayer('fighter_bullet').addSprite(bullet);
        bullet.setScene(this);
        // print("bullet num:",this.getLayer('fighter_bullet').sprite_list.length);
    }
}
