
let xLoc = []
let yLoc = []
let numSegments = 250
function setup(){

    createCanvas(windowWidth, windowHeight)

    for(let i  =0; i< numSegments; i++){
        xLoc[i] = width/2
        yLoc[i] = height/2
    }
    print(xLoc, yLoc)
   
}

let counter = 0

function draw(){
    background(0)
    stroke(255)
    fill(0)

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


        stroke(r,g,0)
        
        ellipse(xLoc[i], yLoc[i], diameter)
    
    }



    counter += 0.01


}

