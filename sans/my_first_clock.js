class EriClock{
  constructor(x,y,clock_radius){
    this.now = new Date();
    
    this.draw_big_scale_v1 = createVector(0,-(clock_radius));
    this.draw_big_scale_v2 = createVector(0,-(clock_radius-10));

    this.draw_small_scale_v1 = createVector(0,-(clock_radius));
    this.draw_small_scale_v2 = createVector(0,-(clock_radius-2));

    
    this.r = clock_radius;
    this.x = x;
    this.y = y;
    angleMode(DEGREES);
  }

  show(){

    let now = new Date();
    let second = now.getSeconds();
    let minute = now.getMinutes();
    let hour = now.getHours()%12;
    let second_v = createVector(0,-(this.r-5));
    let minute_v= createVector(0,-(this.r-20));
    let hour_v = createVector(0,-(this.r-40));

    //外围大圆
    push();
    translate(this.x,this.y);
    noFill();
    stroke('white');
    strokeWeight(5);
    ellipse(0,0,this.r*2+8,this.r*2+8);

    //钟的圆心
    noStroke();
    fill('white');
    ellipse(0,0,10,10);


    //钟圆心处显示的具体时间
    fill(255);
    text('Now the time is:'+' '+hour+':'+minute+':'+second,0-this.r/2,0)

    //钟较大刻度
    for(var angle = 0;angle<360;angle+=30){
      stroke('white');

      //圆形刻度废稿↓
      //ellipse(cos(angle)*big_circle_size,sin(angle)*big_circle_size,5,5);
      
      strokeWeight(3);
      var rotated_big_v1 = p5.Vector.rotate(this.draw_big_scale_v1,angle); 
      var rotated_big_v2 = p5.Vector.rotate(this.draw_big_scale_v2,angle); 
      line(rotated_big_v1.x,rotated_big_v1.y,rotated_big_v2.x,rotated_big_v2.y); 

    }
      
      //钟较小刻度
    for(var angle = 0;angle<360;angle+=6){
      stroke('white');

      //圆形刻度废稿↓
      //ellipse(cos(angle)*big_circle_size,sin(angle)*big_circle_size,2,2);
        
      strokeWeight(2);
      let rotated_small_v1 = p5.Vector.rotate(this.draw_small_scale_v1,angle); 
      let rotated_small_v2 = p5.Vector.rotate(this.draw_small_scale_v2,angle); 
      line(rotated_small_v1.x,rotated_small_v1.y,rotated_small_v2.x,rotated_small_v2.y); 

    }

    let rotated_second_v = p5.Vector.rotate(second_v,second*6); 
    let rotated_minute_v = p5.Vector.rotate(minute_v,minute*6); 
    // let rotated_hour_v = p5.Vector.rotate(hour_v,hour*30+map(minute*6,0,360,0,30)); 
    let rotated_hour_v = p5.Vector.rotate(hour_v,hour*30+ map(minute,0,60,0,30)); 

    //绿色秒针
    stroke('green');
    strokeWeight(1.5);
    line(0,0,rotated_second_v.x,rotated_second_v.y);


    //黄色分针
    stroke('yellow');
    strokeWeight(3);
    line(0,0,rotated_minute_v.x,rotated_minute_v.y);

    //红色秒针
    stroke('red');
    strokeWeight(5);
    line(0,0,rotated_hour_v.x,rotated_hour_v.y);
    pop();
  }
}



