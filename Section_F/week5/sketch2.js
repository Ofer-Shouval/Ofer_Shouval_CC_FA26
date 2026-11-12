
let rows = 50
let cols = 50
let boxes = []


function setup(){
    createCanvas(windowWidth, windowHeight)

    let index = 0 

    for(let x = 0; x<cols; x++){
        for(let y = 0; y<rows; y++){
            boxes[index] = 0
            index++
        }
    }
    // print(boxes)
    strokeWeight(0.1)
}
function draw(){
    background(0)

    let index = 0 

    for(let x = 0; x< cols; x++){
        for(let y = 0; y<rows; y++){
           {
            stroke(255)
            fill(0)

           
            if( mouseX > x*(width/cols) && 
                mouseX < (x+1)*(width/cols) && 
                mouseY > y*(height/rows) && 
                mouseY < (y+1)*(height/rows))
                {
                    boxes[index] = 255
                }

            
            
             fill(boxes[index], 0, 0)
             rect(x*(width/cols), y*(height/rows), width/cols, height/rows)
            
             boxes[index] *= 0.99
             index++

            }



        }

    }

}