let r =0

   
function setup(){

    createCanvas(windowWidth,windowHeight)

    rectMode(CENTER)
    angleMode(DEGREES)

    
   
}

function draw(){

    

    background(0)
    noFill()
    strokeWeight(2)
    stroke(255)


    translate(-width/2+mouseX,0)
    push()

    translate(width/2+200,height/2)
    rotate(r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(r)
    rect(0,0, 50)

    pop()

    push()

    translate(width/2-200,height/2)
    rotate(-r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(-r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(-r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(-r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(-r)
    rect(0,0, 50)

    line(0,0,0,200)
    translate(0,200)
    rotate(-r)
    rect(0,0, 50)

    pop()

    push()
    translate(width/2,3*height/4,)
    rect(0,0, 400,height/2)
    
    rect(0,0,50,80)

    translate(0,-height/4 -75)
    rect(0,0,80, 150)

    fill(0)

    translate(0,-100)

    rect(0,0,150,100,10)

    pop()



    r++
}