
let numRows = 15
let numCols = 15
let w;
let h; 

function setup(){
    createCanvas(windowWidth,windowHeight)
    
    w = width/numCols
    h = height/numRows

    background(0)


    colorMode(HSB)
    
    rectMode(CENTER)
    angleMode(DEGREES)
    // fill(0)
    noFill()
    stroke(255)

    
    frameRate(1)
  
}


function draw(){

    background(0)

    // numCols = mouseX/20
    // numRows = mouseY/20

    // w = width/numCols
    // h = height/numRows

    translate(w/2,h/2)

    let count =0 
    for(let x = 0; x<numCols; x++){

        for(let y = 0; y<numRows; y++){
            push()
            
            translate(x*w, y*h)

            for(let i =0; i<y+1;i++){
               
            rotate(2*random(-y,y))
            rect(0+random(-10,10),0 +random(-10,10),4+y*3, 4+y*3)

            }

             pop()
            //  rotate(y*mouseY/10)
             
            

        }
    } 
}
