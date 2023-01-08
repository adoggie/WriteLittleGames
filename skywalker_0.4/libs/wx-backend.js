

export class Sound{
    constructor(cfgs){
        this.cfgs = cfgs;
        // this.res = loadSound(cfgs['path']);
        this.res = new Audio();
        this.res.src = cfgs['path'];
        this.setLoop(true);
    }

    play(){
        this.res.play();
        return this;
    }

    setLoop(loop){
        this.res.loop = loop;
        return this;
    }

    pause(){

    }

    stop(){
    }

}

export function getScreenSize(){
    let sysInfo = wx.getSystemInfoSync();
    let windowWidth = sysInfo.windowWidth;
    let windowHeight = sysInfo.windowHeight;
    return {w:windowWidth,h:windowHeight};
}

