
let y = 0;
let r = 0

function setup(){
    createCanvas(windowWidth,windowHeight)
    
    rectMode(CENTER)
    angleMode(DEGREES)

    stroke(255)
    strokeWeight(2)
    noFill()
   
}
function draw(){

    background(0);


    push();
    translate(3*width/4, height/2)
    rotate(r)
    scale(0.5)

    line(0,0, 200,0)
    rect(0,0,50,50)

    translate(200,0)
    rotate(r)
    scale(1.5)
    rect(0,0,50,50)
    line(0,0, 200,0)
     
    translate(200,0)
    rotate(r)
    rect(0,0,50,50)
    line(0,0, 200,0)

    translate(200,0)
    rotate(r)
    rect(0,0,50,50)
    pop()

      
    push();
    translate(width/4, height/2)
    rotate(-r)
    scale(0.5)

    line(0,0, 200,0)
    rect(0,0,50,50)

    translate(200,0)
    rotate(r)
    scale(1.5)
    rect(0,0,50,50)
    line(0,0, 200,0)
     
    translate(200,0)
    rotate(r)
    rect(0,0,50,50)
    line(0,0, 200,0)

    translate(200,0)
    rotate(r)
    rect(0,0,50,50)
    pop()


  




   


    r++
  
}
