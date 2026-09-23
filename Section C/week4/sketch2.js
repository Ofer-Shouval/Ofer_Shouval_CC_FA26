
let rows = 20
let cols = 20

function setup(){
    createCanvas(400,400)
    noFill();
    rectMode(CENTER)
}

let i = 0

function draw(){

    translate(0.5*width/cols,0.5* height/rows)
    background(255)


    for(let x = 0; x<width/cols; x++){
        for(let y = 0; y<height/rows; y++){

            let n = noise(x*10, y*10, i)
            fill(n)
            rect( x * (width/cols), y * (height/rows), n * width/cols, n * height/rows)

        }

    }

    i +=0.01
   
}
