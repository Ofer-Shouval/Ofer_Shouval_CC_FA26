// let circ = {
//     x: 100,
//     y:100,
//     radius:50,
//     r:200,
//     g: 100,
//     b:0
// }



function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0);

    // fill(circ.r, circ.g, circ.b)

    // ellipse(circ.x, circ.y, circ.radius)


}

function draw(){

  

}

class Obj{
    constructor(){
        this.x = mouseX
        this.y = mouseY
        this.col = color(random(255),random(255),random(255))
        this.width = random(50,200)
        this.height = random(50,200)
    }

    display(){
        fill(this.col)
        ellipse(this.x, this.y, this.width, this.height)
    }


}

function mousePressed(){
      let c = new Obj()
    // print(c)
    c.display()
}