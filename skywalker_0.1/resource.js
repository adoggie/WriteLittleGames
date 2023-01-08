
//资源管理器
class ResourceManager{
    atlas_list = {}; // 图集
    cfgs = {};
    sound_list = {};
    ims_list = {};  //图像序列
    animation_list = {}; // 动画

    constructor(){
        this.cfgs = game_configs;
    }


    addImage(img){
        this.images[img.id] = img ;
    }

    /// 返回指定id的图集
    getAtlas(id){
        return this.atlas_list[id];
    }

    init(){
        this.init_images(this.cfgs);
        this.init_ims_list();
        this.init_animation_list();

        this.init_sounds(this.cfgs);
    }

    setup(){

    }

    //图像序列
    init_ims_list(){
        for(let n=0;n<this.cfgs.image_seq_list.length;n++) {
            let _ = this.cfgs.image_seq_list[n];
            let atlas = this.getAtlas(_.atlas);
            let rc = {x: _.x, y: _.y, w: _.w, h: _.h};
            let ims = ImageSequence.createFromAtlas(_.id, atlas, rc, _.num);
            this.ims_list[_.id] = ims;
        }

    }

    //动画序列
    init_animation_list(){
        for(let n=0;n<this.cfgs.animation_list.length;n++) {
            let _ = this.cfgs.animation_list[n];
            let ims = this.getImageSequence(_.ims);
            let rc = {x: _.x, y: _.y, w: _.w, h: _.h};


            let sub_ims = ims.createSubSequence(_.start,_.end);
            if(_.reverse == true){
                sub_ims.reverse();
            }


            let ani =new Animation(sub_ims)
            this.animation_list[_.id] = ani;
            ani.setRepeat(_.repeat,_.interval);
            ani.setRewind(_.rewind);
        }
    }

    getImageSequence(id){
        return this.ims_list[id];
    }

    getAnimation(id){
        return this.animation_list[id];
    }

    getSound(id){
        return this.sound_list[id];
    }

    //获得图集
    getAtlas(id){
        return this.atlas_list[id];
    }

    init_images(cfgs){
        //加载图像资源

        for(let n=0;n<cfgs.atlas.length;n++){
            let _ = cfgs.atlas[n];
            let img = loadImage(_.path);
            let atlas = new Atlas(_.id,_.path,_.w,_.h);
            atlas.img = img;
            this.atlas_list[_.id] = atlas;
        }
    }

    init_sounds(cfgs) {
        soundFormats('mp3', 'ogg');
        for (let n = 0; n < cfgs.sounds.length; n++) {
            let _ = cfgs.sounds[n];
            // let res = loadSound(_['path']);
            let snd = new Sound(_);
            this.sound_list[_['id']] = snd;
        }
    }

}

class Sound{
    res = null;
    constructor(cfgs){
        this.cfgs = cfgs;
        this.res = loadSound(cfgs['path']);
    }

    play(){
        this.res.play();
        return this;
    }

    setLoop(loop){
        this.res.setLoop(loop);
        return this;
    }

    pause(){

    }

    stop(){
    }

}


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
        image( this.atlas.img,destx,desty,this.w,this.h,
            this.x,this.y,this.w,this.h);
    }

    getImage(){
        return this.atlas.img;
    }

    getSize(){
        return {w:this.w,h:this.h};
    }
}



//图集
// js 自带 Image 类型，之前 冲突了
class xImage{
    id = '';
    w = 0;
    h = 0 ;
    img = null;
    constructor(id,path,w,h){
        this.id = id;
        this.w = w;
        this.h = h;
        this.img = null;
    }

    getSize(){
        return {w: this.img.width,h: this.img.height};
    }
}

class Atlas extends xImage{
    constructor(id,path,w,h){
        super(id,path,w,h);
    }
}





//图片序列
class ImageSequence{
    images = [];
    id = '';

    static createFromAtlas(id,atlas,rc,num) {
        // rc : 图集矩形 , num: 图像数
        let ims = new ImageSequence();
        ims.id = id;
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

    createSubSequence(start,end){
        let ims = new ImageSequence();
        ims.images = this.images.slice(start,end+1);
        return ims;
    }

    reverse(){
        this.images = this.images.reverse();
        return this;
    }
}

//动画
class Animation{
    id = '';
    images = [];
    // ims = null;
    timer = null;
    x = 0;
    y = 0;
    constructor(ims,duration){
        // ims: 图像数组 , duration: 播放时间
        this.duration = duration;
        // this.ims = ims;
        this.images = ims.images;
        this.repeat = false;    // 循环播放
        this.interval = 0;      // 帧率
        this.cur_frame = 0 ;
        this.rewind = true; //
        this.played_num = 0;
        this.play_ended = false;

        this.last_img = null;
    }

    setRepeat(repeat,interval){ // bool, float
        this.repeat = repeat;
        this.interval = interval;
        this.timer  = new TimerDelayForClassFunc(this.interval,this.draw,this);
        return this;
    }

    setRewind(rewind){ // bool
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
        this.doDraw();
        if(this.play_ended == true ){

            return;
        }
        this.timer.run();

    }

    doDraw(){
        let img = this.last_img;
        if(img == null){
            return;
        }
        push();
        imageMode(CENTER);
        image(img.getImage(),this.x ,this.y,img.w,img.h,img.x,img.y,img.w,img.h); // AtlasImage()
        pop();
    }

    draw(){
        // print(this.cur_frame);
        let img = null;
        if( this.cur_frame >= this.images.length){
            img = this.images[this.images.length-1];
        }else{
            img = this.images[this.cur_frame];
        }
        this.last_img = img;

        this.doDraw();

        if( this.play_ended == true){
            return;
        }
        if( this.cur_frame >= this.images.length){
            //一轮播放完毕
            this.cur_frame = this.images.length -1;
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

    }


    move(x,y){
        this.x = x;
        this.y = y;
    }

}


