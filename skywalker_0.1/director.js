

class Director{

    init(){

    }

    setup(){
        ControllPad.instance  = new ControllPad(ConfigManager.instance.root.controll_pad);
    }

    getStage(){
        return StageManager.instance.get();
    }

}

Director.instance = new Director();
