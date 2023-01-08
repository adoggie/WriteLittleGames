class Bird{
  constructor(x,y,img1,img2,img3,img4){
    this.x = x;
    this.y = y;
    this.img1 = img1;
    this.img2 = img2;
    this.img3 = img3;
    this.img4 = img4;
    this.imgs = [];
    this.imgs.push(this.img1);
    this.imgs.push(this.img2);
    this.imgs.push(this.img3);
    this.imgs.push(this.img4);
    this.timer = 0;
    this.index = 0;
  }
  
  display(){
    let img_idx = this.index % this.imgs.length ;
    this.timer += deltaTime/1000;
    if( this.timer > 0.1 ){
      this.index+=1;
      this.timer = 0;
    }
    image(this.imgs[img_idx],this.x,this.y);
    
    
//     for(let i = 0;i<this.imgs.length;i++){
//       this.img = this.imgs[i]
//       this.timer+=deltaTime/1000;
//       if(this.timer>0.1){
//         if(i == 0){
//           this.img = this.img1;
//         }
//         if(i == 1){
//           this.img = this.img2;
//         }
//         if(i == 2){
//           this.img = this.img3;
//         }
//         if(i > 2){
//           i = 0;
//         }
//         image(this.img,this.x,this.y);
//         this.timer = 0;
//       }
      
//     }
    
  }
  move(){
    this.x+=2;
  }
  
}