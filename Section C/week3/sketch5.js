

function setup(){
    createCanvas(600,600)
    background(0)

    colorMode(HSB)
    
    rectMode(CENTER)
    angleMode(DEGREES)
    // fill(0)
    noFill()
    stroke(255)

    // line of circles
    
   
    // for(let x = 0; x<10; x++){
    //     ellipse(60*x, height/2, 50,50)
    // }
   
    //  for(let x = 0; x<600; x += 60){
    //     ellipse(x, height/2, 50,50)
    // }

    // let count =0 
    // for(let x = 0; x<10; x++){

    //     for(let y = 0; y<10; y++){

    //         stroke(count, 100,100)
    //         rect(x*60, y*60, 5+ 3*y + 3*x)

    //         count++
    //     }

    // }



  
}


function draw(){

     translate(30,30)

    let count =0 
    for(let x = 0; x<10; x++){

        for(let y = 0; y<10; y++){


            for(let i = 0; i<6; i++){

                push()

                stroke(random(0,360), 100,100)
                translate(x*60,y*60);
                rect(0,0,60-i*10);

                pop()

            }

           


        }

    }

     
}
