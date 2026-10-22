
// let vid
// async function setup() {
//   createCanvas(windowWidth, windowHeight);
//   vid = await createVideo('clip.mov')  

//   print('loaded')
//   vid.loop()
//    vid.volume(0)
// }

// function draw() {

//   image(vid,0,0)
  
// }



// let vid
// let vidDuration

// function preload(){

//   vid = createVideo('clip.mov')  
// }

// function setup() {
//   createCanvas(windowWidth, windowHeight,WEBGL);
  

//   imageMode(CENTER)

//   // vid.loop()
//   vid.volume(0)
//   vid.hide()
//   vid.loop()
// }



// function draw() {

//   // the video's length is NaN until it finishes loading, so keep checking
//   if (!vidDuration) {
//     vidDuration = vid.duration()
//   }

//   if (vidDuration) {
//     vid.time(map(mouseX, 0,width,0,vidDuration))
//   }


//   background(0)
//   image(vid,0,0)
//   image(vid,0,100)

//   blendMode(SUBTRACT)
//   // filter(THRESHOLD)
  
  
// }


let numCols = 8
let numRows = 8


function preload(){
  vid = createVideo('clip.mov')  

  //video dimensions 450 x 338
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // imageMode(CENTER)

  // vid.loop()
  // vid.volume(0)
  vid.hide()
  vid.loop()
}



function draw() {
  background(0)

  // the video's length is NaN until it finishes loading, so keep checking
  // if (!vidDuration) {
  //   vidDuration = vid.duration()
  // }

  // if (vidDuration) {
  //   vid.time(map(mouseX, 0,width,0,vidDuration))
  // }


  // draw the background and first video normally
  // blendMode(BLEND)
  // background(255)

  // image(vid,0,0)
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

  // only the second video blends
  

  // image(vid,0,100)
  // filter(THRESHOLD)
  
  
}

