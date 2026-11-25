
let frames = []

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);
  imageMode(CENTER)
  // let f = await loadImage('walk_cycle_png_sequence/1.png')

  
  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  }

 print(frames)

}

function draw(){
  background(200)

  let img = frames[frameCount % frames.length]

  image(img, width/2, height/2)

  // print(frameCount % frames.length)

}