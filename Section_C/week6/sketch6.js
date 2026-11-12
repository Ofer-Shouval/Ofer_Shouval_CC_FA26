// let circ = {
//     x: 100,
//     y:100,
//     radius:50,
//     r:200,
//     g: 100,
//     b:0
// }

let flowers = []


function setup(){
    createCanvas(windowWidth,windowHeight)
    background(0);

    angleMode(DEGREES)

    // fill(circ.r, circ.g, circ.b)

    // ellipse(circ.x, circ.y, circ.radius)

}



let f

function draw(){

 background(0)

 for(let f = 0; f<flowers.length; f++){
    flowers[f].move()
    flowers[f].display()
 }


}


class Flower{

    constructor(x, y){
        this.x = x
        this.y = y
        this.numPetals = random(3,12)
        this.centerCol = color(random(255),random(255),random(255))
        this.centerDiameter = random(40,50)
        this.petalCol = color(random(255),random(255),random(255))
        this.petalLength = random(50,200)
        this.petalWidth = random(30,60)
        this.xV = random(-3,3)
        this.yV = random(-3,3)
        this.rotations = 0
        this.rotateSpeed = random(-5,5)
    }

    move(){

        this.x += this.xV
        this.y += this.yV
        this.rotations += this.rotateSpeed

    }

   display(){
        
    push()
        translate(this.x, this.y)
        rotate(this.rotations)
      push()

        for(let i = 0 ; i< this.numPetals; i++){
            fill(this.petalCol)
          
            rotate((360/this.numPetals)*i)
            ellipse(this.petalLength/2,0, this.petalLength, this.petalWidth)
            
        }
        pop()
        fill(this.centerCol)

        ellipse(0,0, this.centerDiameter)

        pop()

    }
}

let counter =0
function mouseDragged(){

    flowers[counter] = new Flower(mouseX, mouseY)
    
    print(flowers)

    counter++
    
}