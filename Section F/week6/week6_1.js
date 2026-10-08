// Object Oriented Programming 

// let flower = {
//     x: 500,
//     y:500,
//     numPetals:6,
//     petalWidth:40,
//     petalLength:100,
//     centerDiameter:50
// }

let f 
let flowers = []

function setup(){

    createCanvas(windowWidth, windowHeight)
    background(0)
    angleMode(DEGREES)

    for(let i = 0; i< 50; i++){
    flowers.push(new Flower(random(width), random(height)))

    }  


    // translate(flower.x, flower.y)
    // for(let r = 0; r < flower.numPetals; r++){
    //     push()
    //     rotate((360/flower.numPetals)*r)
    //      translate(flower.petalLength/2,0)
    //     ellipse(0,0,flower.petalLength,flower.petalWidth )

    //     pop()
    // }

    // ellipse(0,0,flower.centerDiameter)

   
}

function draw(){
    background(0)
    for(let i =0; i< flowers.length; i++){

        let d = map(mouseX,0,width,-5,5)
        flowers[i].move(d)
        flowers[i].display()
    }


}

function mouseDragged(){
    // f = new Flower(mouseX, mouseY)
    // f.display()

    flowers.push(new Flower(mouseX, mouseY))
   
}


class Flower{
    constructor(x, y){
        this.x = x
        this.y = y
        this.numPetals = random(3,16)
        this.petalWidth = random(20,40)
        this.petalLength = random(30, 80)
        this.centerDiameter = random(30,40)
        this.centerCol = color(random(255),random(255),random(255))
        this.petalCol = color(random(255),random(255),random(255))
        this.xV = random(-5,5)
        this.yV = random(-5,5)
        this.rotations = 0
        this.rV = random(-5,5)
    }

    move(d){

        this.x+=this.xV
        this.y+=this.yV
        this.rotations += this.rV*d
    }
    display(){
        push()
        translate(this.x, this.y)
        rotate(this.rotations)
        fill(this.petalCol)
        for(let r = 0; r < this.numPetals; r++){
            push()
            
            rotate((360/this.numPetals)*r)
            translate(this.petalLength/2,0)
            ellipse(0,0,this.petalLength,this.petalWidth )
            pop()
        }
         fill(this.centerCol)
        ellipse(0,0,this.centerDiameter)

        pop()

     }

}