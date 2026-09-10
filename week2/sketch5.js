
let col, col1, col2

function setup(){
    
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER);

    col1 = color(0,200,255);
    col2 = color(255,100,0);
    background(0)
    noStroke();

}
function draw(){

    let val = map(mouseY,0,height,0,1)
    
    col = lerpColor(col1, col2,val)
    fill(col)

    rect(width/2, mouseY, width , 40);
    
    col = lerpColor(col2, col1,val)
    fill(col)

    rect(width/2, mouseY, width/4 , 40)
}