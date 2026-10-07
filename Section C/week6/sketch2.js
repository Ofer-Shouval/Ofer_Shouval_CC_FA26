
let frames = []

let x 
let xV = 7.5
let dir = 1

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);
  imageMode(CENTER)
  // let f = await loadImage('walk_cycle_png_sequence/1.png')

  x = width/2
  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  }

 print(frames)

}

function draw(){
  background(200)

  let img = frames[frameCount % frames.length]

  translate(x,height/2)
  scale(dir,1)

  image(img, 0, 0)

  if (x> width){
      dir = -dir
  }
    if (x<0){
      dir = -dir
  }

  x += xV * dir



  // print(frameCount % frames.length)

}