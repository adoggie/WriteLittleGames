
//游戏精灵
class Sprite{
    image = null ;
    animation = null ;
    x = 0;
    y = 0 ;
    timer = null;
    constructor(){
    }

    draw(){

    }
}


//喷火战机
class SpitFire extends  Sprite{
    side_moving = false;    //两边开始移动
    side_move_start_time = 0 ; // 开始移动时间
    ims_cover = 'ims_cover_spitfire';
    ims_fan = 'ims_fan_spitfire';
    ims_shadow = 'ims_shadow_spitfire';
    left_ani = null;
    right_ani = null;
    fan_ani = null;
    constructor( cfg){
        super();
        this.cfg = cfg;

        let ims_fan =  ResourceManager.instance.getImageSequence(this.ims_fan);
        this.fan_ani = new Animation(fans).setRepeat(0.1); //重复播放
    }

    draw(){
        super.draw();
        push();


        if(this.side_moving == true){

        }else{
            let ani = ResourceManager.instance.getAnimation()
        }
        pop();
    }



    leftAnimation(){
    }

    getPart(id){
    }

    keyPressing(){
        if(keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW){
            if(this.side_moving == false){ //开始两端移动

            }
            this.side_moving = true;
        }
    }
}
