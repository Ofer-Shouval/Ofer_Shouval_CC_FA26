



let numCols = 8
let numRows = 8
let vid


function preload(){
  vid = createVideo('clip.mov')  

  //video dimensions 450 x 338
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  // imageMode(CENTER)
  
  vid = await createVideo('clip.mov') 

  // vid.loop()
  // vid.volume(0)
  vid.hide()
  vid.loop()
}


let x=0, y=0

function draw() {
  // reset the blend mode first, otherwise EXCLUSION from the last frame
  // stops the black background from covering anything
  blendMode(BLEND)
  background(0)
  colorMode(HSB)

  if (keyIsPressed && frameCount % 5 === 0) {
    // '=' is the same key as '+' without shift
    if (key === '+' || key === '=') {
      numCols++
      numRows++
    }

    if (key === '-' || key === '_') {
      numCols = max(1, numCols - 1)
      numRows = max(1, numRows - 1)
    }
  }


  translate(5,5)

  blendMode(BLEND)
  for( let x = 0; x < numCols; x++){
    for( let y = 0; y< numRows; y++){
      image(vid,x*width/numCols,y* height/numCols, width/numCols - 5,height/numCols-5)
      //  image(vid,x*width/numCols +50,y* height/numCols +50, width/numCols,height/numCols)


    }

  }

  blendMode(EXCLUSION)

  fill(frameCount,0,0)

  
    // image(vid,mouseX,mouseY, 450, 380)


    
x+=3
y+=3

if(y>height+50){
  y=-50
}

if(y<-50){
  y=-height+50
}

if(x>width+50){
  x=-50
}

if(x<-50){
  x=-width+50
}

// ellipse(x,y,100+x)

// push()

// translate(width/2, height/2)

// for(let i = 0; i<10; i++){
//   rotate(frameCount*0.01)
//     ellipse(0,0,width/(i+1),height/(i+1))
// }

  
  
// pop()
  

  // only the second video blends
  

  // image(vid,0,100)
  // filter(THRESHOLD)
  

  
}


function keyPressed() {
  // press f to go in and out of fullscreen
  if (key === 'f') {
    fullscreen(!fullscreen())
  }
}

// make the canvas match the new window size (e.g. after going fullscreen)
function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}
