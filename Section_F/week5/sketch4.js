

let xLoc = []
let yLoc = []
let numSegments = 100


function setup(){
    createCanvas(windowWidth, windowHeight)

    for(let i = 0; i< numSegments; i++){
        xLoc[i] = width/2
        yLoc[i] = height/2
    }

    print(xLoc, yLoc)


}
function draw(){
    background(0)
    stroke(255)
    fill(0)
    xLoc[numSegments -1] = mouseX
    yLoc[numSegments -1] = mouseY

    for(let i = 0; i< numSegments-1; i++){
        xLoc[i] = xLoc[i+1]
        yLoc[i] = yLoc[i+1]

        let diameter = 200*sin(map(i, 0, numSegments-1, 0,PI))
        
        let r = diameter
        let g = 200 - diameter

        let b = 200* cos(map(i, 0, numSegments-1, 0,PI))

        // let b =
        stroke(r,g,b)

        ellipse(xLoc[i], yLoc[i], diameter)
    }




}