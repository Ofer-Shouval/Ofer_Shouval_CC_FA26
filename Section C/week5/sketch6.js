
let xLoc = []
let yLoc = []
let numSegments = 250

let layer1 

let rows = 10
let cols = 10
let boxes = []

function setup(){

    createCanvas(windowWidth, windowHeight)

    layer1 = createGraphics(width, height)

    for(let i  =0; i< numSegments; i++){
        xLoc[i] = width/2
        yLoc[i] = height/2
    }
    // print(xLoc, yLoc)


    let index = 0

    for(let x = 0; x<cols; x++){
        for(let y =0; y< rows; y++)
        {
            boxes[index] = 0
            index++
        }
    }
    // print(boxes)
   
}

let counter = 0

function draw(){
    background(50)

   
     if(count%2 == 0){
        drawGrid()
     }

     else{
         drawWorm()
     }
    
   



}





function drawWorm(){
    layer1.clear()
    layer1.stroke(255)
    layer1.fill(0)

    let x = width * noise(counter +10)
    let y = height * noise(counter)

    print(x);

    xLoc[numSegments - 1] =  x
    yLoc[numSegments - 1] =  y

    //   xLoc[numSegments - 1] =  random(width)
    // yLoc[numSegments - 1] =  random(height)

    for(let i  =0; i< numSegments + 1; i++){
        xLoc[i] = xLoc[i+1]
        yLoc[i] = yLoc[i+1]

        // let diameter = i

        let diameter = 200*sin(map(i,0,numSegments,0,PI))
        let r = 255*sin(map(i,0,numSegments,0,PI))

        let g = 255-r


        layer1.stroke(r,g,0)
        
        layer1.ellipse(xLoc[i], yLoc[i], diameter)
    
    }


    image(layer1, 0,0)

    counter += 0.01
}


function drawGrid(){
    background(0)
    let index = 0 

    for(let x = 0; x<cols; x++){
        for(let y =0; y< rows; y++)
        {
            stroke(255)
            // fill(0)

            if(mouseX > x*(width/cols) && mouseX<(x+1)*(width/cols) && mouseY > y *(height/rows) && mouseY < (y+1)*(height/rows))
            {
                boxes[index] =random(255)
    
            }

            fill(0,boxes[index],0)
            rect(x*(width/cols), y*(height/rows), width/cols, height/rows)

            index++

        }

    }

}


let count =0
function mousePressed(){
    count++
}

// function setup(){

//     createCanvas(windowWidth, windowHeight)



// }

// function draw(){


// }

