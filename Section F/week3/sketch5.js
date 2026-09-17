let r = 0

let w, h;
let numRects = 20; 



   
function setup(){

    createCanvas(windowWidth,windowHeight)

    w = width/numRects

    h = height/numRects

    rectMode(CENTER)
    angleMode(DEGREES)

    background(0)
    fill(0)
    strokeWeight(2)
    stroke(255)

 

    // frameRate(2)
   
}

function draw(){

     background(0)

    //  translate(20,20)

    //   for(let x = 0; x<numRects; x++){
        
    //     push()
    //     translate( w*x , 0)
    //     rect(0,0,w/2,100);

    //     pop()

    // }

     //  translate(20,20)

    // for(let x = 0; x<numRects; x++){

    //     for(let y = 0; y<numRects; y++){
    //         push()
    //         translate( w * x , h * y)
    //         rotate(r)
    //         rect(0,0,10 + y*2,h/2);
    //         pop()

    //     }
    // }

    // translate(w/2, h/2)

    //   for(let x = 0; x<numRects; x++){

    //     for(let y = 0; y<numRects; y++){

          
       

    //     for(let i = 0; i<5; i++){

    //         push()
    //         translate( w * x , h * y)
    //         rotate(r)
    //         rect(0,0,w-20*i,h-20*i);
    //         pop()
           

    //     }
    // }
    // }



     translate(w/2, h/2)

      for(let x = 0; x<numRects; x++){

        for(let y = 0; y<numRects; y++){

            let d = dist(mouseX, mouseY,w*x,y*h)

            d = map(d,0,1000,1,0);
            d = constrain(d,0,1);

                push()
                translate(w * x , h * y)
                rotate(r*d)
                rect(0,0,w*d,h*d);
                pop()
          
        }
    }


    r++


}