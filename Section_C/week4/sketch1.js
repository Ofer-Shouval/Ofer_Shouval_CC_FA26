
function setup(){
    createCanvas(400,400)
    noFill();
}


let i = 0;
function draw(){

    background(255)

    // yPos = height/2 + noise(n)*200
        // yPos = height/2 + random(200)


    // ellipse(width/2, yPos, 20, 20)

    beginShape()

    for(let x = 0; x < 100; x++)
    {
        let xPos = x*4
        let yPos = height/2 + noise(x/100)*100

        let n = x%2 
        if(n == 0){
            // yPos = height/4 + random(-50,50)
            yPos = height/4 + 100 * noise(x/50 + i )

        }
        else{
            // yPos = 3*height/4 + random(-50, 50)

            yPos = height/4 - 100 * noise(x/50 + i)
        }
        vertex(xPos,yPos)

    }

    endShape()

    i-=0.01
}
