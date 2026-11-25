

function setup(){
    createCanvas(600,600)
    background(0)
    
    rectMode(CENTER)
    angleMode(DEGREES)
    fill(0)
    stroke(255)

    // line of circles
    
    translate(30,30)
    // for(let x = 0; x<10; x++){
    //     ellipse(60*x, height/2, 50,50)
    // }
   
    //  for(let x = 0; x<600; x += 60){
    //     ellipse(x, height/2, 50,50)
    // }

    for(let x = 0; x<10; x++){

        for(let y = 0; y<10; y++){
            ellipse(x*60, y*60, random(60))
        }

    }

  
}


function draw(){

     
}
