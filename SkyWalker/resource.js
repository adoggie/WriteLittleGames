
//资源管理器
class ResourceManager{
    atlas_list = {};
    cfgs = {};

    addImage(img){
        this.images[img.id] = img ;
    }
    getImage(id){}

    //加载图集
    loadImage(path){

    }

    init(){
        this.init_images(this.cfgs);
        this.init_sounds(this.cfgs);
    }

    setup(){

    }

    getAnimation(id){}
    getImageSequence(id){
    }

    init_images(cfgs){
        //加载图像资源
        for(let n=0;n<cfgs.atlas.length;n++){
            let _ = cfgs[n];
            let res = loadImage(_.path);
            let atlas = new Atlas(_.id,_.path,_.w,_.h);
            this.atlas_list[_.id] = atlas;
        }
    }

    init_sounds(cfgs){
    }
}


ResourceManager.instance = new ResourceManager();

//图像
class AtlasImage{
    atlas = null;
    constructor(atlas,id,x,y,w,h){
        this.atlas = atlas;
        this.id = id;
        this.index = 0;
        this.w = w;
        this.h = h;
        this.x = x;   //图集中的开始 x,y
        this.y = y;
    }

    // static createFromAtlas(id,)
    draw(destx,desty){
        image( this.atlas.img,destx,desty,this.rc.x,this.rc.y,this.rc.w,this.rc.h);
    }
}

//图集
class Image{
    id = '';
    w = 0;
    h = 0 ;
    img = null;
    constructor(id,path,w,h){
        this.id = id;
        this.w = w;
        this.h = h;
        this.img = loadImage(path);
    }
}

class Atlas extends Image{
    constructor(id,path,w,h){
        super(id,path,w,h);
    }
}



//图片序列
class ImageSequence{
    images = [];

    static createFromAtlas(atlas,rc,num) {
        // rc : 图集矩形 , num: 图像数
        let ims = new ImageSequence();

        for(let n=0;n< num; n++){
            let w = rc.w / num;
            let _ = {x: rc.x+n*w , y: rc.y,w:w,h:rc.h};
            let img = new AtlasImage(atlas,n,_.x,_.y,_.w,_.h);
            img.index = n;
            ims.images.push(img);
        }
        return ims;
    }
    getN(pos){
        return this.images[pos];
    }

}

//动画
class Animation{
    id = '';
    images = [];
    ims = null;
    timer = null;
    x = 0;
    y = 0;
    constructor(ims,duration){
        // ims: 图像数组 , duration: 播放时间
        this.duration = duration;
        this.ims = ims;
        this.repeat = false;    // 循环播放
        this.interval = 0;      // 帧率
        this.cur_frame = 0 ;
        this.rewind = true; //
        this.played_num = 0;
        this.play_ended = false;
    }

    setRepeat(interval){
        this.repeat = true;
        this.interval = interval;
        this.timer  = new TimerDelayForClassFunc(this.interval,this.draw,this);
        return this;
    }

    setRewind(rewind){
        this.rewind = rewind;
        return true;
    }

    is_play_end(){
        return this.play_ended;
    }

    start(){
        this.played_num = 0;
        this.cur_frame = 0;
        this.play_ended = false;
        this.timer.reset();
        // this.stop();
    }

    stop(){
        this.play_ended = true;
    }

    run(){
        if(this.play_ended == true ){
            return;
        }
        this.timer.run();

    }

    draw(){
        if( this.play_ended == true){
            return;
        }
        if( this.cur_frame >= this.images.length){
            //一轮播放完毕
            if(  this.repeat == false){
                this.play_ended = true;
                return;
            }

            if( this.rewind != true) { // 重复并且倒置图片序列 (  0-N , N-0)
                this.images = this.images.reverse();
            }
            this.cur_frame = 0;
        }else{
            this.cur_frame++;
        }

        let img = this.images[this.cur_frame];
        push();
        imageMode(CENTER);
        image(img,this.x ,this.y,img.w,img.h,img.x,img.y,img.w,img.h); // AtlasImage()
        pop();


    }


    move(x,y){
        this.x = x;
        this.y = y;
    }

}

