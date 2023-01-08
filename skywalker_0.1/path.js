// 飞行路径

//飞行轨迹
class FlyPath{

}

//直线路径
class StraightPath{
    x = 0; // 开始位置
    y = 0;
    constructor(x,y,cfgs){
        this.x = x;
        this.y = y;
        this.cfgs = cfgs;

    }

    step(){
        this.x += this.cfgs.dx;
        this.y += this.cfgs.dy;
    }
}