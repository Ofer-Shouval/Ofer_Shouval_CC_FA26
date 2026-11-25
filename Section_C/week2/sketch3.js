
let y = 0;
let w = 100, h=100;
let x;
let ySpeed = 10;
let xSpeed = 7;

function setup(){
    createCanvas(windowWidth,windowHeight)

    y = h/2
    x = width/2
   //rectMode(CENTER);
    strokeWeight(5);
    // background(0);
}
function draw(){

    background(0,100,255,50);
    stroke(100,200,0);
    fill(200,200,0)

    ellipse(x,y,w,h);

    // y=y+10; 
    
    if(y>height - h/2){
         //y = -200;
         ySpeed = -ySpeed; // x = random(width)
     }
     if(y < h/2){
        ySpeed = -ySpeed
     }

     if(x>width - w/2){
         //y = -200;
         xSpeed = -xSpeed; // x = random(width)
     }
     if(x < w/2){
        xSpeed = -xSpeed
     }
    
     y += ySpeed
     x += xSpeed

    // print(y)
}