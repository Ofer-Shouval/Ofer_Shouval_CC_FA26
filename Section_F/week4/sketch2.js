let r = 0

let w, h;
let numRects = 5; 

p5.disableFriendlyErrors = true; 
let bDoExportSvg = false; 

   
function setup(){

    createCanvas(400,400)

    w = width/numRects
    h = height/numRects

    rectMode(CENTER)
    angleMode(DEGREES)

    background(255)
    //noFill()
    strokeWeight(1)
    stroke(0)

   
}

function draw(){

     //background(245)

if (bDoExportSvg){
    // Begin exporting, if requested
    beginRecordSvg(this, "plotSvg_hello_animating.svg");
  }


  rect(mouseX, mouseY, 50,50)
//      translate(w/2, h/2)

//       for(let x = 0; x<numRects; x++){
        
//         for(let y = 0; y<numRects; y++){

//             let d = dist(mouseX, mouseY,w*x,y*h)

//             d = map(d,0,1000,1,0);
//             d = constrain(d,0,1);

//                 push()
//                 translate(w * x , h * y)
//                 rotate(r*d)
//                 rect(0,0,w*d,h*d);
//                 pop()
          
//         }
//     }
//     r++

//     if (bDoExportSvg){
//     // End exporting, if doing so
//     endRecordSvg();
//     bDoExportSvg = false;
//   }


}

function keyPressed(){
  if (key == 's'){
    // Initiate SVG exporting
    bDoExportSvg = true; 
  }
}