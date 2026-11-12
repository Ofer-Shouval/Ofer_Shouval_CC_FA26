
let radius = 10
let sides = 100

p5.disableFriendlyErrors = true; // keep warnings quiet
let bDoExportSvg = false; 

function setup(){
    createCanvas(400,400)
    noFill();
    rectMode(CENTER)

    frameRate(10)
}


function draw(){


  if (bDoExportSvg){

    beginRecordSvg("myOutput.svg");

    } 

    translate(width/2,height/2)
    background(255)

    // stroke(0)
    beginShape()

    for(let i = 0; i < sides*5; i++ ){

        let x = map(i, 0,sides, 0, TWO_PI)
        x = sin(x)* radius +random(10) ;

        let y = map(i, 0,sides, 0, TWO_PI)
        y = cos(y)* radius + random(10);
        
        splineVertex(x, y)
        radius+=0.2
    }


    endShape()
    radius = 10

     if (bDoExportSvg){
    endRecordSvg();
    bDoExportSvg = false;
  }

    
  }


  function keyPressed(){
  if (key == 's'){ 
    bDoExportSvg = true; 
  }
}


