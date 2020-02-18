var x=0; 
var y=0; 
var targetX=0; 
var targetY=0; 
var easing=0.1; 
function setup() {  
 createCanvas(400, 400); 
 x=mouseX; 
 y=mouseY; 
}  
 
function draw() { 
 background(220); 
 targetX=mouseX; 
 targetY=mouseY; 
 x+=(targetX-x)*easing; 
 y+=(targetY-y)*easing; 
 ellipse(x,y,20,20); 
} 