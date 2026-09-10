
let y = 0;
function setup(){
    createCanvas(windowWidth,windowHeight)
    rectMode(CENTER);
    strokeWeight(5);
    // background(0);
}
function draw(){

    background(0,100,255,50);
    stroke(100,200,0);
    fill(0,255,200)
    rect(mouseX,mouseY,100,100);

    stroke(200,100,0)
    fill(200,200,0)
    rect(mouseY,mouseX,100,100);

    // y++; 
    // print(y)
}