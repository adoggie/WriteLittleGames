

class Director{

    stages = [];
    scenes = [] ;
    active_stage = null;
    active_scene = null;

    init(){
        ResourceManager.instance.init();
    }

    setup(){
        ResourceManager.instance.init();
    }

    currentStage(id){

    }

    //设置或返回当前场景
    activeScene(scene){
        if( scene == undefined){
            return this.active_scene;
        }
        scene.deactive();
        if(this.active_scene != null){
            this.active();
        }
        this.active_scene = scene;
    }

}

Director.instance = new Director();
