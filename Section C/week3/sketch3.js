

function setup(){
    createCanvas(windowWidth,windowHeight)
    
    rectMode(CENTER)
    angleMode(DEGREES)
    noFill()
    stroke(255)

     frameRate(1)
  
}


function draw(){

    background(0);

  
     for(let i = 0; i<2000; i++){
        rect(random(width), random(height),80);
     }
}
