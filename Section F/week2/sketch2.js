function setup(){
    createCanvas(windowWidth,windowHeight)
    background(100)

    fill(100,0,0)
    // noStroke()
    strokeWeight(3)
    stroke(200,100,0)
    

}
function draw(){


}

function mouseDragged(){
        
    line(pmouseX,pmouseY,mouseX, mouseY)
   // background(100);
}
function mousePressed(){
        //    background(100);
}
function keyPressed() {
             background(100);
} 