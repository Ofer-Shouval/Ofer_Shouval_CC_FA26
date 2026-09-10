let r =0, g =0, b = 0;

function setup(){
    createCanvas(windowWidth, windowHeight)
    rectMode(CENTER);
    // colorMode(HSB);


    background(0)
    noStroke();

}
function draw(){

    r = map(mouseY,0, height,150,255)
    g = map(mouseY, 0, height,200,0)
    
    fill(r,g,b)
    rect(width/2, mouseY, width , 40);
}