
let frames = []

let x 
let xV = 7.5
let dir = 1

async function setup(){
  createCanvas(windowWidth, windowHeight)
  frameRate(12);
  imageMode(CENTER)
  rectMode(CENTER)
  // let f = await loadImage('walk_cycle_png_sequence/1.png')

  x = 0
  for(let i = 1; i<=12; i++){
    frames[i-1] = await loadImage('walk_cycle_png_sequence/' + i + '.png')
  }

 print(frames)

}

function draw(){
  background(200)

  let img = frames[frameCount % frames.length]

  push()
  translate(x,height/2)
  scale(dir,1)

  image(img, 0, 0)

  pop()
  fill(0)


  rect(width-100, height/2, 80,200)

  // if (x> width){
  //     dir = -dir
  // }
  //   if (x<0){
  //     dir = -dir
  // }
  x += xV * dir
  

  if(dist(x,height/2, width-100, height/2)<50){
    window.location.href=('../../index.html')
    // print('door')    
  }

  // print(frameCount % frames.length)

}