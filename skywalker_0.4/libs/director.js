
import {ConfigManager,Constants} from "./config.js";
import {StageManager} from './stage.js'
import {ControllPad} from "./utils.js";

export class Director{

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
