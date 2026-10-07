

let xLoc = []
let yLoc = []
let numSegments = 100

let rows = 15
let cols = 15
let boxes = []

let layer1 
let layer2 

let onOff = 0
let num =1 


function setup(){
    
    createCanvas(windowWidth, windowHeight)

    for(let i = 0; i< numSegments; i++){
        xLoc[i] = width/2
        yLoc[i] = height/2
    }

    let index = 0 

    for(let x = 0; x<cols; x++){
        for(let y = 0; y<rows; y++){


            boxes[index] = 0


            index++
        }
    }

    layer1 = createGraphics(width, height);
    layer2 = createGraphics(width, height);
}

let counter = 0 


function draw(){

    background(0)

    //worm
    layer1.clear()
    layer1.stroke(255)
    layer1.fill(0)

    xLoc[numSegments -1] = width * noise(counter)
    yLoc[numSegments -1] = height * noise(counter+10)

    for(let i = 0; i< numSegments-1; i++){
        xLoc[i] = xLoc[i+1]
        yLoc[i] = yLoc[i+1]

        let diameter = 200*sin(map(i, 0, numSegments-1, 0,PI))
        
        let r = diameter
        let g = 200 - diameter

        let b = 200* cos(map(i, 0, numSegments-1, 0,PI))

        // let b =
        layer1.stroke(r,g,b)

        layer1.ellipse(xLoc[i], yLoc[i], diameter)
    }





// grid

    let index = 0 
    // translate(20,20)

    for(let x = 0; x< cols; x++){
        for(let y = 0; y<rows; y++){
           {
            layer2.stroke(255)
            layer2.strokeWeight(0.01)
            layer2.fill(0,0)

            if( width * noise(counter) > x*(width/cols) && 
                width * noise(counter) < (x+1)*(width/cols) && 
                height * noise(counter+10)> y*(height/rows) && 
                height * noise(counter+10)< (y+1)*(height/rows))
                {
                    boxes[index] = 255
                    
                    
                }

             
            
             layer2.fill(boxes[index], random(10), random(10), floor(boxes[index]))
             layer2.rect(x*(width/cols), y*(height/rows), width/cols, height/rows)

            
             let n = index
            //  text(n, x*(width/cols), y*(height/rows))

             boxes[index] *= 0.99
             index++

            }
        }

    }

    // this code switches betwee one or the other ˇˇˇ

    // if(onOff == 0){

    //     image(layer1,0,0,width, height)
    // }
    // else{
    //     
// }
    
   
    image(layer1,0,0,width, height)
    image(layer2,0,0,width, height)

     counter+=0.01
}


function mousePressed(){

    onOff = num%2
    num++

    print(onOff)

}