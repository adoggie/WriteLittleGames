

class Stage{
    id = '';
    scene_list = [] ;
    current_scene = null;
    constructor(cfgs){
        this.cfgs = cfgs;
        this.id  = this.cfgs.id;
        this.init();
    }

    init(){
        let w = this.cfgs.size[0];
        let h = this.cfgs.size[1];
        h = window.innerHeight ;
        w = window.innerWidth;

        // 宽度大于高度，视为桌面浏览器，采用默认值
        if( window.innerWidth > window.innerHeight){
            w = this.cfgs.size[0];
        }

        this.cfgs.size[0] = w;
        this.cfgs.size[1] = h;
    }

    setup(){
        let w = this.cfgs.size[0];
        let h = this.cfgs.size[1];
        createCanvas(w,h);
        this.loadScenes();
        this.active();
    }

    active(){

        if( this.current_scene != null){
            this.current_scene.active();
        }

    }

    deactive(){
        this.current_scene.deactive();
    }

    loadScenes(){
        for(let n=0;n<this.cfgs.scenes.length;n++){
            let _ = this.cfgs.scenes[n];
            let scene = new _.cls(_);
            scene.stage = this;
            scene.init();
            this.scene_list.push( scene );

        }
       this.current_scene = this.scene_list[0];
    }

    getSize(){
        return {w:this.cfgs.size[0],h:this.cfgs.size[1]};
    }

    draw(){
        let scene = this.getScene();
        scene.draw();
        push();
        noFill();
        stroke('red');
        rect(1,1,this.getSize().w-2,this.getSize().h-2);
        pop();
    }

     //设置或返回当前场景
    activeScene(scene){
        if( scene == undefined){
            return this.current_scene;
        }

        if(this.current_scene != null){
            this.current_scene.deactive();
        }
        this.current_scene = scene;
        scene.active();
    }

    getScene(id){
        if(id==undefined){
            return this.current_scene;
        }

        for(let n=0;n<this.scene_list.length;n++){
            let _ = this.scene_list[n];
            if(_.id == id){
                return _;
            }
        }
        return null;
    }

}

class StageManager{
    stage_list = {};
    init(){
        let stage = new Stage(ConfigManager.instance.root.stage );
        this.stage_list['main'] = stage;
        return this;
    }

    get(id){
        return this.stage_list['main'];
    }
}

StageManager.instance = new StageManager();