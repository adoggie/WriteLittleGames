



class ConfigManager{
    root = {};

    static findItemByKey(key,value,array){
        let r = null;
        for(let n=0;n< array.length;n++){
            let _ = array[n];
            if(_[key] == value ){
                r = _;
                break;
            }
        }
        return r;
    }
}

ConfigManager.instance = new ConfigManager();


Constants ={
    TURN_NONE : 0,
    TURN_LEFT : 1,
    TURN_RIGHT : 2
};
/// p5js native api ///
// var resourceManager = null;
// var img = null;


