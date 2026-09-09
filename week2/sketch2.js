
let y = 0;
let x;
function setup(){
    createCanvas(windowWidth,windowHeight)

    x = width/2
   //rectMode(CENTER);
    strokeWeight(5);
    // background(0);
}
function draw(){

    background(0,100,255,50);
    stroke(100,200,0);
    fill(200,200,0)

    ellipse(x,y,100,100);

    // y=y+10; 
    
    y+=10

    if(y>height+200){
        y = -200;
        x = random(width)
    }
    print(y)
}