


let numCols = 8
let numRows = 8
let vid

async function setup() {
  createCanvas(windowWidth, windowHeight);

   vid = await createVideo('clip.mov')  

  // imageMode(CENTER)

  // vid.loop()
  // vid.volume(0)
  vid.hide()
  vid.loop()
}



function draw() {
  background(0)

  
  translate(5,5)

  blendMode(BLEND)
  for( let x = 0; x < numCols; x++){
    for( let y = 0; y< numRows; y++){
      image(vid,x*width/numCols,y* height/numCols, width/numCols - 10,height/numCols-10)
      //  image(vid,x*width/numCols +50,y* height/numCols +50, width/numCols,height/numCols)


    }

  }

  blendMode(EXCLUSION)

  fill(sin(frameCount/100)*255, cos(frameCount/100)*255 ,255 - (cos(frameCount/100)*255))

    // image(vid,mouseX,mouseY, 450, 380)


  ellipse(mouseX, mouseY, sin(frameCount/100)*width)


  
  
}

