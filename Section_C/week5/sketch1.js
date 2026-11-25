let rows = 10
let cols = 10


function setup(){

    createCanvas(windowWidth, windowHeight)

}

function draw(){
    background(0)

    for(let x = 0; x<cols; x++){
        for(let y =0; y< rows; y++)
        {
            stroke(255)
            fill(0)
        
            if(mouseX > x*(width/cols) && mouseX<(x+1)*(width/cols) && mouseY > y *(height/rows) && mouseY < (y+1)*(height/rows))
            {
                fill(255,0,0)
            }

         rect(x*(width/cols), y*(height/rows), width/cols, height/rows)

        }

    }


}