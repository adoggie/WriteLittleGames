// 延时执行
class TimerDelay{
  constructor(delay,callback,userdata){
    this.delay = delay;        //时间 mils
    this.callback = callback;   //回调函数
    this.userdata = userdata;
    this.timeEllapsed = 0 ;
  }
  
  run(){
    this.timeEllapsed += deltaTime/1000;
    if(this.timeEllapsed >= this.delay){
      this.callback(this.userdata);
      this.timeEllapsed = 0;
    }
  }
}
  