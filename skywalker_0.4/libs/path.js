// 飞行路径

//飞行轨迹
import {StageManager} from "./stage.js";

class FlyPath{

}

//直线路径
export class StraightPath{
    constructor(x,y,cfgs){
        this.x = x;
        this.y = y;
        this.cfgs = cfgs;

    }

    step(){
        this.x += this.cfgs.dx;
        this.y += this.cfgs.dy;
        return [this.x,this.y,0];
    }

    current(){
        return [this.x,this.y,0];
    }

    draw(){
    }
}

//贝塞尔曲线飞行轨迹
export class BezierCurvePath{
    constructor(x,y,cfgs) {
        // cfgs: {x1,x2,x3,x4,y1,y2,y3,y4,steps}
        this.x = x;
        this.y = y;
        this.cfgs = cfgs;
        this.points = [];    // 轨迹点  [x,y,angle] 旋转角度
        this.init();
        this.pt_idx = 0;    // 当前飞行点
    }

    init(){
        let steps = this.cfgs.steps; // 曲线上取n个点
        this.x1 = width * random(this.cfgs.x1[0],this.cfgs.x1[1]);
        this.x2 = width * random(this.cfgs.x2[0],this.cfgs.x2[1]);
        this.x3 = width * random(this.cfgs.x3[0],this.cfgs.x3[1]);
        this.x4 = width * random(this.cfgs.x4[0],this.cfgs.x4[1]);

        this.y1 = height * random(this.cfgs.y1[0],this.cfgs.y1[1]);
        this.y2 = height * random(this.cfgs.y2[0],this.cfgs.y2[1]);
        this.y3 = height * random(this.cfgs.y3[0],this.cfgs.y3[1]);
        this.y4 = height * random(this.cfgs.y4[0],this.cfgs.y4[1]);

        for (let i = 0; i <= steps; i++) {
            let t = i / steps;
            let x = bezierPoint(this.x1,this.x2,this.x3,this.x4, t);
            let y = bezierPoint(this.y1,this.y2,this.y3,this.y4, t);
            this.points.push([x,y,0]);
            if( i==0 ){
                continue ;
            }
            let p1 = this.points[i-1];
            let p2 = this.points[i];
            let v1 = createVector(0,1);
            let v2 = createVector(p2[0] - p1[0],p2[1] - p1[1]);
            let angle = degrees(v1.angleBetween(v2)); // 旋转夹角
            p2[2] = angle; //
        }
    }
    // 返回下一个运动点
    step(){
        let pt;

        pt = this.points[this.pt_idx];

        if(this.pt_idx >= this.points.length-1){

        }else {
            this.pt_idx += 1;
        }

        return pt;
    }

    current(){
        let p = this.points[this.pt_idx];
        if(p == undefined){
            print(this.pt_idx);
        }
        return this.points[this.pt_idx];
    }

    draw(){
        if(this.cfgs.draw == true) {
            push();
            noFill();
            translate(0,0);
            rotate(0);
            stroke(this.cfgs.draw_color);
            strokeWeight(3);
            bezier(this.x1, this.y1,this.x2, this.y2,this.x3,this.y3, this.x4, this.y4);
            pop();
        }
    }
}

//导弹跟踪敌机的飞行轨迹
// 敌机移动，不停调整与敌机的运动方向，敌机如果消失，子弹定位到其他敌机

// 问题：
// 两发missile 定位同一个enemy
// 前一发干掉了enemy，后一发停在敌机消失的位置

export class MissileTracePath {
    constructor(x, y, cfgs) {
        // cfgs : { speed}
        this.x = x;
        this.y = y;
        this.cfgs = cfgs;
        this.points = [];    // 轨迹点  [x,y,angle] 旋转角度
        this.init();
        this.angle = 0;
        this.org_x = x;
        this.org_y = y;

        // this.fly_v = null; //飞行向量
        this.timer = 0;
        this.enemy_pos = [];
        this.unused = false; // 不在关联到敌机
    }

    init() {
        this.enemy = null; // 目标敌机
        this.fly_v = createVector(0,-1); //向上飞行向量
    }

    step(){
        if( this.enemy == null){
            if (this.unused == true ){
                let v = this.fly_v.mult(this.cfgs.speed);
                this.x+= v.x;
                this.y+= v.y;
                return this.current();
            }

            let scene = StageManager.instance.get().getScene();
            let targets = scene.getEnemiesInView(scene.getPlayer());
            if(  targets.length ==0 ){ // 没有敌机,子弹直接朝着原定方向飞离屏幕
                let v = this.fly_v.mult(this.cfgs.speed);
                this.x+= v.x;
                this.y+= v.y;
                // 在原有的方向上运行
            }else{
                this.enemy = targets[0];
                this.enemy_pos = [this.enemy.x,this.enemy.y]; // 可能要整数处理
            }
        }else{ //随着敌机的移动不停调整方向
            this.timer += deltaTime/1000;
            if(this.timer > 0.3){
                this.timer = 0;
                if( this.enemy.x == this.enemy_pos[0] && this.enemy.y == this.enemy_pos[1]){
                    this.enemy = null;
                    // 敌机消失，作废本次飞弹，让他沿着原来的方向飞出屏幕
                    this.unused = true;
                    return this.current();
                }
            }
            this.enemy_pos = [this.enemy.x,this.enemy.y];


            let be_v = createVector(this.enemy.x- this.x,this.enemy.y - this.y);
            be_v.normalize();
            this.fly_v = be_v ;

            be_v = be_v.mult(this.cfgs.speed);


            let v1 = createVector(0,1);
            let eb_v = createVector( this.x-this.enemy.x, this.y - this.enemy.y );

            this.angle = degrees(v1.angleBetween(eb_v));
            this.x+= be_v.x;
            this.y+= be_v.y;

        }
        return this.current();
    }

    current(){
        return [this.x,this.y,this.angle];
    }
}