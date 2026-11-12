
let vertices = 10


function setup(){
    createCanvas(400,400)
    noFill();
    rectMode(CENTER)
}



function draw(){

    // translate(0.5*width/cols,0.5* height/rows)
    background(255)

    // stroke(0)


    beginShape()

    for(let x = 0; x < width; x++ ){

       let y = cos(x/10) * 100

       vertex(x, 200+y)

        //y = cos(x/10) * 100

        //  vertex(x, 200+y)

    //    ellipse(x * (width/vertices), 200+y, 10,10)
    }

    endShape()

}
