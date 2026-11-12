let circ = {
    x: 100,
    y:100,
    radius:50,
    r:200,
    g: 100,
    b:0
}

function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0);

    fill(circ.r, circ.g, circ.b)

    ellipse(circ.x, circ.y, circ.radius)


}